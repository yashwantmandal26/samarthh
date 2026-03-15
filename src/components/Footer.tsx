const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Samarth Logo" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold text-foreground">Samarth</span>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 Samarth. Built for Jharkhand citizens.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
