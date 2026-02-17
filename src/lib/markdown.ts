import { remark } from 'remark';
import html from 'remark-html';

export async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(html)
    .process(content);
  
  let htmlContent = processedContent.toString();
  
  // Add IDs to headings
  htmlContent = htmlContent.replace(
    /<h([2-6])>(.*?)<\/h[2-6]>/g,
    (match, level, text) => {
      const id = text
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );
  
  return htmlContent;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
