'use client';

import Link from 'next/link';
import PostCard from '@/components/PostCard';
import StructuredData from '@/components/StructuredData';
import LanguageToggle from '@/components/LanguageToggle';
import { posts } from '@/data/posts';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const featuredPosts = posts.filter(post => post.featured);
  const recentPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[var(--color-medium-light-bg)] dark:bg-[var(--color-medium-dark-bg)] relative overflow-hidden">
      <StructuredData />

      {/* Ukiyo-e wave background */}
      <div className="ukiyo-waves" aria-hidden="true" />

      {/* Fine grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      <main className="max-w-2xl mx-auto px-6 py-16 relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16 font-medium-sans">
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)] font-semibold hover:text-[var(--color-medium-light-green)] dark:hover:text-[var(--color-medium-dark-green)] transition-colors">
              Home
            </Link>
            <a href="#posts" className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] transition-colors">
              Posts
            </a>
            <a href="https://www.linkedin.com/in/brunotalcantara/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] transition-colors">
              LinkedIn
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dev.bruno.theodoro@gmail.com&su=Contato%20via%20Blog&body=Olá%20Bruno,%0D%0A%0D%0A" target="_blank" rel="noopener noreferrer" className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] hover:text-[var(--color-medium-light-text)] dark:hover:text-[var(--color-medium-dark-text)] transition-colors">
              Email
            </a>
          </div>
          <LanguageToggle />
        </nav>

        {/* Greeting */}
        <section className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-medium-light-green)] dark:text-[var(--color-medium-dark-green)] mb-6 font-medium-text tracking-tight">
            {t('hero.greeting')}
          </h1>
          <p className="text-lg text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] leading-relaxed font-medium-text">
            {t('hero.bio')}
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] mb-12" id="posts" />

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] mb-6 font-medium-sans font-semibold">
              {t('hero.mostRead')}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                  image={post.image}
                  featured={post.featured}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] mb-6 font-medium-sans font-semibold">
              {t('hero.mostRecent')}
            </h2>
            <div className="space-y-0">
              {recentPosts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                  image={post.image}
                  featured={post.featured}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
