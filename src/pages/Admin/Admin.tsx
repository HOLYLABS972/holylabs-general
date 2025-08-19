import React, { useState, useEffect } from 'react';
import { 
  PlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  SearchIcon,
  FilterIcon,
  UploadIcon,
  SaveIcon,
  LoaderIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ImageIcon,
  FileTextIcon,
  UsersIcon,
  BookOpenIcon,
  LogOutIcon,
  EyeOffIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  getBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost,
  uploadBlogImage,
  getBlogTags,
  calculateReadTime,
  generateSlug,
  BlogPost 
} from '../../lib/blogService';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  timestamp: any;
  status: 'new' | 'contacted' | 'closed';
}

const Admin: React.FC = () => {
  const { t, language } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blogs' | 'contacts'>('blogs');
  
  // Auth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Blog states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [previewMode, setPreviewMode] = useState<{en: boolean, he: boolean}>({en: false, he: false});
  const [blogForm, setBlogForm] = useState({
    title: { en: '', he: '' },
    content: { en: '', he: '' },
    excerpt: { en: '', he: '' },
    tags: [] as string[],
    published: false,
    featuredImage: '',
    seo: {
      metaTitle: { en: '', he: '' },
      metaDescription: { en: '', he: '' }
    }
  });
  const [savingBlog, setSavingBlog] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Filters
  const [blogFilter, setBlogFilter] = useState('');
  const [contactFilter, setContactFilter] = useState('');

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (user) {
      loadBlogs();
      loadContacts();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setLoginError('Invalid credentials. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const loadBlogs = async () => {
    try {
      const blogData = await getBlogPosts({ published: undefined, limit: 50 });
      setBlogs(blogData.posts);
    } catch (error) {
      console.error('Error loading blogs:', error);
      alert('Error loading blogs. Please check your connection and try again.');
    }
  };

  const loadContacts = async () => {
    try {
      const q = query(
        collection(db, 'contacts'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );
      const querySnapshot = await getDocs(q);
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[];
      setContacts(contactsData);
    } catch (error) {
      console.error('Error loading contacts:', error);
      alert('Error loading contacts. Please check your connection and try again.');
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: { en: '', he: '' },
      content: { en: '', he: '' },
      excerpt: { en: '', he: '' },
      tags: [],
      published: false,
      featuredImage: '',
      seo: {
        metaTitle: { en: '', he: '' },
        metaDescription: { en: '', he: '' }
      }
    });
    setEditingBlog(null);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      tags: blog.tags,
      published: blog.published,
      featuredImage: blog.featuredImage || '',
      seo: blog.seo
    });
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  // Convert image to WebP format
  const convertToWebP = (file: File, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Set canvas dimensions to image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx?.drawImage(img, 0, 0);

        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Get original filename without extension
              const originalName = file.name.replace(/\.[^/.]+$/, '');
              const webpFile = new File([blob], `${originalName}.webp`, {
                type: 'image/webp',
                lastModified: Date.now()
              });
              resolve(webpFile);
            } else {
              reject(new Error('Failed to convert image to WebP'));
            }
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Resize image if it's too large
  const resizeImage = (file: File, maxWidth: number = 1200, maxHeight: number = 800, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw resized image
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const originalName = file.name.replace(/\.[^/.]+$/, '');
              const webpFile = new File([blob], `${originalName}.webp`, {
                type: 'image/webp',
                lastModified: Date.now()
              });
              resolve(webpFile);
            } else {
              reject(new Error('Failed to process image'));
            }
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      alert('You must be logged in to upload images.');
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image file is too large. Please select an image smaller than 10MB.');
      return;
    }

    setUploadingImage(true);
    try {
      let processedFile = file;

      // Convert to WebP and resize if necessary
      if (file.type !== 'image/webp') {
        console.log('Converting image to WebP format...');
        
        // First resize if image is too large, then convert to WebP
        processedFile = await resizeImage(file, 1200, 800, 0.85);
        
        console.log(`Image converted: ${file.name} (${(file.size / 1024).toFixed(1)}KB) → ${processedFile.name} (${(processedFile.size / 1024).toFixed(1)}KB)`);
      } else if (file.size > 500 * 1024) { // If WebP is larger than 500KB, still resize it
        console.log('Resizing WebP image...');
        processedFile = await resizeImage(file, 1200, 800, 0.85);
      }

      const blogId = editingBlog?.id || 'temp-' + Date.now();
      const imageUrl = await uploadBlogImage(processedFile, blogId);
      setBlogForm(prev => ({ ...prev, featuredImage: imageUrl }));

      // Show success message with compression info
      if (processedFile.size < file.size) {
        const compressionRatio = ((file.size - processedFile.size) / file.size * 100).toFixed(1);
        console.log(`Image optimized: ${compressionRatio}% size reduction`);
      }

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please check your permissions and try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveBlog = async () => {
    setSavingBlog(true);
    try {
      // Ensure both English and Hebrew slugs are generated
      const enSlug = generateSlug(blogForm.title.en);
      
      // For Hebrew slug, use the Hebrew title if available, otherwise use the English slug
      // This ensures we always have a valid slug for both languages
      const heSlug = blogForm.title.he ? generateSlug(blogForm.title.he) : enSlug;
      
      const blogData = {
        ...blogForm,
        slug: {
          en: enSlug,
          he: heSlug
        },
        readTime: {
          en: calculateReadTime(blogForm.content.en),
          he: calculateReadTime(blogForm.content.he)
        },
        author: {
          name: user?.email || 'Admin',
          email: user?.email || ''
        },
        publishedAt: blogForm.published ? new Date() : null
      };

      if (editingBlog) {
        // If we're changing from unpublished to published, set publishedAt
        if (blogForm.published && !editingBlog.published) {
          blogData.publishedAt = new Date();
        }
        await updateBlogPost(editingBlog.id!, blogData);
      } else {
        await createBlogPost(blogData);
      }

      await loadBlogs();
      setShowBlogForm(false);
      resetBlogForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog post. Please try again.');
    } finally {
      setSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await deleteBlogPost(blogId);
      await loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.en.toLowerCase().includes(blogFilter.toLowerCase()) ||
    blog.title.he.toLowerCase().includes(blogFilter.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(blogFilter.toLowerCase()))
  );

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactFilter.toLowerCase()) ||
    contact.email.toLowerCase().includes(contactFilter.toLowerCase()) ||
    contact.company?.toLowerCase().includes(contactFilter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFCFF] flex items-center justify-center">
        <LoaderIcon className="w-8 h-8 animate-spin text-[#389CFF]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FBFCFF] flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div 
            className="p-8"
            style={{
              backgroundColor: 'rgb(246, 251, 255)',
              borderRadius: '16px',
              boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
            }}
          >
            <h1 className="text-2xl font-bold text-black mb-6 text-center">Admin Login</h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 text-sm text-center">{loginError}</div>
              )}
              
              <Button 
                type="submit" 
                variant="cta-primary" 
                size="cta" 
                className="w-full"
                disabled={loggingIn}
              >
                {loggingIn ? (
                  <>
                    <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFCFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-20">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'blogs'
                ? 'bg-[#389CFF] text-white'
                : 'bg-white border border-[#d8dfe5] text-[#64646e] hover:border-[#389CFF]'
            }`}
          >
            <BookOpenIcon className="w-4 h-4 inline mr-2" />
            Blogs ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'contacts'
                ? 'bg-[#389CFF] text-white'
                : 'bg-white border border-[#d8dfe5] text-[#64646e] hover:border-[#389CFF]'
            }`}
          >
            <UsersIcon className="w-4 h-4 inline mr-2" />
            Contacts ({contacts.length})
          </button>
        </div>

        {activeTab === 'blogs' && (
          <div>
            {/* Blog Management Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64646e]" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={blogFilter}
                    onChange={(e) => setBlogFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                  />
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  resetBlogForm();
                  setShowBlogForm(true);
                }}
                variant="cta-primary"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                New Blog Post
              </Button>
            </div>

            {/* Blog Form Modal */}
            {showBlogForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div 
                  className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  style={{
                    backgroundColor: 'rgb(246, 251, 255)',
                    borderRadius: '16px'
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-black">
                        {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                      </h2>
                      <button
                        onClick={() => setShowBlogForm(false)}
                        className="text-[#64646e] hover:text-black"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Title */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Title (English)</label>
                          <input
                            type="text"
                            value={blogForm.title.en}
                            onChange={(e) => setBlogForm(prev => ({
                              ...prev,
                              title: { ...prev.title, en: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Title (Hebrew)</label>
                          <input
                            type="text"
                            value={blogForm.title.he}
                            onChange={(e) => setBlogForm(prev => ({
                              ...prev,
                              title: { ...prev.title, he: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Excerpt */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Excerpt (English)</label>
                          <textarea
                            value={blogForm.excerpt.en}
                            onChange={(e) => setBlogForm(prev => ({
                              ...prev,
                              excerpt: { ...prev.excerpt, en: e.target.value }
                            }))}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Excerpt (Hebrew)</label>
                          <textarea
                            value={blogForm.excerpt.he}
                            onChange={(e) => setBlogForm(prev => ({
                              ...prev,
                              excerpt: { ...prev.excerpt, he: e.target.value }
                            }))}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent resize-none"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-black">
                              Content (English)
                              <span className="text-xs text-[#64646e] ml-2">
                                (Line breaks will be preserved. HTML and Markdown supported.)
                              </span>
                            </label>
                            <button
                              type="button"
                              onClick={() => setPreviewMode(prev => ({ ...prev, en: !prev.en }))}
                              className="flex items-center gap-1 text-xs text-[#389CFF] hover:text-[#2980ff] transition-colors"
                            >
                              {previewMode.en ? (
                                <>
                                  <EyeOffIcon className="w-3 h-3" />
                                  Edit
                                </>
                              ) : (
                                <>
                                  <EyeIcon className="w-3 h-3" />
                                  Preview
                                </>
                              )}
                            </button>
                          </div>
                          
                          {!previewMode.en ? (
                            <>
                              <div className="mb-2 text-xs text-[#64646e] bg-gray-50 p-2 rounded">
                                <p className="mb-1">Formatting tips:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                  <li><code>**bold text**</code> for <strong>bold text</strong></li>
                                  <li><code>*italic text*</code> for <em>italic text</em></li>
                                  <li><code># Heading 1</code> for headings</li>
                                  <li><code>- item</code> for bullet lists</li>
                                  <li><code>[link text](url)</code> for links</li>
                                </ul>
                              </div>
                              <textarea
                                value={blogForm.content.en}
                                onChange={(e) => setBlogForm(prev => ({
                                  ...prev,
                                  content: { ...prev.content, en: e.target.value }
                                }))}
                                rows={10}
                                className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent resize-none font-mono"
                              />
                            </>
                          ) : (
                            <div className="border border-[#d8dfe5] rounded-lg p-4 bg-white h-[260px] overflow-auto">
                              <div className="prose prose-sm max-w-none prose-headings:text-[#161e2e] prose-a:text-[#389CFF]">
                                <ReactMarkdown 
                                  rehypePlugins={[rehypeRaw]}
                                  components={{
                                    p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                                    h1: ({children}) => <h1 className="text-lg font-bold mb-3 mt-4 first:mt-0">{children}</h1>,
                                    h2: ({children}) => <h2 className="text-base font-bold mb-2 mt-4 first:mt-0">{children}</h2>,
                                    h3: ({children}) => <h3 className="text-sm font-bold mb-2 mt-3 first:mt-0">{children}</h3>,
                                    ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                                    ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                                    li: ({children}) => <li className="leading-relaxed">{children}</li>,
                                    blockquote: ({children}) => <blockquote className="border-l-2 border-[#389CFF] pl-2 italic my-3">{children}</blockquote>,
                                    pre: ({children}) => <pre className="bg-gray-100 rounded p-2 overflow-x-auto my-3 text-xs">{children}</pre>,
                                    code: ({children, className}) => {
                                      const isInline = !className;
                                      return isInline ? 
                                        <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{children}</code> :
                                        <code className={className}>{children}</code>;
                                    }
                                  }}
                                >
                                  {blogForm.content.en || '*No content yet*'}
                                </ReactMarkdown>
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-black">
                              Content (Hebrew)
                              <span className="text-xs text-[#64646e] ml-2">
                                (Line breaks will be preserved. HTML and Markdown supported.)
                              </span>
                            </label>
                            <button
                              type="button"
                              onClick={() => setPreviewMode(prev => ({ ...prev, he: !prev.he }))}
                              className="flex items-center gap-1 text-xs text-[#389CFF] hover:text-[#2980ff] transition-colors"
                            >
                              {previewMode.he ? (
                                <>
                                  <EyeOffIcon className="w-3 h-3" />
                                  Edit
                                </>
                              ) : (
                                <>
                                  <EyeIcon className="w-3 h-3" />
                                  Preview
                                </>
                              )}
                            </button>
                          </div>
                          
                          {!previewMode.he ? (
                            <>
                              <div className="mb-2 text-xs text-[#64646e] bg-gray-50 p-2 rounded">
                                <p className="mb-1">Formatting tips:</p>
                                <ul className="list-disc pl-4 space-y-1">
                                  <li><code>**bold text**</code> for <strong>bold text</strong></li>
                                  <li><code>*italic text*</code> for <em>italic text</em></li>
                                  <li><code># Heading 1</code> for headings</li>
                                  <li><code>- item</code> for bullet lists</li>
                                  <li><code>[link text](url)</code> for links</li>
                                </ul>
                              </div>
                              <textarea
                                value={blogForm.content.he}
                                onChange={(e) => setBlogForm(prev => ({
                                  ...prev,
                                  content: { ...prev.content, he: e.target.value }
                                }))}
                                rows={10}
                                className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent resize-none font-mono"
                              />
                            </>
                          ) : (
                            <div className="border border-[#d8dfe5] rounded-lg p-4 bg-white h-[260px] overflow-auto" dir="rtl">
                              <div className="prose prose-sm max-w-none prose-headings:text-[#161e2e] prose-a:text-[#389CFF]">
                                <ReactMarkdown 
                                  rehypePlugins={[rehypeRaw]}
                                  components={{
                                    p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                                    h1: ({children}) => <h1 className="text-lg font-bold mb-3 mt-4 first:mt-0">{children}</h1>,
                                    h2: ({children}) => <h2 className="text-base font-bold mb-2 mt-4 first:mt-0">{children}</h2>,
                                    h3: ({children}) => <h3 className="text-sm font-bold mb-2 mt-3 first:mt-0">{children}</h3>,
                                    ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1 mr-4">{children}</ul>,
                                    ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1 mr-4">{children}</ol>,
                                    li: ({children}) => <li className="leading-relaxed">{children}</li>,
                                    blockquote: ({children}) => <blockquote className="border-r-2 border-[#389CFF] pr-2 italic my-3">{children}</blockquote>,
                                    pre: ({children}) => <pre className="bg-gray-100 rounded p-2 overflow-x-auto my-3 text-xs">{children}</pre>,
                                    code: ({children, className}) => {
                                      const isInline = !className;
                                      return isInline ? 
                                        <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{children}</code> :
                                        <code className={className}>{children}</code>;
                                    }
                                  }}
                                >
                                  {blogForm.content.he || '*אין תוכן עדיין*'}
                                </ReactMarkdown>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={blogForm.tags.join(', ')}
                          onChange={(e) => setBlogForm(prev => ({
                            ...prev,
                            tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                          }))}
                          className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                        />
                      </div>

                      {/* Featured Image */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Featured Image</label>
                        <div className="mb-2 text-xs text-[#64646e] bg-gray-50 p-2 rounded">
                          <p>📷 Images will be automatically optimized:</p>
                          <ul className="list-disc pl-4 mt-1 space-y-1">
                            <li>Converted to WebP format for better compression</li>
                            <li>Resized to max 1200x800 pixels if larger</li>
                            <li>Compressed to reduce file size by 60-80%</li>
                            <li>Supports: JPEG, PNG, WebP (max 10MB)</li>
                          </ul>
                        </div>
                        <div className="flex items-center gap-4">
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#d8dfe5] text-[#64646e] rounded-lg hover:border-[#389CFF] cursor-pointer transition-colors"
                          >
                            {uploadingImage ? (
                              <>
                                <LoaderIcon className="w-4 h-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <UploadIcon className="w-4 h-4" />
                                Upload & Optimize Image
                              </>
                            )}
                          </label>
                          {blogForm.featuredImage && (
                            <div className="flex items-center gap-2">
                              <img
                                src={blogForm.featuredImage}
                                alt="Featured"
                                className="h-16 w-16 object-cover rounded-lg border border-[#d8dfe5]"
                              />
                              <div className="text-xs text-[#64646e]">
                                <div>✅ Optimized WebP</div>
                                <button
                                  type="button"
                                  onClick={() => setBlogForm(prev => ({ ...prev, featuredImage: '' }))}
                                  className="text-red-500 hover:text-red-700 mt-1"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SEO */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Meta Title (English)</label>
                          <input
                            type="text"
                            value={blogForm.seo.metaTitle.en}
                            onChange={(e) => setBlogForm(prev => ({
                              ...prev,
                              seo: {
                                ...prev.seo,
                                metaTitle: { ...prev.seo.metaTitle, en: e.target.value }
                              }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-2">Meta Title (Hebrew)</label>
                          <input
                            type="text"
                            value={blogForm.seo.metaTitle.he}
                            onChange={(e) => setBlogForm(prev => ({
                              ...prev,
                              seo: {
                                ...prev.seo,
                                metaTitle: { ...prev.seo.metaTitle, he: e.target.value }
                              }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Published Status */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="published"
                          checked={blogForm.published}
                          onChange={(e) => setBlogForm(prev => ({
                            ...prev,
                            published: e.target.checked
                          }))}
                          className="w-4 h-4 text-[#389CFF] rounded focus:ring-[#389CFF]"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-black">
                          Publish immediately
                        </label>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-4 border-t border-[#d8dfe5]">
                        <Button 
                          onClick={handleSaveBlog}
                          disabled={savingBlog}
                          variant="cta-primary"
                        >
                          {savingBlog ? (
                            <>
                              <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <SaveIcon className="w-4 h-4 mr-2" />
                              {editingBlog ? 'Update' : 'Create'} Blog Post
                            </>
                          )}
                        </Button>
                        <Button 
                          onClick={() => setShowBlogForm(false)}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blog List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredBlogs.map(blog => (
                <div
                  key={blog.id}
                  className="p-6 bg-white rounded-xl border border-[#d8dfe5] hover:border-[#389CFF] transition-colors"
                >
                                      <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-black">
                          {blog.title[language]}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          blog.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                        {blog.metadata?.aiGenerated && (
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            🤖 AI Generated
                          </span>
                        )}
                        {blog.metadata?.generatedFrom === 'twitter-thread' && (
                          <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            🐦 From Twitter
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[#64646e] text-sm mb-3 line-clamp-2">
                        {blog.excerpt[language]}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-[#64646e]">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {formatDate(blog.updatedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <TagIcon className="w-3 h-3" />
                          {blog.tags.slice(0, 3).join(', ')}
                        </span>
                        {blog.metadata?.sourceThread && (
                          <span className="flex items-center gap-1 text-purple-600">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            @{blog.metadata.sourceThread.username}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="p-2 text-[#64646e] hover:text-[#389CFF] transition-colors"
                        title="Edit"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id!)}
                        className="p-2 text-[#64646e] hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredBlogs.length === 0 && (
                <div className="text-center py-12">
                  <BookOpenIcon className="w-16 h-16 text-[#64646e] mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-black mb-2">No blog posts found</h3>
                  <p className="text-[#64646e]">Create your first blog post to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            {/* Contact Management Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64646e]" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={contactFilter}
                  onChange={(e) => setContactFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-[#d8dfe5] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent"
                />
              </div>
            </div>

            {/* Contact List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className="p-6 bg-white rounded-xl border border-[#d8dfe5] hover:border-[#389CFF] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-black">
                          {contact.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          contact.status === 'new' 
                            ? 'bg-blue-100 text-blue-800'
                            : contact.status === 'contacted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-[#64646e]">
                          <MailIcon className="w-4 h-4" />
                          <a href={`mailto:${contact.email}`} className="hover:text-[#389CFF]">
                            {contact.email}
                          </a>
                        </div>
                        
                        {contact.phone && (
                          <div className="flex items-center gap-2 text-sm text-[#64646e]">
                            <PhoneIcon className="w-4 h-4" />
                            <a href={`tel:${contact.phone}`} className="hover:text-[#389CFF]">
                              {contact.phone}
                            </a>
                          </div>
                        )}
                        
                        {contact.company && (
                          <div className="text-sm text-[#64646e]">
                            <strong>Company:</strong> {contact.company}
                          </div>
                        )}
                        
                        {contact.service && (
                          <div className="text-sm text-[#64646e]">
                            <strong>Service:</strong> {contact.service}
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-[#64646e]">{contact.message}</p>
                      </div>
                      
                      <div className="text-xs text-[#64646e]">
                        <CalendarIcon className="w-3 h-3 inline mr-1" />
                        {formatDate(contact.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredContacts.length === 0 && (
                <div className="text-center py-12">
                  <UsersIcon className="w-16 h-16 text-[#64646e] mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold text-black mb-2">No contacts found</h3>
                  <p className="text-[#64646e]">Contact submissions will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 