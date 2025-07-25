// Meta Pixel tracking utilities with ad blocker handling
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// Check if Meta Pixel is blocked
const isPixelBlocked = (): boolean => {
  return !window.fbq || typeof window.fbq !== 'function';
};

// Fallback tracking for when pixel is blocked
const fallbackTrack = (eventName: string, parameters?: Record<string, any>) => {
  // You can implement alternative tracking here
  // For example: Google Analytics, server-side tracking, etc.
  console.log('Meta Pixel blocked - Fallback tracking:', { eventName, parameters });
  
  // Example: Send to your own analytics endpoint
  if (typeof window !== 'undefined') {
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          parameters,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        })
      }).catch(err => console.log('Analytics fallback failed:', err));
    } catch (error) {
      console.log('Fallback tracking error:', error);
    }
  }
};

export const MetaPixel = {
  // Check if pixel is loaded and working
  isLoaded: (): boolean => {
    return typeof window !== 'undefined' && window.fbq && !isPixelBlocked();
  },

  // Track page views with fallback
  trackPageView: () => {
    if (typeof window !== 'undefined') {
      if (window.fbq && !isPixelBlocked()) {
        try {
          window.fbq('track', 'PageView');
        } catch (error) {
          console.log('Meta Pixel PageView error:', error);
          fallbackTrack('PageView');
        }
      } else {
        fallbackTrack('PageView');
      }
    }
  },

  // Track custom events with fallback
  trackEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      if (window.fbq && !isPixelBlocked()) {
        try {
          if (parameters) {
            window.fbq('track', eventName, parameters);
          } else {
            window.fbq('track', eventName);
          }
        } catch (error) {
          console.log('Meta Pixel trackEvent error:', error);
          fallbackTrack(eventName, parameters);
        }
      } else {
        fallbackTrack(eventName, parameters);
      }
    }
  },

  // Track contact form submissions
  trackLead: (parameters?: Record<string, any>) => {
    const eventData = {
      content_category: 'contact',
      ...parameters
    };
    
    if (typeof window !== 'undefined') {
      if (window.fbq && !isPixelBlocked()) {
        try {
          window.fbq('track', 'Lead', eventData);
        } catch (error) {
          console.log('Meta Pixel Lead error:', error);
          fallbackTrack('Lead', eventData);
        }
      } else {
        fallbackTrack('Lead', eventData);
      }
    }
  },

  // Track blog post views
  trackBlogView: (postTitle: string, postId?: string) => {
    const eventData = {
      content_type: 'blog_post',
      content_name: postTitle,
      content_ids: postId ? [postId] : undefined
    };
    
    if (typeof window !== 'undefined') {
      if (window.fbq && !isPixelBlocked()) {
        try {
          window.fbq('track', 'ViewContent', eventData);
        } catch (error) {
          console.log('Meta Pixel ViewContent error:', error);
          fallbackTrack('ViewContent', eventData);
        }
      } else {
        fallbackTrack('ViewContent', eventData);
      }
    }
  },

  // Track service page views
  trackServiceView: (serviceName: string) => {
    const eventData = {
      content_type: 'service',
      content_name: serviceName
    };
    
    if (typeof window !== 'undefined') {
      if (window.fbq && !isPixelBlocked()) {
        try {
          window.fbq('track', 'ViewContent', eventData);
        } catch (error) {
          console.log('Meta Pixel ServiceView error:', error);
          fallbackTrack('ViewContent', eventData);
        }
      } else {
        fallbackTrack('ViewContent', eventData);
      }
    }
  },

  // Track button clicks (CTAs)
  trackButtonClick: (buttonName: string, page?: string) => {
    const eventData = {
      button_name: buttonName,
      page: page || (typeof window !== 'undefined' ? window.location.pathname : '')
    };
    
    if (typeof window !== 'undefined') {
      if (window.fbq && !isPixelBlocked()) {
        try {
          window.fbq('trackCustom', 'ButtonClick', eventData);
        } catch (error) {
          console.log('Meta Pixel ButtonClick error:', error);
          fallbackTrack('ButtonClick', eventData);
        }
      } else {
        fallbackTrack('ButtonClick', eventData);
      }
    }
  },

  // Track contact attempts
  trackContactAttempt: (method: 'form' | 'email' | 'phone' | 'whatsapp') => {
    const eventData = {
      contact_method: method
    };
    
    if (typeof window !== 'undefined') {
      if (window.fbq && !isPixelBlocked()) {
        try {
          window.fbq('trackCustom', 'ContactAttempt', eventData);
        } catch (error) {
          console.log('Meta Pixel ContactAttempt error:', error);
          fallbackTrack('ContactAttempt', eventData);
        }
      } else {
        fallbackTrack('ContactAttempt', eventData);
      }
    }
  },

  // Initialize pixel with error handling
  init: () => {
    if (typeof window !== 'undefined') {
      // Wait a bit for the pixel to load
      setTimeout(() => {
        if (isPixelBlocked()) {
          console.log('Meta Pixel appears to be blocked by ad blocker - using fallback tracking');
        } else {
          console.log('Meta Pixel loaded successfully');
        }
      }, 1000);
    }
  }
};

export default MetaPixel; 