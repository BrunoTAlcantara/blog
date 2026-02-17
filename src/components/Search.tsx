'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { searchPosts, SearchResult } from '@/lib/search';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Search() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchPosts(query);
      setResults(searchResults.slice(0, 5)); // Limit to 5 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/posts/${results[selectedIndex].id}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      window.location.href = `/posts/${results[0].id}`;
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
              placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="w-48 px-4 py-2 border border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] rounded-full bg-[var(--color-medium-light-accent)] dark:bg-[var(--color-medium-dark-accent)] text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)] placeholder-[var(--color-medium-light-muted)] dark:placeholder-[var(--color-medium-dark-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-light-text)] dark:focus:ring-[var(--color-medium-dark-text)] focus:border-transparent transition-colors font-medium-sans text-sm"
        />
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-medium-light-bg)] dark:bg-[var(--color-medium-dark-bg)] border border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {results.map((result, index) => (
            <Link
              key={result.id}
              href={`/posts/${result.id}`}
              className={`block p-3 hover:bg-[var(--color-medium-light-accent)] dark:hover:bg-[var(--color-medium-dark-accent)] transition-colors ${
                index === selectedIndex ? 'bg-[var(--color-medium-light-accent)] dark:bg-[var(--color-medium-dark-accent)]' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[var(--color-medium-light-border)] dark:bg-[var(--color-medium-dark-border)] rounded flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)] truncate font-medium-sans">
                    {result.title}
                  </h4>
                  <p className="text-xs text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] mt-1 line-clamp-2 font-medium-text">
                    {result.excerpt}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] font-medium-sans">
                      {result.author}
                    </span>
                    <span className="text-xs text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)]">•</span>
                    <span className="text-xs text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] font-medium-sans">
                      {result.date}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim() && results.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-medium-light-bg)] dark:bg-[var(--color-medium-dark-bg)] border border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] rounded-lg shadow-lg z-50 p-3"
        >
              <p className="text-sm text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] text-center">
                {t('search.noResults')} &ldquo;{query}&rdquo;
              </p>
        </div>
      )}
    </div>
  );
}
