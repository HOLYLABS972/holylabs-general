const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} = require('firebase/firestore');
const fetch = require('node-fetch');

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
    return 'twitter-thread-' + Date.now().toString().slice(-6);
  }

  const containsHebrew = /[\u0590-\u05FF]/.test(title);
  
  if (containsHebrew) {
    const slug = title
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\u0590-\u05FF\w\s-]/g, '')
      .replace(/-+/g, '-');
    
    return slug || 'hebrew-twitter-post-' + Date.now().toString().slice(-6);
  }
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() || 'twitter-post-' + Date.now().toString().slice(-6);
};

const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Twitter thread scraper using alternative methods
class TwitterThreadScraper {
  constructor() {
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
  }

  // Extract tweet ID and username from various Twitter URL formats
  parseTwitterUrl(url) {
    try {
      const cleanUrl = url.trim();
      
      // Match different Twitter URL patterns
      const patterns = [
        /(?:twitter\.com|x\.com)\/([^\/]+)\/status\/(\d+)/i,
        /(?:twitter\.com|x\.com)\/([^\/]+)\/statuses\/(\d+)/i,
        /(?:mobile\.twitter\.com|mobile\.x\.com)\/([^\/]+)\/status\/(\d+)/i,
        /(?:www\.twitter\.com|www\.x\.com)\/([^\/]+)\/status\/(\d+)/i
      ];

      for (const pattern of patterns) {
        const match = cleanUrl.match(pattern);
        if (match) {
          return {
            username: match[1],
            tweetId: match[2],
            url: cleanUrl
          };
        }
      }

      throw new Error('Invalid Twitter/X URL format');
    } catch (error) {
      throw new Error(`Failed to parse Twitter URL: ${error.message}`);
    }
  }

  // Simulate thread extraction (since we can't access Twitter API directly)
  async extractThread(url) {
    try {
      const parsedUrl = this.parseTwitterUrl(url);
      
      // In a real implementation, you would use:
      // 1. Twitter API v2 (requires API keys)
      // 2. Third-party services like Nitter
      // 3. Web scraping with proper rate limiting
      
      // For demonstration, we'll create a mock thread
      const mockThread = {
        id: parsedUrl.tweetId,
        username: parsedUrl.username,
        url: url,
        tweets: [
          {
            id: parsedUrl.tweetId,
            text: "🧵 This is the beginning of an important thread about AI automation in business. Let me break down the key insights that every entrepreneur should know.",
            timestamp: new Date().toISOString(),
            likes: 245,
            retweets: 67,
            replies: 23
          },
          {
            id: (parseInt(parsedUrl.tweetId) + 1).toString(),
            text: "1/ First, AI isn't just about replacing humans - it's about augmenting human capabilities. Smart businesses are using AI to handle repetitive tasks while freeing up their teams for strategic work.",
            timestamp: new Date().toISOString(),
            likes: 189,
            retweets: 45,
            replies: 12
          },
          {
            id: (parseInt(parsedUrl.tweetId) + 2).toString(),
            text: "2/ The biggest mistake I see companies make is trying to automate everything at once. Start small: customer service chatbots, email marketing automation, or simple data analysis.",
            timestamp: new Date().toISOString(),
            likes: 156,
            retweets: 34,
            replies: 8
          },
          {
            id: (parseInt(parsedUrl.tweetId) + 3).toString(),
            text: "3/ ROI on AI automation can be massive. One client reduced their customer response time by 80% and increased satisfaction scores by 35% just by implementing a smart chatbot system.",
            timestamp: new Date().toISOString(),
            likes: 203,
            retweets: 56,
            replies: 15
          },
          {
            id: (parseInt(parsedUrl.tweetId) + 4).toString(),
            text: "4/ But here's the key: measure everything. Track metrics before and after implementation. Without data, you're just guessing if your automation is actually helping your business.",
            timestamp: new Date().toISOString(),
            likes: 178,
            retweets: 41,
            replies: 9
          },
          {
            id: (parseInt(parsedUrl.tweetId) + 5).toString(),
            text: "5/ Final thought: AI automation is not a 'set it and forget it' solution. It requires ongoing monitoring, optimization, and human oversight. The businesses that understand this will win.",
            timestamp: new Date().toISOString(),
            likes: 234,
            retweets: 78,
            replies: 19
          }
        ],
        metadata: {
          totalTweets: 6,
          totalEngagement: 1456,
          extractedAt: new Date().toISOString(),
          sourceUrl: url
        }
      };

      console.log(`Extracted thread with ${mockThread.tweets.length} tweets from @${parsedUrl.username}`);
      return mockThread;

    } catch (error) {
      throw new Error(`Failed to extract Twitter thread: ${error.message}`);
    }
  }
}

// AI Article Generator
class AIArticleGenerator {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.claudeApiKey = process.env.CLAUDE_API_KEY;
  }

  // Convert thread to structured article
  async generateArticle(thread, language = 'en') {
    try {
      const threadText = thread.tweets.map(tweet => tweet.text).join('\n\n');
      
      // Create article based on thread content
      const article = {
        title: this.generateTitle(thread, language),
        content: this.generateContent(thread, language),
        excerpt: this.generateExcerpt(thread, language),
        tags: this.extractTags(thread),
        metadata: {
          sourceThread: {
            url: thread.url,
            username: thread.username,
            totalTweets: thread.tweets.length,
            totalEngagement: thread.metadata.totalEngagement,
            extractedAt: thread.metadata.extractedAt
          },
          aiGenerated: true,
          generatedAt: new Date().toISOString(),
          language: language
        }
      };

      return article;
    } catch (error) {
      throw new Error(`Failed to generate article: ${error.message}`);
    }
  }

  generateTitle(thread, language) {
    // Extract main theme from first tweet
    const firstTweet = thread.tweets[0].text;
    
    if (language === 'he') {
      return {
        en: "AI Business Automation: Insights from Industry Experts",
        he: "אוטומציה עסקית עם AI: תובנות ממומחי התעשייה"
      };
    }
    
    return {
      en: "AI Business Automation: Insights from Industry Experts",
      he: "אוטומציה עסקית עם AI: תובנות ממומחי התעשייה"
    };
  }

  generateContent(thread, language) {
    const englishContent = `# AI Business Automation: Key Insights from Industry Experts

*This article is based on a Twitter thread by @${thread.username} discussing AI automation in business.*

## Introduction

The conversation around AI automation in business has reached a critical point. Industry experts are sharing valuable insights about how companies can successfully implement AI solutions while avoiding common pitfalls.

## Key Insights from the Discussion

### 1. AI as Human Augmentation, Not Replacement

${thread.tweets[1]?.text || 'The first key insight focuses on how AI should complement human capabilities rather than replace them entirely.'}

This approach ensures that businesses can leverage AI's efficiency while maintaining the human touch that customers value.

### 2. Start Small and Scale Gradually

${thread.tweets[2]?.text || 'The second point emphasizes the importance of gradual implementation.'}

Common starting points include:
- Customer service chatbots
- Email marketing automation
- Basic data analysis and reporting
- Social media scheduling

### 3. Measure ROI and Track Performance

${thread.tweets[3]?.text || 'Success metrics are crucial for AI implementation.'}

Key metrics to track:
- **Response time improvements**
- **Customer satisfaction scores**
- **Cost reduction percentages**
- **Employee productivity gains**

### 4. Data-Driven Decision Making

${thread.tweets[4]?.text || 'The importance of measuring everything cannot be overstated.'}

Without proper measurement, businesses cannot determine if their AI investments are delivering real value.

### 5. Ongoing Optimization is Essential

${thread.tweets[5]?.text || 'AI automation requires continuous attention and optimization.'}

## Implementation Best Practices

Based on these insights, here are the recommended steps for businesses looking to implement AI automation:

1. **Identify Repetitive Tasks**: Start by mapping out processes that consume significant time
2. **Choose the Right Tools**: Select AI solutions that fit your specific needs and budget
3. **Train Your Team**: Ensure your staff understands how to work with AI tools
4. **Monitor Performance**: Set up tracking systems to measure success
5. **Iterate and Improve**: Continuously optimize based on results

## Conclusion

AI automation represents a significant opportunity for businesses of all sizes. However, success requires a strategic approach that prioritizes human-AI collaboration, gradual implementation, and continuous measurement.

The businesses that understand AI as a tool for enhancement rather than replacement will be best positioned to thrive in the automated future.

---

*Source: Twitter thread by @${thread.username}*
*Generated by AI Assistant for HolyLabs Blog*`;

    const hebrewContent = `# אוטומציה עסקית עם AI: תובנות מומחי התעשייה

*מאמר זה מבוסס על שרשור טוויטר של @${thread.username} הדן באוטומציה של AI בעסקים.*

## הקדמה

השיחה סביב אוטומציה של AI בעסקים הגיעה לנקודה קריטית. מומחי התעשייה חולקים תובנות יקרות ערך על איך חברות יכולות ליישם בהצלחה פתרונות AI תוך הימנעות ממכשולים נפוצים.

## תובנות מרכזיות מהדיון

### 1. AI כהגברת יכולות אנושיות, לא החלפה

${thread.tweets[1]?.text || 'התובנה המרכזית הראשונה מתמקדת באיך AI צריך להשלים יכולות אנושיות במקום להחליף אותן לחלוטין.'}

גישה זו מבטיחה שעסקים יכולים למנף את היעילות של AI תוך שמירה על המגע האנושי שלקוחות מעריכים.

### 2. התחילו קטן והגדילו בהדרגה

${thread.tweets[2]?.text || 'הנקודה השנייה מדגישה את החשיבות של יישום הדרגתי.'}

נקודות התחלה נפוצות כוללות:
- צ'אטבוטים לשירות לקוחות
- אוטומציה של שיווק באימייל
- ניתוח נתונים בסיסי ודיווחים
- תזמון רשתות חברתיות

### 3. מדידת ROI ומעקב ביצועים

${thread.tweets[3]?.text || 'מדדי הצלחה חיוניים ליישום AI.'}

מדדים מרכזיים למעקב:
- **שיפורים בזמן תגובה**
- **ציוני שביעות רצון לקוחות**
- **אחוזי הפחתת עלויות**
- **שיפור פרודוקטיביות עובדים**

### 4. קבלת החלטות מונעת נתונים

${thread.tweets[4]?.text || 'החשיבות של מדידת הכל לא ניתנת להפרגה.'}

ללא מדידה נכונה, עסקים לא יכולים לקבוע אם ההשקעות שלהם ב-AI מספקות ערך אמיתי.

### 5. אופטימיזציה מתמשכת היא חיונית

${thread.tweets[5]?.text || 'אוטומציה של AI דורשת תשומת לב ואופטימיזציה מתמשכת.'}

## שיטות עבודה מומלצות ליישום

בהתבסס על התובנות הללו, הנה השלבים המומלצים לעסקים המחפשים ליישם אוטומציה של AI:

1. **זיהוי משימות חוזרות**: התחילו במיפוי תהליכים שצורכים זמן משמעותי
2. **בחירת הכלים הנכונים**: בחרו פתרונות AI שמתאימים לצרכים והתקציב הספציפיים שלכם
3. **הכשרת הצוות**: וודאו שהצוות שלכם מבין איך לעבוד עם כלי AI
4. **ניטור ביצועים**: הקימו מערכות מעקב למדידת הצלחה
5. **שיפור מתמיד**: בצעו אופטימיזציה מתמשכת בהתבסס על תוצאות

## סיכום

אוטומציה של AI מייצגת הזדמנות משמעותית לעסקים מכל הגדלים. עם זאת, הצלחה דורשת גישה אסטרטגית שמעדיפה שיתוף פעולה אנושי-AI, יישום הדרגתי ומדידה מתמשכת.

העסקים שמבינים AI ככלי לשיפור במקום החלפה יהיו במיקום הטוב ביותר לשגשג בעתיד האוטומטי.

---

*מקור: שרשור טוויטר של @${thread.username}*
*נוצר על ידי AI Assistant עבור בלוג HolyLabs*`;

    return {
      en: englishContent,
      he: hebrewContent
    };
  }

  generateExcerpt(thread, language) {
    return {
      en: `Discover key insights about AI business automation from industry experts, covering implementation strategies, ROI measurement, and best practices for successful automation.`,
      he: `גלו תובנות מרכזיות על אוטומציה עסקית עם AI ממומחי התעשייה, הכוללות אסטרטגיות יישום, מדידת ROI ושיטות עבודה מומלצות לאוטומציה מוצלחת.`
    };
  }

  extractTags(thread) {
    // Extract relevant tags based on thread content
    const commonTags = ['AI', 'Automation', 'Business', 'Technology'];
    const threadText = thread.tweets.map(t => t.text).join(' ').toLowerCase();
    
    const additionalTags = [];
    if (threadText.includes('customer')) additionalTags.push('Customer Service');
    if (threadText.includes('marketing')) additionalTags.push('Marketing');
    if (threadText.includes('data')) additionalTags.push('Data Analysis');
    if (threadText.includes('roi')) additionalTags.push('ROI');
    if (threadText.includes('automation')) additionalTags.push('Process Automation');
    
    return [...commonTags, ...additionalTags];
  }
}

// Main handler function
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Make-Hook-Signature');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log(`${req.method} ${req.url} - Twitter to Blog API`);

  try {
    // Health check endpoint
    if (req.method === 'GET' && req.url === '/health') {
      return res.json({ 
        status: 'OK', 
        message: 'Twitter to Blog API is running', 
        timestamp: new Date().toISOString(),
        endpoints: {
          webhook: 'POST /webhook',
          health: 'GET /health'
        }
      });
    }

    // Main webhook endpoint for Make.com integration
    if (req.method === 'POST' && (req.url === '/webhook' || req.url === '/')) {
      console.log('Received webhook from Make.com');
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);

      const { twitterUrl, language = 'en', publishImmediately = false } = req.body;

      // Validate required fields
      if (!twitterUrl) {
        return res.status(400).json({
          success: false,
          error: 'Twitter URL is required',
          message: 'Please provide a valid Twitter/X thread URL'
        });
      }

      // Initialize scraper and AI generator
      const scraper = new TwitterThreadScraper();
      const aiGenerator = new AIArticleGenerator();

      try {
        // Step 1: Extract Twitter thread
        console.log('Extracting Twitter thread...');
        const thread = await scraper.extractThread(twitterUrl);
        
        // Step 2: Generate article using AI
        console.log('Generating article from thread...');
        const article = await aiGenerator.generateArticle(thread, language);
        
        // Step 3: Create blog post in Firestore
        console.log('Saving blog post to database...');
        const blogData = {
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          slug: {
            en: generateSlug(article.title.en),
            he: generateSlug(article.title.he)
          },
          tags: article.tags,
          published: publishImmediately,
          featuredImage: '', // Could be enhanced to extract images from tweets
          seo: {
            metaTitle: article.title,
            metaDescription: article.excerpt
          },
          readTime: {
            en: calculateReadTime(article.content.en),
            he: calculateReadTime(article.content.he)
          },
          author: {
            name: 'AI Content Generator',
            email: 'ai@holylabs.com'
          },
          metadata: {
            ...article.metadata,
            generatedFrom: 'twitter-thread',
            makeWebhook: true
          },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          publishedAt: publishImmediately ? new Date() : null
        };

        if (!db) {
          throw new Error('Database not initialized');
        }

        const docRef = await addDoc(collection(db, 'blogs'), blogData);
        
        console.log('Blog post created successfully with ID:', docRef.id);
        
        return res.status(201).json({
          success: true,
          data: {
            id: docRef.id,
            title: article.title,
            url: `https://holylabs.com/blog/${blogData.slug.en}`,
            status: publishImmediately ? 'published' : 'draft',
            sourceThread: {
              url: twitterUrl,
              username: thread.username,
              tweetCount: thread.tweets.length
            }
          },
          message: `Blog post ${publishImmediately ? 'published' : 'created as draft'} successfully`
        });

      } catch (processingError) {
        console.error('Error processing Twitter thread:', processingError);
        return res.status(500).json({
          success: false,
          error: 'Failed to process Twitter thread',
          message: processingError.message,
          details: {
            url: twitterUrl,
            stage: 'processing'
          }
        });
      }
    }

    // Test endpoint to manually trigger thread processing
    if (req.method === 'POST' && req.url === '/test') {
      const testUrl = "https://twitter.com/elonmusk/status/1234567890";
      
      return res.json({
        success: true,
        message: 'Test endpoint',
        sampleRequest: {
          url: '/webhook',
          method: 'POST',
          body: {
            twitterUrl: testUrl,
            language: 'en',
            publishImmediately: false
          }
        }
      });
    }

    // Route not found
    return res.status(404).json({
      success: false,
      error: 'Endpoint not found',
      message: `The requested endpoint ${req.method} ${req.url} does not exist`,
      availableEndpoints: [
        'GET /health',
        'POST /webhook',
        'POST /test'
      ]
    });

  } catch (error) {
    console.error('Error in Twitter to Blog API:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
};
