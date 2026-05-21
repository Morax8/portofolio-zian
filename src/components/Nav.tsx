export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-heading font-bold text-sm tracking-widest text-foreground uppercase">
          Aditya Zianur
        </span>
        <div className="hidden sm:flex gap-6 text-sm text-muted">
          <a href="#experience" className="hover:text-accent transition-colors duration-200">
            Experience
          </a>
          <a href="#projects" className="hover:text-accent transition-colors duration-200">
            Projects
          </a>
          <a href="#contact" className="hover:text-accent transition-colors duration-200">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
