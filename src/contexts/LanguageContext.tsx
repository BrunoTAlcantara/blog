'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  pt: {
    'search.placeholder': 'Digite e pressione enter...',
    'search.noResults': 'Nenhum post encontrado para',
    'nav.home': 'Home',
    'nav.trending': 'Trending',
    'nav.topics': 'Topics',
    'nav.write': 'Write',
    'hero.greeting': 'Bão?',
    'hero.bio': 'Sou Bruno Theodoro, engenheiro de software com 6 anos de experiência em startups e grandes empresas de ecommerce e fintech. Escrevo sobre o que estou estudando no momento: arquitetura, código e I.A.',
    'hero.featured': 'Featured',
    'hero.mostRead': 'Mais Lidos',
    'hero.mostRecent': 'Mais Recentes',
    'sidebar.discover': 'Discover more',
    'sidebar.about': 'Sobre mim',
    'sidebar.technologies': 'Minhas Principais tecnologias',
    'sidebar.studying': 'Estudando atualmente',
    'badges.paulista': '🌆 Paulista',
    'badges.criadoMG': '⛰️ Criado em MG',
    'badges.florianopolis': '🏝️ Em Florianópolis',
    'badges.esportes': '⚽ Esportes',
    'badges.artesMarciais': '🥋 Artes Marciais',
    'badges.gastronomia': '🍳 Gastronomia',
    'badges.comida': '🍕 Comida',
    'badges.cachorro': '🐕 Cachorro',
    'badges.casado': '💍 Casado',
    'tech.kotlin': '🟣 Kotlin',
    'tech.java': '☕ Java',
    'tech.spring': '🍃 Spring Boot',
    'tech.postgres': '🐘 PostgreSQL',
    'tech.microservices': '🔧 Microserviços',
    'tech.react': '⚛️ React',
    'tech.nextjs': '▲ Next.js',
    'tech.nodejs': '🟢 Node.js',
    'study.go': '🐹 Go',
    'study.systemDesign': '🏗️ System Design',
    'study.algoritmos': '🧮 Algoritmos',
    'study.mongodb': '🍃 MongoDB',
    'study.ingles': '🇺🇸 Inglês',
    'navigation.title': 'Navegação',
    'post.readTime': 'min read',
    'post.technology': 'Technology',
  },
  en: {
    'search.placeholder': 'Type and enter...',
    'search.noResults': 'No posts found for',
    'nav.home': 'Home',
    'nav.trending': 'Trending',
    'nav.topics': 'Topics',
    'nav.write': 'Write',
    'hero.greeting': 'Hi.',
    'hero.bio': 'I\'m Bruno Theodoro, software engineer with 6 years of experience in startups and large companies. I write about architecture, code, and what I\'m learning.',
    'hero.featured': 'Featured',
    'hero.mostRead': 'Most Read',
    'hero.mostRecent': 'Most Recent',
    'sidebar.discover': 'Discover more',
    'sidebar.about': 'About me',
    'sidebar.technologies': 'My Main Technologies',
    'sidebar.studying': 'Currently Studying',
    'badges.paulista': '🌆 From São Paulo',
    'badges.criadoMG': '⛰️ Raised in MG',
    'badges.florianopolis': '🏝️ In Florianópolis',
    'badges.esportes': '⚽ Sports',
    'badges.artesMarciais': '🥋 Martial Arts',
    'badges.gastronomia': '🍳 Gastronomy',
    'badges.cachorro': '🐕 Dog',
    'badges.casado': '💍 Married',
    'tech.kotlin': '🟣 Kotlin',
    'tech.java': '☕ Java',
    'tech.spring': '🍃 Spring Boot',
    'tech.postgres': '🐘 PostgreSQL',
    'tech.microservices': '🔧 Microservices',
    'tech.react': '⚛️ React',
    'tech.nextjs': '▲ Next.js',
    'tech.nodejs': '🟢 Node.js',
    'study.go': '🐹 Go',
    'study.systemDesign': '🏗️ System Design',
    'study.algoritmos': '🧮 Algorithms',
    'study.mongodb': '🍃 MongoDB',
    'study.ingles': '🇺🇸 English',
    'navigation.title': 'Navigation',
    'post.readTime': 'min read',
    'post.technology': 'Technology',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang === 'en') {
      setLanguage('en');
    } else if (urlLang === 'pt') {
      setLanguage('pt');
    } else {
      // Fallback to localStorage
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
      // Default remains 'pt' if nothing is found
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  // Prevent hydration mismatch by providing default context
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'pt', toggleLanguage: () => {}, t: (key: string) => key }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
    
    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLanguage);
    window.history.replaceState({}, '', url.toString());
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
