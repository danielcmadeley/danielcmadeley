export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: SitemapImage[];
}

export interface SitemapImage {
  url: string;
  caption?: string;
  title?: string;
  license?: string;
}

export interface BlogPost {
  id: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    author?: string;
    tags?: string[];
    image?: string;
  };
}

export class SEOUtils {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  /**
   * Generate sitemap entries for blog posts with SEO-optimized metadata
   */
  generateBlogSitemapEntries(posts: BlogPost[]): SitemapEntry[] {
    return posts.map(post => ({
      url: `${this.baseUrl}/thoughts-and-writings/${post.id}/`,
      lastmod: post.data.pubDate.toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.8,
      images: post.data.image ? [{
        url: post.data.image,
        caption: post.data.description,
        title: post.data.title,
      }] : undefined,
    }));
  }

  /**
   * Generate sitemap entries for static pages
   */
  generateStaticSitemapEntries(): SitemapEntry[] {
    return [
      {
        url: `${this.baseUrl}/`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        url: `${this.baseUrl}/thoughts-and-writings/`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        url: `${this.baseUrl}/feeds/`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6,
      },
      {
        url: `${this.baseUrl}/search/`,
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.5,
      },
    ];
  }

  /**
   * Generate sitemap entries for RSS feeds
   */
  generateFeedSitemapEntries(categories: string[]): SitemapEntry[] {
    const entries: SitemapEntry[] = [
      {
        url: `${this.baseUrl}/rss.xml`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.7,
      },
      {
        url: `${this.baseUrl}/feed.json`,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.6,
      },
    ];

    // Add category-specific RSS feeds
    categories.forEach(category => {
      const slug = this.createSlug(category);
      entries.push({
        url: `${this.baseUrl}/rss/${slug}.xml`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.5,
      });
    });

    return entries;
  }

  /**
   * Create URL-safe slug from string
   */
  createSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  /**
   * Generate structured data for blog posts
   */
  generateBlogPostStructuredData(post: BlogPost, url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.data.title,
      description: post.data.description,
      author: {
        '@type': 'Person',
        name: post.data.author || 'Daniel Madeley',
        url: this.baseUrl,
      },
      datePublished: post.data.pubDate.toISOString(),
      dateModified: post.data.pubDate.toISOString(),
      image: post.data.image || `${this.baseUrl}/favicon.svg`,
      url: url,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Daniel Madeley',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/favicon.svg`,
        },
      },
      keywords: post.data.tags?.join(', ') || '',
      articleSection: 'Technology',
      inLanguage: 'en-US',
    };
  }

  /**
   * Generate structured data for blog listing page
   */
  generateBlogListingStructuredData(posts: BlogPost[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Daniel Madeley Blog',
      description: 'Thoughts on design, development, and the intersection of technology and creativity.',
      url: `${this.baseUrl}/thoughts-and-writings/`,
      author: {
        '@type': 'Person',
        name: 'Daniel Madeley',
        url: this.baseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Daniel Madeley',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/favicon.svg`,
        },
      },
      blogPost: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.data.title,
        url: `${this.baseUrl}/thoughts-and-writings/${post.id}/`,
        datePublished: post.data.pubDate.toISOString(),
        author: {
          '@type': 'Person',
          name: post.data.author || 'Daniel Madeley',
        },
      })),
      inLanguage: 'en-US',
    };
  }

  /**
   * Generate Open Graph metadata for blog posts
   */
  generateOpenGraphMetadata(post: BlogPost, url: string) {
    return {
      'og:type': 'article',
      'og:title': post.data.title,
      'og:description': post.data.description,
      'og:url': url,
      'og:image': post.data.image || `${this.baseUrl}/favicon.svg`,
      'og:site_name': 'Daniel Madeley',
      'article:author': post.data.author || 'Daniel Madeley',
      'article:published_time': post.data.pubDate.toISOString(),
      'article:section': 'Technology',
      'article:tag': post.data.tags?.join(',') || '',
    };
  }

  /**
   * Generate Twitter Card metadata for blog posts
   */
  generateTwitterCardMetadata(post: BlogPost, url: string) {
    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': post.data.title,
      'twitter:description': post.data.description,
      'twitter:url': url,
      'twitter:image': post.data.image || `${this.baseUrl}/favicon.svg`,
      'twitter:creator': '@danielmadeley',
      'twitter:site': '@danielmadeley',
    };
  }

  /**
   * Generate canonical URL for a given path
   */
  generateCanonicalUrl(path: string): string {
    return `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }

  /**
   * Calculate estimated reading time
   */
  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  /**
   * Generate meta keywords from tags and content
   */
  generateMetaKeywords(tags: string[] = [], title: string = '', description: string = ''): string {
    const keywords = new Set<string>();

    // Add tags
    tags.forEach(tag => keywords.add(tag.toLowerCase()));

    // Extract keywords from title and description
    const text = `${title} ${description}`;
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall', 'a', 'an', 'this', 'that', 'these', 'those'];

    text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .forEach(word => keywords.add(word));

    return Array.from(keywords).slice(0, 10).join(', ');
  }

  /**
   * Validate and sanitize URL
   */
  sanitizeUrl(url: string): string {
    try {
      const urlObj = new URL(url, this.baseUrl);
      return urlObj.toString();
    } catch {
      return `${this.baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
  }

  /**
   * Generate breadcrumb structured data
   */
  generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: this.sanitizeUrl(crumb.url),
      })),
    };
  }

  /**
   * Generate FAQ structured data
   */
  generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }
}

// Export a default instance
export const seoUtils = new SEOUtils('https://danielcmadeley.vercel.app');
