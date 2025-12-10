import { useState, useEffect } from "react";
import { NavLink } from "./NavLink";
import { Menu, X, Video } from "lucide-react";
import churchLogo from "@/assets/church-logo.png";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutLinks = [
    { to: "/about", label: "About PBC", description: "Learn about our church" },
    { to: "/history", label: "History", description: "Our story and journey" },
    { to: "/leadership", label: "Leadership", description: "Meet our pastor" },
    { to: "/beliefs", label: "Our Beliefs", description: "What we believe" },
    { to: "/purpose", label: "Purpose & Vision", description: "Our mission" },
  ];

  const connectLinks = [
    { to: "/", label: "I'm New", description: "First time visiting?" },
    { to: "/eternity", label: "Eternity", description: "Questions about salvation" },
    { to: "/contact", label: "Contact", description: "Get in touch" },
  ];

  const sermonCategories = [
    { value: "all", label: "All Sermons", description: "Browse our complete sermon library" },
    { value: "Sunday - AM", label: "Sunday - AM", description: "Sunday morning worship messages" },
    { value: "Sunday - PM", label: "Sunday - PM", description: "Sunday evening services" },
    { value: "Midweek Service", label: "Midweek Service", description: "Wednesday night studies" },
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-all duration-300 ${
      isScrolled ? "shadow-md" : ""
    }`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}>
          <NavLink to="/" className="flex items-center space-x-2">
            <img 
              src={churchLogo} 
              alt="Providence Baptist Church Logo" 
              className={`transition-all duration-300 ${isScrolled ? "h-8 w-8" : "h-10 w-10"}`}
            />
            <div className={`font-bold text-primary transition-all duration-300 ${
              isScrolled ? "text-lg" : "text-xl"
            }`}>
              Providence Baptist Church
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-background/95 backdrop-blur-sm border border-border">
                      {aboutLinks.map((link) => (
                        <li key={link.to}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.to}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{link.label}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {link.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Connect</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-background/95 backdrop-blur-sm border border-border">
                      {connectLinks.map((link) => (
                        <li key={link.to}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.to}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{link.label}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {link.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Sermons</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 bg-background/95 backdrop-blur-sm border border-border">
                      {sermonCategories.map((category) => (
                        <li key={category.value}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/sermons${category.value !== "all" ? `?category=${encodeURIComponent(category.value)}` : ""}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{category.label}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              <Link to="/give">Give</Link>
            </Button>

            <Button asChild variant="secondary" size="sm" className="gap-2">
              <Link to="/livestream">
                <Video className="h-4 w-4" />
                Watch Live
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-3 border-t border-border">
            <div className="space-y-2">
              <div className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                About
              </div>
              {aboutLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors rounded-lg mx-2"
                  activeClassName="bg-primary text-primary-foreground hover:bg-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="space-y-2">
              <div className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Connect
              </div>
              {connectLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors rounded-lg mx-2"
                  activeClassName="bg-primary text-primary-foreground hover:bg-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="space-y-2">
              <div className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sermons
              </div>
              {sermonCategories.map((category) => (
                <NavLink
                  key={category.value}
                  to={`/sermons${category.value !== "all" ? `?category=${encodeURIComponent(category.value)}` : ""}`}
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors rounded-lg mx-2"
                  activeClassName="bg-primary text-primary-foreground hover:bg-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {category.label}
                </NavLink>
              ))}
            </div>

            <div className="px-4 pt-3 space-y-2">
              <Button asChild variant="default" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Link to="/give" onClick={() => setIsOpen(false)}>Give</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full gap-2">
                <Link to="/livestream" onClick={() => setIsOpen(false)}>
                  <Video className="h-4 w-4" />
                  Watch Live
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
