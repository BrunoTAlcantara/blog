import { posts } from '@/data/posts';

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  featured: boolean;
  tags: string[];
  score: number;
}

export function searchPosts(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  posts.forEach((post) => {
    let score = 0;

    // Search in title (highest priority)
    if (post.title.toLowerCase().includes(searchTerm)) {
      score += 10;
    }

    // Search in excerpt
    if (post.excerpt.toLowerCase().includes(searchTerm)) {
      score += 5;
    }

    // Search in content
    if (post.content?.toLowerCase().includes(searchTerm)) {
      score += 3;
    }

    // Search in tags
    if (post.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
      score += 7;
    }

    // Search in author
    if (post.author.toLowerCase().includes(searchTerm)) {
      score += 2;
    }

    if (score > 0) {
      results.push({
        ...post,
        score
      });
    }
  });

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}
