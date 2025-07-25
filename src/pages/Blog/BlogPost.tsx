import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ShareIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  LinkIcon,
  CheckIcon,
  LoaderIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  getBlogPostBySlug, 
  getBlogPosts,
  BlogPost as BlogPostType 
} from '../../lib/blogService';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const BlogPost: React.FC = () => {
  const { slug: rawSlug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Enhanced slug decoding to handle various encoding scenarios
  const decodeSlug = (encodedSlug: string): string => {
    if (!encodedSlug) return '';
    
    try {
      // First, try standard URL decoding
      let decodedSlug = decodeURIComponent(encodedSlug);
      
      // Handle double encoding that sometimes occurs in production
      if (decodedSlug.includes('%')) {
        try {
          decodedSlug = decodeURIComponent(decodedSlug);
        } catch (e) {
          // If second decode fails, use the first result
          console.log('Single decode only:', decodedSlug);
        }
      }
      
      return decodedSlug;
    } catch (error) {
      console.error('Error decoding slug:', error);
      // Fallback to original slug if decoding fails
      return encodedSlug;
    }
  };

  const slug = rawSlug ? decodeSlug(rawSlug) : '';

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        console.warn('No slug provided');
        setNotFound(true);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setNotFound(false);
        
        console.log(`Attempting to load blog post with decoded slug: "${slug}" (original: "${rawSlug}") in language: ${language}`);
        
        // Try to get the blog post in the current language
        let blogPost = await getBlogPostBySlug(slug, language);
        
        // If not found, try the other language
        if (!blogPost) {
          const otherLanguage = language === 'en' ? 'he' : 'en';
          console.log(`Blog post not found in ${language}, trying ${otherLanguage} language`);
          blogPost = await getBlogPostBySlug(slug, otherLanguage);
        }
        
        // If still not found, try with URL-encoded slug (fallback for older posts)
        if (!blogPost && rawSlug && rawSlug !== slug) {
          console.log(`Trying with original encoded slug: ${rawSlug}`);
          blogPost = await getBlogPostBySlug(rawSlug, language);
          
          if (!blogPost) {
            const otherLanguage = language === 'en' ? 'he' : 'en';
            blogPost = await getBlogPostBySlug(rawSlug, otherLanguage);
          }
        }
        
        if (!blogPost) {
          console.error(`Blog post not found for slug: "${slug}" (original: "${rawSlug}") in either language`);
          setNotFound(true);
          return;
        }
        
        console.log(`Successfully loaded blog post:`, {
          id: blogPost.id,
          title: blogPost.title,
          slug: blogPost.slug
        });
        setPost(blogPost);
        
        // Get related posts (posts with similar tags)
        if (blogPost.tags && blogPost.tags.length > 0) {
          try {
            const relatedData = await getBlogPosts({
              published: true,
              tags: blogPost.tags,
              limit: 4
            });
            
            // Filter out the current post from related posts
            const filtered = relatedData.posts.filter(p => p.id !== blogPost.id).slice(0, 3);
            setRelatedPosts(filtered);
          } catch (relatedError) {
            console.error('Error loading related posts:', relatedError);
            // Don't fail the whole page if related posts fail
            setRelatedPosts([]);
          }
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, rawSlug, language]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat(language === 'he' ? 'he-IL' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const getPostContent = (post: BlogPostType) => {
    const rawContent = post.content?.[language] || post.content?.['en'] || post.content?.['he'] || '';
    
    // Remove the first H1 heading from content to avoid duplication
    const contentWithoutFirstH1 = rawContent.replace(/^#\s+[^\n]*\n?/, '');
    
    return {
      title: post.title?.[language] || post.title?.['en'] || post.title?.['he'] || 'Untitled',
      content: contentWithoutFirstH1,
      excerpt: post.excerpt?.[language] || post.excerpt?.['en'] || post.excerpt?.['he'] || '',
      slug: post.slug?.[language] || post.slug?.['en'] || post.slug?.['he'] || '',
      readTime: post.readTime?.[language] || post.readTime?.['en'] || post.readTime?.['he'] || 1,
      metaTitle: post.seo?.metaTitle?.[language] || post.seo?.metaTitle?.['en'] || post.seo?.metaTitle?.['he'] || '',
      metaDescription: post.seo?.metaDescription?.[language] || post.seo?.metaDescription?.['en'] || post.seo?.metaDescription?.['he'] || ''
    };
  };

  // Get share URL with proper encoding and language parameter
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      // Add language parameter to the URL if it's not English (default)
      if (language !== 'en') {
        currentUrl.searchParams.set('lang', language);
      }
      return currentUrl.toString();
    }
    return '';
  };

  const shareUrl = getShareUrl();
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post ? getPostContent(post).title : '')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  const copyLink = async () => {
    try {
      if (navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFCFF] flex items-center justify-center">
        <LoaderIcon className="w-8 h-8 animate-spin text-[#389CFF]" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-[#FBFCFF] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4 mt-20">
              {t('blogPost.notFound.title')}
            </h1>
            <p className="text-lg text-[#64646e] mb-8 mt-10">
              {t('blogPost.notFound.description')}
            </p>
            <Link to="/blog">
              <Button variant="cta-primary">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                {t('blogPost.backToBlog')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const content = getPostContent(post);

  return (
    <div className="min-h-screen bg-[#FBFCFF] relative overflow-hidden">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        
        {/* Back to Blog Link */}
        <div className="mb-4 mt-10 hidden md:block">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-[#389CFF] hover:text-[#2980ff] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {t('blogPost.backToBlog')}
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 md:mb-12 mt-10 md:mt-0">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            {content.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-[#64646e] mb-8">
            
            
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">
                {t('blogPost.publishedOn')} {formatDate(post.publishedAt)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">
                {content.readTime} {t('blog.readTime')}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <img
                src={post.featuredImage}
                alt={content.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Failed to load featured image:', post.featuredImage);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </header>



        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-8 bg-white rounded-xl shadow-md"
        >
          <div className="p-8">
            <div className="prose prose-lg max-w-none prose-headings:text-[#161e2e] prose-a:text-[#389CFF] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-p:leading-relaxed prose-p:mb-6">
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={{
                  // Custom component to handle line breaks properly
                  p: ({children}) => <p className="mb-6 leading-relaxed">{children}</p>,
                  // Add proper spacing for headings
                  h1: ({children}) => <h1 className="text-3xl font-bold mb-6 mt-8 first:mt-0">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-bold mb-4 mt-8 first:mt-0">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-bold mb-4 mt-6 first:mt-0">{children}</h3>,
                  // Handle lists with proper spacing
                  ul: ({children}) => <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>,
                  li: ({children}) => <li className="leading-relaxed">{children}</li>,
                  // Handle blockquotes
                  blockquote: ({children}) => <blockquote className="border-l-4 border-[#389CFF] pl-4 italic my-6">{children}</blockquote>,
                  // Handle code blocks
                  pre: ({children}) => <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-6">{children}</pre>,
                  code: ({children, className}) => {
                    const isInline = !className;
                    return isInline ? 
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code> :
                      <code className={className}>{children}</code>;
                  },
                  // Handle images with error handling
                  img: ({src, alt, ...props}) => (
                    <img 
                      {...props}
                      src={src} 
                      alt={alt} 
                      className="rounded-xl max-w-full h-auto"
                      onError={(e) => {
                        console.error('Failed to load image:', src);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )
                }}
              >
                {content.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Share Article Section */}
        <div 
          className="mb-8 p-6"
          style={{
            backgroundColor: 'rgb(246, 251, 255)',
            borderRadius: '16px',
            boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
          }}
        >
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <ShareIcon className="w-5 h-5" />
            {t('blogPost.share')}
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {/* X (Twitter) */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <img 
                src="/logos/x.png" 
                alt="X" 
                className="w-4 h-4 filter brightness-0 invert"
              />
              <span className="hidden sm:inline">X (Twitter)</span>
              <span className="sm:hidden">X</span>
            </a>
            
            {/* LinkedIn */}
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#005582] transition-colors font-medium"
            >
              <img 
                src="/logos/linkedin.png" 
                alt="LinkedIn" 
                className="w-4 h-4 filter brightness-0 invert"
              />
              <span className="hidden sm:inline">LinkedIn</span>
              <span className="sm:hidden">In</span>
            </a>
            
            {/* Facebook */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors font-medium"
            >
              <img 
                src="/logos/facebook.png" 
                alt="Facebook" 
                className="w-4 h-4 filter brightness-0 invert"
                onError={(e) => {
                  console.error('Failed to load Facebook logo');
                  // Replace with text fallback
                  e.currentTarget.outerHTML = '<span class="w-4 h-4 text-center font-bold text-sm">f</span>';
                }}
              />
              <span className="hidden sm:inline">Facebook</span>
              <span className="sm:hidden">FB</span>
            </a>
            
            {/* Copy Link */}
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-[#389CFF] text-[#389CFF] rounded-lg hover:bg-[#389CFF] hover:text-white transition-colors font-medium"
            >
              {linkCopied ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('blogPost.linkCopied')}</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('blogPost.copyLink')}</span>
                  <span className="sm:hidden">Copy</span>
                </>
              )}
            </button>
          </div>
          
          {linkCopied && (
            <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
              <CheckIcon className="w-4 h-4" />
              {t('blogPost.linkCopied')}
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
              <TagIcon className="w-5 h-5" />
              {t('blogPost.tags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#d8dfe5] text-[#64646e] text-sm rounded-full hover:border-[#389CFF] hover:text-[#389CFF] transition-colors"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}



        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div 
            className="p-8"
            style={{
              backgroundColor: 'rgb(246, 251, 255)',
              borderRadius: '16px',
              boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
            }}
          >
            <h2 className="text-2xl font-semibold text-black mb-8">
              {t('blogPost.relatedPosts')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => {
                const relatedContent = getPostContent(relatedPost);
                const relatedSlug = relatedContent.slug || relatedPost.slug?.[language] || relatedPost.id || '';
                
                return (
                  <article
                    key={relatedPost.id}
                    className="group bg-white rounded-xl p-4 border border-[#d8dfe5] hover:border-[#389CFF] transition-colors"
                  >
                    {relatedPost.featuredImage && (
                      <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedContent.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error('Failed to load related post image:', relatedPost.featuredImage);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-[#389CFF] transition-colors line-clamp-2">
                      <Link to={`/blog/${encodeURIComponent(relatedSlug)}`}>
                        {relatedContent.title}
                      </Link>
                    </h3>
                    
                    <p className="text-[#64646e] text-sm line-clamp-2 mb-3">
                      {relatedContent.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-[#64646e]">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {formatDate(relatedPost.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {relatedContent.readTime} {t('blog.readTime')}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost; 