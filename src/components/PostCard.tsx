import Link from 'next/link';
import Image from 'next/image';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
}

export default function PostCard({
  id,
  title,
  excerpt,
  author,
  date,
  image,
  featured = false
}: PostCardProps) {
  if (featured) {
    return (
      <Link href={`/posts/${id}`} className="block group">
        <article className="transition-colors duration-200">
          <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] font-medium-sans">{author}</span>
            <span className="text-[var(--color-medium-light-border)] dark:text-[var(--color-medium-dark-border)]">&middot;</span>
            <span className="text-xs text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] font-medium-sans">{date}</span>
          </div>
          <h3 className="text-base font-bold leading-snug mb-1 group-hover:text-[var(--color-medium-light-green)] dark:group-hover:text-[var(--color-medium-dark-green)] transition-colors font-medium-text text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)]">
            {title}
          </h3>
          <p className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] text-sm leading-relaxed line-clamp-2 font-medium-text">
            {excerpt}
          </p>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${id}`} className="block group">
      <article className="py-6 border-b border-[var(--color-medium-light-border)] dark:border-[var(--color-medium-dark-border)] transition-colors duration-200">
        <div className="flex gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] font-medium-sans">{author}</span>
              <span className="text-[var(--color-medium-light-border)] dark:text-[var(--color-medium-dark-border)]">&middot;</span>
              <span className="text-sm text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] font-medium-sans">{date}</span>
            </div>

            <h3 className="text-lg font-bold leading-snug mb-1 group-hover:text-[var(--color-medium-light-green)] dark:group-hover:text-[var(--color-medium-dark-green)] transition-colors font-medium-text text-[var(--color-medium-light-text)] dark:text-[var(--color-medium-dark-text)]">
              {title}
            </h3>
            <p className="text-[var(--color-medium-light-muted)] dark:text-[var(--color-medium-dark-muted)] text-sm leading-relaxed line-clamp-2 font-medium-text">
              {excerpt}
            </p>
          </div>

          <div className="w-24 h-24 flex-shrink-0 relative">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded"
              unoptimized
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
