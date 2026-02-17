import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import PostNavigation from '@/components/PostNavigation';
import { posts } from '@/data/posts';
import { processMarkdown } from '@/lib/markdown';
import { getPostContent, getPostMetadata } from '@/lib/posts';
import { generatePostMetadata, generateStructuredData } from '@/lib/seo';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return generatePostMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  // Get post metadata and content from markdown files
  const postMetadata = await getPostMetadata(post);
  const postContent = await getPostContent(post);
  const processedContent = await processMarkdown(postContent);

  const structuredData = generateStructuredData(post);

  return (
    <div className="min-h-screen bg-[var(--color-medium-light-bg)] dark:bg-[var(--color-medium-dark-bg)] transition-colors duration-200">
      <div className="grain-overlay" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)] mb-4 font-medium-text leading-tight transition-colors duration-200">
                {postMetadata.title || post.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] text-sm transition-colors duration-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[var(--color-medium-light-border)] dark:bg-[var(--color-medium-dark-border)] rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)]">
                      {(postMetadata.author || post.author).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span>{postMetadata.author || post.author}</span>
                </div>
                <span>•</span>
                <span>{postMetadata.date || post.date}</span>
              </div>
            </header>

            {/* Post Content */}
            <article className="max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: processedContent }}
                className="notion-content"
              />
            </article>

            {/* Tags */}
            {(postMetadata.tags || post.tags) && (postMetadata.tags || post.tags)!.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] transition-colors duration-200">
                <div className="flex flex-wrap gap-2">
                  {(postMetadata.tags || post.tags)!.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[var(--color-medium-light-accent)] dark:bg-[var(--color-medium-dark-accent)] text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)] text-sm rounded-full transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <PostNavigation content={postContent} />
          </div>
        </div>
      </main>
    </div>
  );
}
