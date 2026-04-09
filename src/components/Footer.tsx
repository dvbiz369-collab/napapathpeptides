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
        <div className="text-center max-w-lg space-y-2">
          <p className="text-xs text-muted-foreground">
            For research purposes only. Not intended for human or animal consumption. 
            All products are sold as research chemicals only.
          </p>
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-md px-3 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-destructive">
              No Refund Policy
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
            All sales are final. Due to the nature of research compounds, we do not offer refunds, 
            returns, or exchanges. By completing your purchase, you acknowledge and agree to this policy.
          </p>
        </div>
        <a href="mailto:napapathpeps@icloud.com" className="text-sm text-primary hover:underline">
          napapathpeps@icloud.com
        </a>
      </div>
      <div className="mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NapaPathPeptides. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
