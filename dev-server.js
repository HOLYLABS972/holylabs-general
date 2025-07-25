import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sendNotificationHandler from './api/send-notification.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Vercel's req/res objects for local development
app.post('/api/send-notification', async (req, res) => {
  // Create a mock response object that matches Vercel's API
  const mockRes = {
    status: (code) => ({
      json: (data) => res.status(code).json(data),
      end: () => res.status(code).end()
    }),
    setHeader: (name, value) => res.setHeader(name, value),
    json: (data) => res.json(data)
  };

  await sendNotificationHandler(req, mockRes);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Development server is running' 
  });
});

app.listen(PORT, () => {
  console.log(`Development server running on port ${PORT}`);
  console.log('This server mimics Vercel\'s serverless functions for local development');
}); 