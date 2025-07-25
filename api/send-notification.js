import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, company, phone, service, message } = req.body;

    // Log environment variables for debugging (without exposing sensitive data)
    console.log('Environment check:', {
      EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
      EMAIL_PORT: process.env.EMAIL_PORT || 587,
      EMAIL_USER: process.env.EMAIL_USER ? '***configured***' : 'NOT SET',
      EMAIL_PASS: process.env.EMAIL_PASS ? '***configured***' : 'NOT SET',
      EMAIL_FROM: process.env.EMAIL_FROM ? '***configured***' : 'NOT SET',
      EMAIL_TO: process.env.EMAIL_TO || 'rpochtman@gmail.com'
    });

    // Validate required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.');
    }

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const emailContent = `
      <h2>New Customer Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><small>This email was sent from your HOLYLABS contact form.</small></p>
    `;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'rpochtman@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Notification email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending notification email:', error);
    
    // More detailed error information
    const errorInfo = {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    };
    
    console.error('Detailed error info:', errorInfo);
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send notification email',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? errorInfo : undefined
    });
  }
} 