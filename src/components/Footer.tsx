import { Mail, MapPin, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/church-logo-fixed-40.png"
                alt="Providence Baptist Church Logo"
                className="h-10 w-10"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-xl font-bold">Providence Baptist Church</h3>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              A caring church family dedicated to glorifying God, lifting up Christ, and walking in the Spirit.
            </p>
            <div className="flex gap-3">
              <Link
                to="/sermons"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
              >
                <BookOpen className="h-4 w-4" />
                <span>Sermons</span>
              </Link>
              <Link
                to="/livestream"
                className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
              >
                <span>Watch Live</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Service Times (CT)</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Sunday</p>
                  <p>Sunday School: 10:00 AM</p>
                  <p>Morning Worship: 11:00 AM</p>
                  <p>Evening Service: 5:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Wednesday</p>
                  <p>Prayer & Bible Study: 7:00 PM</p>
                  <p>Ladies Bible Study: 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>505 W. University Ave, Ste. #109<br />Georgetown, TX 78626</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:Pastor@pbcatx.org" className="hover:text-accent transition-colors">
                  Pastor@pbcatx.org
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Providence Baptist Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
