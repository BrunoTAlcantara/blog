'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PostNavigationProps {
  content: string;
}

export default function PostNavigation({ content }: PostNavigationProps) {
  const { t } = useLanguage();
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{2,6})\s+(.+)$/gm;
    const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const updateActiveHeading = () => {
      const headingElements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean);
      
      if (headingElements.length === 0) return;

      const scrollTop = window.scrollY + 150; // Offset from top
      let activeHeading = null;

      // Find the first heading that's below the current scroll position
      for (let i = 0; i < headingElements.length; i++) {
        const element = headingElements[i];
        if (element && element.offsetTop > scrollTop) {
          // If this is the first heading below scroll position, use the previous one
          if (i > 0) {
            activeHeading = headingElements[i - 1].id;
          } else {
            activeHeading = element.id;
          }
          break;
        }
      }

      // If we're past all headings, use the last one
      if (!activeHeading && headingElements.length > 0) {
        activeHeading = headingElements[headingElements.length - 1].id;
      }

      if (activeHeading) {
        setActiveId(activeHeading);
      }
    };

    // Initial check
    updateActiveHeading();

    // Listen to scroll events
    window.addEventListener('scroll', updateActiveHeading, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveHeading);
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 100; // 100px offset from top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="bg-[var(--color-medium-light-accent)] dark:bg-[var(--color-medium-dark-accent)] rounded-lg p-4 border border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)]">
        <h3 className="text-sm font-semibold text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)] mb-3 font-medium-sans">
          {t('navigation.title')}
        </h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 font-medium-sans ${
                activeId === heading.id
                  ? 'bg-[var(--color-medium-light-text)] dark:bg-[var(--color-medium-dark-text)] text-[var(--color-medium-light-bg)] dark:text-[var(--color-medium-dark-bg)] hover:bg-[var(--color-medium-light-text)] dark:hover:bg-[var(--color-medium-dark-text)]'
                  : 'text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] hover:bg-[var(--color-medium-light-border)] dark:hover:bg-[var(--color-medium-dark-border)]'
              }`}
              style={{ paddingLeft: `${(heading.level - 2) * 12 + 12}px` }}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
