import Link from 'next/link';
import Search from './Search';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  return (
    <header className="bg-[var(--color-medium-light-bg)] dark:bg-[var(--color-medium-dark-bg)] border-b border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Medium Style */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">   
                <span className="text-black dark:text-white font-bold text-3xl medium-sans">.BR</span>
            </div>
          </Link>

          {/* Navigation - Medium Style */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] transition-colors text-sm font-medium font-medium-sans"
            >
              Home
            </Link>
            <a 
              href="https://www.linkedin.com/in/brunotalcantara/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] transition-colors text-sm font-medium font-medium-sans"
            >
              LinkedIn
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.bruno.theodoro@gmail.com&su=Contato%20via%20Blog&body=Olá%20Bruno,%0D%0A%0D%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] transition-colors text-sm font-medium font-medium-sans"
            >
              dev.bruno.theodoro@gmail.com
            </a>
          </nav>

          {/* Right Side - Medium Style */}
          <div className="flex items-center space-x-4">
            <Search />
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
