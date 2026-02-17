'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import ClientOnly from './ClientOnly';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <ClientOnly fallback={<span className="text-sm font-medium-sans text-[var(--color-medium-light-muted)]">PT</span>}>
      <button
        onClick={toggleLanguage}
        className="text-sm font-medium-sans text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] transition-colors focus:outline-none"
        aria-label={`Switch to ${language === 'pt' ? 'English' : 'Português'}`}
      >
        {language === 'pt' ? 'EN' : 'PT'}
      </button>
    </ClientOnly>
  );
}
