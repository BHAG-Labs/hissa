export default function Footer() {
  return (
    <footer className="section-dark py-12 px-6 md:px-8 mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8">
          <div>
            <div className="font-heading font-bold text-2xl text-cream mb-1">BHAG Labs</div>
            <div className="font-subheading text-base text-ochre mb-3">भाग लैब्स</div>
            <p className="text-xs text-cream/50 max-w-sm">Turning audacious ideas into validated ventures.</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-xs text-cream/60 uppercase tracking-wider">
            <a href="https://bhaglabs.com" className="hover:text-cream transition-colors">Home</a>
            <a href="https://neev.bhaglabs.com" className="hover:text-cream transition-colors">Neev</a>
            <a href="https://hissa.bhaglabs.com" className="hover:text-cream transition-colors">Hissa</a>
            <a href="https://pitchwala.bhaglabs.com" className="hover:text-cream transition-colors">Pitchwala</a>
            <a href="https://yantra.bhaglabs.com" className="hover:text-cream transition-colors">Yantra</a>
            <a href="https://bazaar.bhaglabs.com" className="hover:text-cream transition-colors">Bazaar</a>
          </nav>
        </div>
        <hr className="rule-gold opacity-30 mb-6" />
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
