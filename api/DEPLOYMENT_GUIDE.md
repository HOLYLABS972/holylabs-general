# Quick Deployment Guide

## 🚀 Ready to Deploy!

### Option 1: Test Locally First

```bash
# In your /api directory
npm install
npm start
```

Your server will run on `http://localhost:3001`

**Test it works:**
```bash
npm run test:twitter:health
```

### Option 2: Deploy to Cloud Platform

#### For Vercel:
```bash
npm install -g vercel
vercel
```

#### For Railway:
1. Connect your GitHub repo
2. Set environment variables
3. Deploy automatically

#### For Heroku:
```bash
git add .
git commit -m "Add Twitter integration"
git push heroku main
```

### Environment Variables Needed

Set these on your hosting platform:

```bash
# Optional (for real Twitter API)
TWITTER_BEARER_TOKEN=your_token_here
OPENAI_API_KEY=your_openai_key_here

# Email (you probably already have these)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=rpochtman@gmail.com
```

### Quick Test After Deployment

Replace `your-domain.com` with your actual domain:

```bash
curl https://your-domain.com/api/twitter-to-blog/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Twitter to Blog API is running"
}
```

### Test the Full Integration

```bash
curl -X POST https://your-domain.com/api/twitter-to-blog/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "twitterUrl": "https://twitter.com/elonmusk/status/1234567890",
    "language": "en",
    "publishImmediately": false
  }'
```

Should create a blog post draft in your admin panel!

### Make.com Setup

1. **Create new scenario**
2. **Add Facebook Messenger webhook** 
3. **Add HTTP module** pointing to: `https://your-domain.com/api/twitter-to-blog/webhook`
4. **Test with a Twitter URL** in Messenger

### That's it! 🎉

Your Twitter to blog system is now live and ready to convert threads into articles!
