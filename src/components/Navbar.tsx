import logo from "@/assets/logo.jpg";

const Navbar = () => (
  <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
    <div className="container mx-auto flex items-center justify-between py-4 px-4">
      <div className="flex items-center gap-3">
        <img src={logo} alt="NapaPathPeptides Logo" className="h-10 w-10 rounded-full" />
        <span className="font-heading text-xl font-bold tracking-tight text-foreground">
          NapaPath<span className="text-primary">Peptides</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="#product" className="hover:text-foreground transition-colors">Products</a>
        <a href="#quality" className="hover:text-foreground transition-colors">Quality</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </div>
    </div>
  </nav>
);

export default Navbar;
