const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGyqSsNJ4TVnkMcL8WZE82Yl11b9DG0qI",
  authDomain: "holylabs-6296d.firebaseapp.com",
  projectId: "holylabs-6296d",
  storageBucket: "holylabs-6296d.firebasestorage.app",
  messagingSenderId: "532593042455",
  appId: "1:532593042455:web:9ac07b24d2b596e5366852"
};

// Initialize Firebase
let firebaseApp, db;
try {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Utility functions
const generateSlug = (title) => {
  if (!title || title.trim() === '') {
    return 'untitled-' + Date.now().toString().slice(-6);
  }

  const containsHebrew = /[\u0590-\u05FF]/.test(title);
  
  if (containsHebrew) {
    const slug = title
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\u0590-\u05FF\w\s-]/g, '')
      .replace(/-+/g, '-');
    
    return slug || 'hebrew-post-' + Date.now().toString().slice(-6);
  }
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || 'post-' + Date.now().toString().slice(-6);
};

const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Main handler function
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`${req.method} ${req.url} - Firebase v10.7.1`);

  try {
    // Route handling
    if (req.method === 'GET' && req.url === '/') {
      return res.json({ 
        message: 'Blog API Server', 
        endpoints: {
          health: '/health',
          create: 'POST /',
        }
      });
    }

    if (req.method === 'GET' && req.url === '/health') {
      return res.json({ 
        status: 'OK', 
        message: 'Blog API is running', 
        timestamp: new Date().toISOString(),
        firebase: {
          projectId: firebaseConfig.projectId,
          initialized: !!db
        }
      });
    }

    if (req.method === 'POST' && (req.url === '/' || req.url === '/api/blogs')) {
      console.log('Received blog creation request');
      console.log('Request body keys:', Object.keys(req.body || {}));
      
      const {
        title,
        content,
        excerpt,
        tags = [],
        published = false,
        featuredImage,
        seo = {},
        author = {
          name: 'AI Assistant',
          email: 'ai@company.com'
        }
      } = req.body || {};

      console.log('Title:', title);
      console.log('Content length:', content?.en?.length || 0, content?.he?.length || 0);

      // Validate required fields
      if (!title || !content) {
        console.log('Validation failed: missing title or content');
        return res.status(400).json({
          success: false,
          error: 'Title and content are required'
        });
      }

      // Ensure both languages have content
      const blogData = {
        title: {
          en: title.en || title || '',
          he: title.he || ''
        },
        content: {
          en: content.en || content || '',
          he: content.he || ''
        },
        excerpt: {
          en: excerpt?.en || excerpt || '',
          he: excerpt?.he || ''
        },
        slug: {
          en: generateSlug(title.en || title),
          he: generateSlug(title.he || title.en || title)
        },
        tags: Array.isArray(tags) ? tags : [],
        published: Boolean(published),
        featuredImage: featuredImage || '',
        seo: {
          metaTitle: {
            en: seo.metaTitle?.en || title.en || title || '',
            he: seo.metaTitle?.he || title.he || ''
          },
          metaDescription: {
            en: seo.metaDescription?.en || excerpt?.en || excerpt || '',
            he: seo.metaDescription?.he || excerpt?.he || ''
          }
        },
        readTime: {
          en: calculateReadTime(content.en || content),
          he: calculateReadTime(content.he || content.en || content)
        },
        author: {
          name: author.name || 'AI Assistant',
          email: author.email || 'ai@company.com'
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: published ? new Date() : null
      };

      console.log('Attempting to save to Firestore...');
      console.log('Blog data structure:', {
        titleKeys: Object.keys(blogData.title),
        contentKeys: Object.keys(blogData.content),
        published: blogData.published
      });

      if (!db) {
        throw new Error('Database not initialized');
      }

      const docRef = await addDoc(collection(db, 'blogs'), blogData);
      
      console.log('Blog created successfully with ID:', docRef.id);
      
      return res.status(201).json({
        success: true,
        data: {
          id: docRef.id,
          ...blogData
        },
        message: 'Blog post created successfully'
      });
    }

    // Route not found
    return res.status(404).json({
      success: false,
      error: 'Endpoint not found',
      message: `The requested endpoint ${req.method} ${req.url} does not exist`
    });

  } catch (error) {
    console.error('Error in blogs API:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      details: error.stack
    });
  }
}; 