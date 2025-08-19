#!/bin/bash

echo "🚀 Deploying HolyLabs with Twitter Integration..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Install API dependencies
echo "📦 Installing API dependencies..."
cd api
npm install
cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "🧪 Test your Twitter integration:"
echo "curl https://www.theholylabs.com/api/twitter-to-blog/health"
echo ""
echo "📱 Configure Make.com webhook URL:"
echo "https://www.theholylabs.com/api/twitter-to-blog/webhook"
