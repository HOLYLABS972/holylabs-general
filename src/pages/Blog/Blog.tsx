import React, { useState, useEffect } from 'react';
import { 
  SearchIcon, 
  FilterIcon, 
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ArrowRightIcon,
  BookOpenIcon,
  TrendingUpIcon,
  LoaderIcon,
  UsersIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  getBlogPosts, 
  getBlogTags,
  BlogPost, 
  BlogFilter 
} from '../../lib/blogService';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Load blog posts and tags in parallel
        const [blogData, allTags] = await Promise.all([
          getBlogPosts({ published: true, limit: 9 }),
          getBlogTags()
        ]);
        
        setPosts(blogData.posts);
        setHasMore(blogData.hasMore);
        setLastDoc(blogData.lastDoc);
        setTags(allTags);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Filter posts when search or tags change
  useEffect(() => {
    if (!searchTerm && selectedTags.length === 0) {
      // Reset to initial load
      loadPosts();
      return;
    }

    const filterPosts = async () => {
      try {
        setLoading(true);
        const filter: BlogFilter = {
          published: true,
          limit: 9,
          searchTerm: searchTerm || undefined,
          tags: selectedTags.length > 0 ? selectedTags : undefined
        };
        
        const blogData = await getBlogPosts(filter);
        setPosts(blogData.posts);
        setHasMore(blogData.hasMore);
        setLastDoc(blogData.lastDoc);
      } catch (error) {
        console.error('Error filtering posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(filterPosts, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedTags]);

  const loadPosts = async () => {
    try {
      const blogData = await getBlogPosts({ published: true, limit: 9 });
      setPosts(blogData.posts);
      setHasMore(blogData.hasMore);
      setLastDoc(blogData.lastDoc);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const loadMorePosts = async () => {
    if (!hasMore || loadingMore) return;
    
    try {
      setLoadingMore(true);
      const filter: BlogFilter = {
        published: true,
        limit: 9,
        lastDoc,
        searchTerm: searchTerm || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined
      };
      
      const blogData = await getBlogPosts(filter);
      setPosts(prev => [...prev, ...blogData.posts]);
      setHasMore(blogData.hasMore);
      setLastDoc(blogData.lastDoc);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  };


  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat(language === 'he' ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getPostContent = (post: BlogPost) => ({
    title: post.title[language] || post.title['en'] || post.title['he'] || 'Untitled',
    excerpt: post.excerpt[language] || post.excerpt['en'] || post.excerpt['he'] || '',
    slug: post.slug[language] || post.slug['en'] || post.slug['he'] || '',
    readTime: post.readTime[language] || post.readTime['en'] || post.readTime['he'] || 1
  });

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

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 mt-20">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <BookOpenIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('blog.badge')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center whitespace-pre-line mb-6 gradient-text">
            {t('blog.title')}
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('blog.description')}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div 
            className="rounded-3xl"

          >
            {/* Search Bar */}
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64646e]" />
              <input
                type="text"
                placeholder={t('blog.search.placeholder') as string}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black placeholder-[#64646e] focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent transition-colors"
              />
            </div>

            

            {/* Active Filters */}
            {(searchTerm || selectedTags.length > 0) && (
              <div className="flex items-center gap-2 pt-4 border-t border-[#d8dfe5]">
                <span className="text-sm text-[#64646e]">{t('blog.filter.active')}:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-[#389CFF] text-white text-sm rounded-full">
                    "{searchTerm}"
                  </span>
                )}
                {selectedTags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#389CFF] text-white text-sm rounded-full">
                    {tag}
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#389CFF] hover:underline ml-2"
                >
                  {t('blog.filter.clear')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Blog Posts */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="w-8 h-8 animate-spin text-[#389CFF]" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpenIcon className="w-16 h-16 text-[#64646e] mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-black mb-2">
                {t('blog.empty.title')}
              </h3>
              <p className="text-[#64646e]">
                {t('blog.empty.description')}
              </p>
            </div>
          ) : (
            <>
              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => {
                  const content = getPostContent(post);
                  return (
                    <Link 
                      to={`/blog/${encodeURIComponent(content.slug || post.slug?.[language] || post.id || '')}`}
                      className="block"
                    >
                      <article
                        key={post.id}
                        className="group cursor-pointer "
                        style={{
                          backgroundColor: 'rgb(246, 251, 255)',
                          borderRadius: '16px',
                          boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
                        }}
                      >
                        {/* Featured Image */}
                        {post.featuredImage && (
                          <div className="relative h-64 mb-4 rounded-t-2xl overflow-hidden">
                            <img
                              src={post.featuredImage}
                              alt={content.title}
                              className="w-full h-full object-cover "
                            />
                          </div>
                        )}
                        
                        <div className="p-4">
                                                      {/* Title */}
                            <h3 className="text-2xl font-semibold text-black mb-4 group-hover:text-[#389CFF] transition-colors line-clamp-2 leading-tight overflow-hidden" style={{ lineHeight: '1.3' }}>
                              {content.title}
                            </h3>
                          
                          {/* Excerpt */}
                          <p className="text-[#64646e] text-base leading-relaxed mb-6 line-clamp-3">
                            {content.excerpt}
                          </p>
                          
                          {/* Meta Information */}
                          <div className="flex items-center gap-4 text-sm text-[#64646e] mb-4">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-4 h-4" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              {content.readTime} {t('blog.readTime')}
                            </span>
                          </div>
                          
                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map(tag => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#d8dfe5] text-[#64646e] text-sm rounded-full"
                                >
                                  <TagIcon className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center">
                  <Button 
                    onClick={loadMorePosts}
                    disabled={loadingMore}
                    variant="outline"
                    size="lg"
                  >
                    {loadingMore ? (
                      <>
                        <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
                        {t('blog.loadingMore')}
                      </>
                    ) : (
                      t('blog.loadMore')
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog; 