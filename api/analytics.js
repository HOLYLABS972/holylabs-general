// Simple analytics fallback API
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, parameters, timestamp, url, userAgent } = req.body;
    
    // Basic validation
    if (!event || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Log the analytics event (you can enhance this to store in database)
    console.log('Analytics Fallback Event:', {
      event,
      parameters,
      timestamp,
      url,
      userAgent: userAgent ? userAgent.substring(0, 100) : 'Unknown', // Truncate for privacy
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    // Here you could:
    // 1. Store in a database (Firebase, MongoDB, etc.)
    // 2. Send to another analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Forward to your own analytics system
    
    // Example: You could send to Google Analytics 4 as a backup
    // if (process.env.GA_MEASUREMENT_ID) {
    //   await sendToGoogleAnalytics(event, parameters);
    // }

    return res.status(200).json({ 
      success: true, 
      message: 'Event tracked successfully' 
    });

  } catch (error) {
    console.error('Analytics API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

// Optional: Function to send to Google Analytics as backup
// async function sendToGoogleAnalytics(eventName, parameters) {
//   try {
//     const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`, {
//       method: 'POST',
//       body: JSON.stringify({
//         client_id: parameters.client_id || 'fallback-client',
//         events: [{
//           name: eventName.toLowerCase().replace(/[^a-z0-9_]/g, '_'),
//           parameters: parameters
//         }]
//       })
//     });
//     console.log('Sent to Google Analytics:', response.status);
//   } catch (error) {
//     console.error('Failed to send to Google Analytics:', error);
//   }
// } 