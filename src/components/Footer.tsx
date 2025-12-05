import { Facebook, Youtube, Instagram, Mail } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "#", label: "Email" },
];

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Service Times", href: "#services" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export const Footer = () => {
  return (
    <footer className="bg-navy text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
                <span className="text-navy font-display font-bold text-lg">P</span>
              </div>
              <div>
                <span className="font-display text-lg font-semibold">Providence</span>
                <span className="block text-xs text-cream/70 -mt-1">Baptist Church</span>
              </div>
            </div>
            <p className="text-cream/70 font-body text-sm leading-relaxed mb-6">
              A welcoming community of faith, growing together in God's love since 1952.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-accent font-body text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Service Times</h4>
            <div className="space-y-3 text-cream/70 font-body text-sm">
              <p>
                <span className="text-cream font-medium">Sunday School:</span> 9:00 AM
              </p>
              <p>
                <span className="text-cream font-medium">Morning Worship:</span> 10:30 AM
              </p>
              <p>
                <span className="text-cream font-medium">Wednesday Bible Study:</span> 7:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center">
          <p className="text-cream/50 font-body text-sm">
            © {new Date().getFullYear()} Providence Baptist Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
