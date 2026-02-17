export default function Hero() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Medium-style hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-left font-bold text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)] mb-4 font-medium-text">
            Bruno Theodoro
          </h1>
          <p className="text-lg  text-left text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] font-medium-text">
            Blog Pessoal
          </p>
        </div>
        
        {/* Medium-style divider */}
        <div className="border-t border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] mb-8"></div>

      </div>
    </section>
  );
}
