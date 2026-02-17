import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@/data/posts';

export async function getPostContent(post: Post): Promise<string> {
  if (post.content) {
    return post.content;
  }

  if (post.contentPath) {
    try {
      const filePath = path.join(process.cwd(), post.contentPath);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { content } = matter(fileContents);
      return content;
    } catch (error) {
      console.error(`Error reading post content from ${post.contentPath}:`, error);
      return 'Conteúdo não disponível.';
    }
  }

  return 'Conteúdo não disponível.';
}

export async function getPostMetadata(post: Post): Promise<Partial<Post>> {
  if (post.contentPath) {
    try {
      const filePath = path.join(process.cwd(), post.contentPath);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        title: data.title || post.title,
        excerpt: data.excerpt || post.excerpt,
        author: data.author || post.author,
        date: data.date || post.date,
        image: data.image || post.image,
        featured: data.featured !== undefined ? data.featured : post.featured,
        tags: data.tags || post.tags,
      };
    } catch (error) {
      console.error(`Error reading post metadata from ${post.contentPath}:`, error);
    }
  }

  return post;
}
