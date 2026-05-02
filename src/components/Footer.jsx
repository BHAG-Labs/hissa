export default function Footer() {
  return (
    <footer className="section-dark py-12 px-6 md:px-8 mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-heading font-bold text-2xl text-cream mb-1">Hissa</div>
            <div className="font-subheading text-base text-ochre mb-3">हिस्सा</div>
            <p className="text-xs text-cream/50 max-w-sm mb-4">Free startup equity calculators for Indian founders.</p>
            <p className="text-[11px] text-cream/40">
              A BHAG Labs product.
              <br />
              <a href="https://bhaglabs.com" className="hover:text-cream transition-colors">bhaglabs.com</a>
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ochre mb-4">Contact</h4>
            <ul className="space-y-2 text-xs text-cream/60">
              <li><a href="mailto:hissa@bhaglabs.com" className="hover:text-cream transition-colors">hissa@bhaglabs.com</a><span className="block text-cream/35 text-[10px] mt-0.5">Bug reports, feedback</span></li>
              <li><a href="mailto:hello@bhaglabs.com" className="hover:text-cream transition-colors">hello@bhaglabs.com</a><span className="block text-cream/35 text-[10px] mt-0.5">General enquiries</span></li>
            </ul>
            <p className="text-[10px] text-cream/35 mt-4 leading-relaxed max-w-xs">
              Calculators are for educational purposes only. Not financial or legal advice.
              Verify with a CA before signing any cap-table document.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-ochre mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-cream/60">
              <li><a href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</a><span className="block text-cream/35 text-[10px] mt-0.5"><a href="mailto:privacy@bhaglabs.com" className="hover:text-cream">privacy@bhaglabs.com</a> · DPDP</span></li>
              <li><a href="/terms" className="hover:text-cream transition-colors">Terms of Service</a></li>
              <li><a href="/grievance" className="hover:text-cream transition-colors">Grievance Officer</a><span className="block text-cream/35 text-[10px] mt-0.5"><a href="mailto:grievance@bhaglabs.com" className="hover:text-cream">grievance@bhaglabs.com</a></span></li>
            </ul>
          </div>
        </div>

        <hr className="rule-gold opacity-30 mb-6" />

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-cream/50 uppercase tracking-wider mb-6">
          <a href="https://bhaglabs.com" className="hover:text-cream transition-colors">BHAG Labs</a>
          <a href="https://neev.bhaglabs.com" className="hover:text-cream transition-colors">Neev</a>
          <span className="text-ochre/60">Hissa</span>
          <a href="https://pitchwala.bhaglabs.com" className="hover:text-cream transition-colors">Pitchwala</a>
          <a href="https://yantra.bhaglabs.com" className="hover:text-cream transition-colors">Yantra</a>
          <a href="https://bazaar.bhaglabs.com" className="hover:text-cream transition-colors">Bazaar</a>
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-cream/40">&copy; {new Date().getFullYear()} BHAG Labs Pvt. Ltd.</p>
          <div className="diamond-divider text-ochre/30 max-w-[60px]">
            <span className="text-xs select-none">&#9670;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
