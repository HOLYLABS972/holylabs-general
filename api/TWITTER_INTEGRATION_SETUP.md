# Twitter to Blog Integration Setup Guide

## Overview

This integration allows you to send Twitter/X thread URLs via Facebook Messenger to Make.com, which will automatically create blog articles on your website using AI.

## Architecture Flow

```
Facebook Messenger → Make.com → Your API → AI Processing → Blog Creation
```

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the `/api` directory with these variables:

```bash
# OpenAI API Key (for advanced AI article generation)
OPENAI_API_KEY=your_openai_api_key_here

# Claude API Key (alternative to OpenAI)
CLAUDE_API_KEY=your_claude_api_key_here

# Twitter API Keys (optional - for real Twitter data)
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
TWITTER_API_KEY=your_twitter_api_key_here
TWITTER_API_SECRET=your_twitter_api_secret_here

# Make.com Webhook Security (optional)
MAKE_WEBHOOK_SECRET=your_make_webhook_secret_here

# Development
NODE_ENV=development
PORT=3001
```

### 2. Make.com Scenario Setup

1. **Create a new scenario in Make.com:**
   - Trigger: Facebook Messenger webhook
   - Filter: Messages containing Twitter/X URLs
   - Action: HTTP POST to your API

2. **Configure the HTTP module:**
   ```
   URL: https://your-domain.com/api/twitter-to-blog/webhook
   Method: POST
   Headers:
     Content-Type: application/json
   Body:
   {
     "twitterUrl": "{{1.message_text}}",
     "language": "en",
     "publishImmediately": false
   }
   ```

### 3. Facebook Messenger Bot Setup

1. **Create a Facebook App:**
   - Go to developers.facebook.com
   - Create a new app for messaging
   - Add Messenger product

2. **Configure Webhooks:**
   - Set webhook URL to your Make.com webhook URL
   - Subscribe to `messages` events

3. **Test the bot:**
   - Send a Twitter URL to your Facebook page
   - Check if Make.com receives the message

### 4. API Deployment

Deploy the new `twitter-to-blog.js` file to your hosting platform:

**For Vercel:**
```bash
npm install
vercel deploy
```

**For other platforms:**
- Ensure the API endpoint is accessible at `/api/twitter-to-blog`
- Configure environment variables

## API Endpoints

### POST /api/twitter-to-blog/webhook
Main endpoint for receiving Twitter URLs from Make.com.

**Request Body:**
```json
{
  "twitterUrl": "https://twitter.com/username/status/1234567890",
  "language": "en",
  "publishImmediately": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "blog_post_id",
    "title": {
      "en": "Generated Title",
      "he": "כותרת שנוצרה"
    },
    "url": "https://holylabs.com/blog/generated-slug",
    "status": "draft",
    "sourceThread": {
      "url": "https://twitter.com/username/status/1234567890",
      "username": "username",
      "tweetCount": 5
    }
  },
  "message": "Blog post created as draft successfully"
}
```

### GET /api/twitter-to-blog/health
Health check endpoint.

## Features

### Current Implementation

✅ **Twitter URL Parsing**: Supports twitter.com and x.com URLs  
✅ **Mock Thread Extraction**: Generates sample content for testing  
✅ **AI Article Generation**: Creates structured blog articles  
✅ **Bilingual Support**: English and Hebrew content  
✅ **SEO Optimization**: Auto-generates meta titles and descriptions  
✅ **Tag Extraction**: Automatically tags posts based on content  
✅ **Admin Integration**: Creates drafts visible in admin panel  

### Planned Enhancements

🔄 **Real Twitter API Integration**: Replace mock data with actual tweets  
🔄 **Image Processing**: Extract and optimize images from tweets  
🔄 **Content Enhancement**: Use advanced AI models for better articles  
🔄 **Automatic Publishing**: Option to publish immediately  
🔄 **Content Validation**: Check for duplicate content  

## Testing

### Manual Testing

1. **Test the API directly:**
```bash
curl -X POST https://your-domain.com/api/twitter-to-blog/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "twitterUrl": "https://twitter.com/elonmusk/status/1234567890",
    "language": "en",
    "publishImmediately": false
  }'
```

2. **Check the response:**
   - Should return success with blog post ID
   - Check admin panel for new draft post

### Make.com Testing

1. Send a Twitter URL to your Facebook Messenger bot
2. Check Make.com execution logs
3. Verify API receives the request
4. Check admin panel for new blog post

## Troubleshooting

### Common Issues

**1. "Invalid Twitter URL format"**
- Ensure the URL contains twitter.com or x.com
- URL should include /status/ and tweet ID
- Remove any tracking parameters

**2. "Database not initialized"**
- Check Firebase configuration
- Ensure Firestore is properly set up
- Verify network connectivity

**3. "Failed to process Twitter thread"**
- Check API logs for detailed error
- Verify Twitter URL is accessible
- For real API integration, check rate limits

**4. Make.com webhook not triggered**
- Check Facebook Messenger webhook configuration
- Verify Make.com scenario is active
- Test with Facebook's webhook tester

### Debug Mode

Enable detailed logging by setting:
```bash
NODE_ENV=development
```

This will provide more detailed error messages and processing logs.

## Security Considerations

1. **Environment Variables**: Keep API keys secure
2. **Webhook Validation**: Verify requests come from Make.com
3. **Rate Limiting**: Implement rate limiting for the webhook
4. **Content Validation**: Sanitize input URLs and content

## Limitations

1. **Mock Data**: Currently uses simulated Twitter content
2. **No Image Processing**: Images from tweets are not extracted
3. **English-Centric**: AI generation optimized for English content
4. **No Duplicate Detection**: May create multiple posts from same thread

## Next Steps

1. **Deploy the API** to your hosting platform
2. **Set up Make.com scenario** with proper webhook configuration
3. **Configure Facebook Messenger bot** with webhook URL
4. **Test end-to-end flow** with sample Twitter URLs
5. **Monitor logs** and optimize based on usage patterns

For support or questions, check the API logs and Make.com execution history for debugging information.
