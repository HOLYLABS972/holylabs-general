const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import your API handlers
const blogsHandler = require('./blogs');
const twitterToBlogHandler = require('./twitter-to-blog');
const sendNotificationHandler = require('./send-notification');
const analyticsHandler = require('./analytics');
const tagsHandler = require('./tags');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check for the main server
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'HolyLabs API Server is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      blogs: '/api/blogs',
      twitterToBlog: '/api/twitter-to-blog',
      sendNotification: '/api/send-notification',
      analytics: '/api/analytics',
      tags: '/api/tags'
    }
  });
});

// Route handlers
app.use('/api/blogs', (req, res) => blogsHandler(req, res));
app.use('/api/twitter-to-blog', (req, res) => twitterToBlogHandler(req, res));
app.use('/api/send-notification', (req, res) => sendNotificationHandler(req, res));
app.use('/api/analytics', (req, res) => analyticsHandler(req, res));
app.use('/api/tags', (req, res) => tagsHandler(req, res));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'HolyLabs API Server',
    version: '1.0.0',
    documentation: '/health',
    endpoints: {
      health: '/health',
      blogs: '/api/blogs',
      twitterToBlog: '/api/twitter-to-blog',
      sendNotification: '/api/send-notification',
      analytics: '/api/analytics',
      tags: '/api/tags'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/blogs',
      'POST /api/twitter-to-blog/webhook',
      'GET /api/twitter-to-blog/health',
      'POST /api/send-notification',
      'GET /api/analytics',
      'GET /api/tags'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HolyLabs API Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🐦 Twitter integration: http://localhost:${PORT}/api/twitter-to-blog/health`);
  console.log(`📝 Blog API: http://localhost:${PORT}/api/blogs`);
  console.log(`📧 Send notification: http://localhost:${PORT}/api/send-notification`);
});

module.exports = app;
