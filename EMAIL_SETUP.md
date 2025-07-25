# Email Notification Setup

This project includes email notifications for new customer contact form submissions.

## Configuration

### 1. Gmail Setup

To use Gmail for sending emails, you need to:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to your Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Use this password in your `.env` file

### 2. Environment Variables

Update the `.env` file with your email configuration:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-app-password-here
EMAIL_FROM=your-actual-email@gmail.com
EMAIL_TO=rpochtman@gmail.com

# Server Configuration
PORT=3001
```

### 3. Running the Application

To run both the frontend and backend servers:

```bash
npm run dev:full
```

Or run them separately:

```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend development server
npm run dev
```

## Email Template

The notification email includes:
- Customer name
- Email address
- Company (if provided)
- Phone number (if provided)
- Service interest
- Message content
- Timestamp

## Troubleshooting

### Common Issues:

1. **Authentication Error**: Make sure you're using an App Password, not your regular Gmail password
2. **Port Already in Use**: Change the PORT in `.env` if 3001 is already taken
3. **CORS Issues**: The server is configured to accept requests from any origin during development

### Testing Email Functionality:

1. Fill out the contact form on the website
2. Check the browser console for success/error messages
3. Check the server console for email sending logs
4. Verify the email arrives at rpochtman@gmail.com

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for production deployment
- Consider using a dedicated email service for production (SendGrid, Mailgun, etc.) 