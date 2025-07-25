# Blog Platform API

A comprehensive REST API for managing blog posts, designed for AI bot integration to generate content for CEOs and content creators.

## Features

- ✅ Create, read, update, and delete blog posts
- ✅ Bilingual support (English and Hebrew)
- ✅ Markdown content support
- ✅ Image upload and management
- ✅ SEO metadata management
- ✅ Tag management
- ✅ Automatic slug generation
- ✅ Read time calculation
- ✅ Firebase integration

## Quick Start

### 1. Installation

```bash
cd api
npm install
```

### 2. Environment Setup

Create a `.env` file with your Firebase configuration:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /health
```

### Blog Posts

#### Get All Blog Posts
```
GET /api/blogs?published=true&limit=10
```

#### Get Blog Post by ID
```
GET /api/blogs/:id
```

#### Create New Blog Post
```
POST /api/blogs
```

#### Update Blog Post
```
PUT /api/blogs/:id
```

#### Delete Blog Post
```
DELETE /api/blogs/:id
```

### Tags
```
GET /api/tags
```

### Image Upload
```
POST /api/upload-image
```

## AI Bot Integration Examples

### 1. Create a Blog Post

```javascript
const createBlogPost = async (blogData) => {
  const response = await fetch('http://localhost:3001/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: {
        en: "The Future of AI in Business",
        he: "עתיד הבינה המלאכותית בעסקים"
      },
      content: {
        en: "# The Future of AI in Business\n\nArtificial Intelligence is transforming how businesses operate...",
        he: "# עתיד הבינה המלאכותית בעסקים\n\nהבינה המלאכותית משנה את האופן שבו עסקים פועלים..."
      },
      excerpt: {
        en: "Discover how AI is revolutionizing business operations and what it means for the future.",
        he: "גלה כיצד בינה מלאכותית מהפכת את פעולות העסק ומה זה אומר לעתיד."
      },
      tags: ["AI", "Business", "Technology", "Innovation"],
      published: true,
      author: {
        name: "AI Assistant",
        email: "ai@company.com"
      }
    })
  });
  
  return await response.json();
};
```

### 2. Update a Blog Post

```javascript
const updateBlogPost = async (id, updates) => {
  const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates)
  });
  
  return await response.json();
};
```

### 3. Upload an Image

```javascript
const uploadImage = async (imageData, fileName) => {
  const response = await fetch('http://localhost:3001/api/upload-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageData: imageData, // Base64 encoded image
      fileName: fileName
    })
  });
  
  return await response.json();
};
```

### 4. Get All Published Posts

```javascript
const getPublishedPosts = async () => {
  const response = await fetch('http://localhost:3001/api/blogs?published=true&limit=50');
  return await response.json();
};
```

## Request/Response Formats

### Blog Post Structure

```json
{
  "id": "unique_id",
  "title": {
    "en": "English Title",
    "he": "Hebrew Title"
  },
  "content": {
    "en": "English content with **Markdown** support",
    "he": "Hebrew content with **Markdown** support"
  },
  "excerpt": {
    "en": "English excerpt",
    "he": "Hebrew excerpt"
  },
  "slug": {
    "en": "english-title",
    "he": "hebrew-title"
  },
  "tags": ["tag1", "tag2", "tag3"],
  "published": true,
  "featuredImage": "https://storage.googleapis.com/...",
  "seo": {
    "metaTitle": {
      "en": "SEO Title",
      "he": "SEO Title Hebrew"
    },
    "metaDescription": {
      "en": "SEO Description",
      "he": "SEO Description Hebrew"
    }
  },
  "readTime": {
    "en": 5,
    "he": 6
  },
  "author": {
    "name": "Author Name",
    "email": "author@email.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "publishedAt": "2024-01-01T00:00:00.000Z"
}
```

### Create Blog Post Request

```json
{
  "title": {
    "en": "Your English Title",
    "he": "Your Hebrew Title"
  },
  "content": {
    "en": "Your English content with **Markdown** formatting",
    "he": "Your Hebrew content with **Markdown** formatting"
  },
  "excerpt": {
    "en": "Brief English description",
    "he": "Brief Hebrew description"
  },
  "tags": ["tag1", "tag2"],
  "published": false,
  "featuredImage": "https://example.com/image.jpg",
  "author": {
    "name": "AI Assistant",
    "email": "ai@company.com"
  }
}
```

## Markdown Support

The API supports Markdown formatting in blog content:

- **Bold**: `**text**`
- *Italic*: `*text*`
- # Headings: `# H1`, `## H2`, etc.
- Lists: `- item` or `1. item`
- Links: `[text](url)`
- Images: `![alt](url)`

## Error Handling

All API responses follow this format:

```json
{
  "success": true/false,
  "data": {...},
  "message": "Success/error message",
  "error": "Error type (if applicable)"
}
```

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
Make sure to set all required environment variables in your production environment.

## Security Considerations

- The API currently doesn't include authentication
- Consider adding API key authentication for production use
- Implement rate limiting for public endpoints
- Add input validation and sanitization

## Support

For questions or issues, please contact your development team. 