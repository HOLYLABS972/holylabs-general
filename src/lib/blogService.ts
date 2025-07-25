import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  serverTimestamp,
  DocumentSnapshot
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';

export interface BlogPost {
  id?: string;
  title: {
    en: string;
    he: string;
  };
  content: {
    en: string;
    he: string;
  };
  excerpt: {
    en: string;
    he: string;
  };
  slug: {
    en: string;
    he: string;
  };
  featuredImage?: string;
  images?: string[];
  tags: string[];
  author: {
    name: string;
    email: string;
  };
  published: boolean;
  publishedAt?: any;
  createdAt: any;
  updatedAt: any;
  readTime: {
    en: number;
    he: number;
  };
  seo: {
    metaTitle: {
      en: string;
      he: string;
    };
    metaDescription: {
      en: string;
      he: string;
    };
  };
}

export interface BlogFilter {
  tags?: string[];
  published?: boolean;
  searchTerm?: string;
  language?: 'en' | 'he';
  limit?: number;
  lastDoc?: DocumentSnapshot;
}

// Upload image to Firebase Storage
export const uploadBlogImage = async (file: File, blogId: string): Promise<string> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
    const storageRef = ref(storage, `blog-images/${blogId}/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Delete image from Firebase Storage
export const deleteBlogImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Create a new blog post
export const createBlogPost = async (blogData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

// Update a blog post
export const updateBlogPost = async (blogId: string, blogData: Partial<BlogPost>): Promise<void> => {
  try {
    const blogRef = doc(db, 'blogs', blogId);
    await updateDoc(blogRef, {
      ...blogData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlogPost = async (blogId: string): Promise<void> => {
  try {
    // First, delete all associated images
    const blogDoc = await getDoc(doc(db, 'blogs', blogId));
    if (blogDoc.exists()) {
      const blogData = blogDoc.data() as BlogPost;
      if (blogData.featuredImage) {
        await deleteBlogImage(blogData.featuredImage);
      }
      if (blogData.images) {
        await Promise.all(blogData.images.map(img => deleteBlogImage(img)));
      }
    }
    
    // Then delete the blog document
    await deleteDoc(doc(db, 'blogs', blogId));
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

// Get a single blog post by ID
export const getBlogPost = async (blogId: string): Promise<BlogPost | null> => {
  try {
    const blogDoc = await getDoc(doc(db, 'blogs', blogId));
    if (blogDoc.exists()) {
      return { id: blogDoc.id, ...blogDoc.data() } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

// Get blog post by slug
export const getBlogPostBySlug = async (slug: string, language: 'en' | 'he'): Promise<BlogPost | null> => {
  try {
    if (!slug || slug.trim() === '') {
      console.error('Empty or invalid slug provided to getBlogPostBySlug');
      return null;
    }
    
    const trimmedSlug = slug.trim();
    console.log(`Searching for blog post with slug: "${trimmedSlug}" in language: ${language}`);
    
    // Use proper Firestore nested field path syntax
    const slugField = `slug.${language}`;
    
    try {
      const q = query(
        collection(db, 'blogs'),
        where(slugField, '==', trimmedSlug),
        where('published', '==', true),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const blogPost = { id: doc.id, ...doc.data() } as BlogPost;
        console.log(`Found blog post with ID: ${blogPost.id}`);
        return blogPost;
      }
      
      console.log(`No blog post found with slug '${trimmedSlug}' in language '${language}'`);
      
      // Fallback: Try to find the post in any language if not found in the specified language
      try {
        const fallbackQuery = query(
          collection(db, 'blogs'),
          where('published', '==', true),
          limit(50) // Reasonable limit for fallback search
        );
        
        const fallbackSnapshot = await getDocs(fallbackQuery);
        
        for (const doc of fallbackSnapshot.docs) {
          const data = doc.data() as BlogPost;
          // Check if the slug matches in any language
          if (data.slug) {
            const slugValues = Object.values(data.slug);
            if (slugValues.includes(trimmedSlug)) {
              console.log(`Found blog post with matching slug in fallback search: ${doc.id}`);
              return { id: doc.id, ...data } as BlogPost;
            }
          }
        }
        
        console.log(`No blog post found with slug '${trimmedSlug}' in fallback search`);
      } catch (fallbackError) {
        console.error('Error in fallback slug search:', fallbackError);
      }
      
      return null;
    } catch (queryError) {
      console.error('Error executing Firestore query:', queryError);
      
      // If the main query fails, try a more basic approach
      try {
        console.log('Attempting basic collection fetch as fallback...');
        const allPosts = await getDocs(collection(db, 'blogs'));
        
        for (const doc of allPosts.docs) {
          const data = doc.data() as BlogPost;
          if (data.published && data.slug) {
            // Check if slug matches in the requested language or any language
            if (data.slug[language] === trimmedSlug || 
                Object.values(data.slug).includes(trimmedSlug)) {
              console.log(`Found blog post in basic fallback: ${doc.id}`);
              return { id: doc.id, ...data } as BlogPost;
            }
          }
        }
        
        console.log('No matching post found in basic fallback');
        return null;
      } catch (fallbackError) {
        console.error('Basic fallback also failed:', fallbackError);
        throw fallbackError;
      }
    }
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    throw error;
  }
};

// Get blog posts with filtering and pagination
export const getBlogPosts = async (filter: BlogFilter = {}): Promise<{
  posts: BlogPost[];
  hasMore: boolean;
  lastDoc?: DocumentSnapshot;
}> => {
  try {
    let q = query(collection(db, 'blogs'));
    
    // Apply filters
    if (filter.published !== undefined) {
      q = query(q, where('published', '==', filter.published));
    }
    
    if (filter.tags && filter.tags.length > 0) {
      q = query(q, where('tags', 'array-contains-any', filter.tags));
    }
    
    // Order by updatedAt for all posts (this field always exists)
    // For published posts, we can still sort by publishedAt in a separate query if needed
    if (filter.published === true) {
      q = query(q, orderBy('publishedAt', 'desc'));
    } else {
      q = query(q, orderBy('updatedAt', 'desc'));
    }
    
    // Apply pagination
    if (filter.lastDoc) {
      q = query(q, startAfter(filter.lastDoc));
    }
    
    const queryLimit = filter.limit || 10;
    q = query(q, limit(queryLimit + 1)); // Fetch one extra to check if there are more
    
    const querySnapshot = await getDocs(q);
    const posts: BlogPost[] = [];
    const docs = querySnapshot.docs;
    
    // Process the posts (excluding the extra one if it exists)
    const postsToProcess = docs.slice(0, queryLimit);
    
    for (const doc of postsToProcess) {
      const postData = { id: doc.id, ...doc.data() } as BlogPost;
      
      // Apply search filter on the client side for bilingual content
      if (filter.searchTerm) {
        const searchTerm = filter.searchTerm.toLowerCase();
        const titleMatch = postData.title.en.toLowerCase().includes(searchTerm) || 
                          postData.title.he.toLowerCase().includes(searchTerm);
        const contentMatch = postData.content.en.toLowerCase().includes(searchTerm) || 
                            postData.content.he.toLowerCase().includes(searchTerm);
        const excerptMatch = postData.excerpt.en.toLowerCase().includes(searchTerm) || 
                            postData.excerpt.he.toLowerCase().includes(searchTerm);
        
        if (titleMatch || contentMatch || excerptMatch) {
          posts.push(postData);
        }
      } else {
        posts.push(postData);
      }
    }
    
    return {
      posts,
      hasMore: docs.length > queryLimit,
      lastDoc: docs.length > queryLimit ? docs[queryLimit - 1] : undefined
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Get all unique tags
export const getBlogTags = async (): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'blogs'));
    const allTags = new Set<string>();
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data() as BlogPost;
      if (data.tags) {
        data.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    return Array.from(allTags).sort();
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    throw error;
  }
};

// Get popular/trending posts
export const getPopularPosts = async (postLimit: number = 5): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(db, 'blogs'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(postLimit)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    throw error;
  }
};

// Utility function to calculate read time
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Utility function to generate slug
export const generateSlug = (title: string): string => {
  if (!title || title.trim() === '') {
    return 'untitled-' + Date.now().toString().slice(-6);
  }

  // Check if the title contains Hebrew characters
  const containsHebrew = /[\u0590-\u05FF]/.test(title);
  
  if (containsHebrew) {
    // For Hebrew titles, preserve Hebrew characters
    // Replace spaces with hyphens and remove special characters
    const slug = title
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\u0590-\u05FF\w\s-]/g, '') // Keep Hebrew chars and basic Latin
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
    
    // If after processing we have an empty slug, use a fallback
    return slug || 'hebrew-post-' + Date.now().toString().slice(-6);
  }
  
  // For non-Hebrew titles, use the original approach
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim() || 'post-' + Date.now().toString().slice(-6); // Fallback if empty
}; 