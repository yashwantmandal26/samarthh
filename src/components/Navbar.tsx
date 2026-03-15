import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Schemes", href: "#schemes" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.png" alt="Samarth Logo" className="h-10 w-10 object-contain" />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold leading-tight text-foreground tracking-tight">
              Samarth
              <span className="ml-1.5 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                Beta
              </span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Jharkhand Citizen Assistant
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <button className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-muted">
            <Globe className="h-3.5 w-3.5" />
            English
          </button>
          <Button size="sm" asChild><Link to="/chat">Start Chat</Link></Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="mt-2 w-full" asChild><Link to="/chat">Start Chat</Link></Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
