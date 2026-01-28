import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X, LogIn, User } from "lucide-react";
import { useState } from "react";
import { Github } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    // { path: "/", label: "Home" },
    // { path: "/dashboard", label: "Dashboard" },
    // { path: "/editor", label: "Editor" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Source<span className="gradient-text">Share</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "secondary" : "ghost"}
                  size="sm"
                  className="font-medium"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className=" md:flex items-center gap-2">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <Github size={22} />
            </a>
          </div>
          {/* <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                Get Started
              </Button>
            </Link>
          </div> */}

          {/* Mobile Menu Button */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button> */}
        </div>

        {/* Mobile Menu */}
        {/* {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={isActive(link.path) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-border/50 my-2" />
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
