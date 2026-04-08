import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer id="contact" className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="NapaPathPeptides" className="h-8 w-8 rounded-full" />
          <span className="font-heading text-lg font-bold text-foreground">
            NapaPath<span className="text-primary">Peptides</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-md">
          For research purposes only. Not intended for human or animal consumption. 
          All products are sold as research chemicals only.
        </p>
        <a href="mailto:napapathpeptides@gmail.com" className="text-sm text-primary hover:underline">
          napapathpeptides@gmail.com
        </a>
      </div>
      <div className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NapaPathPeptides. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
