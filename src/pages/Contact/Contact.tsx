import React, { useState } from 'react';
import { 
  PhoneIcon, 
  SendIcon, 
  MessageSquareIcon,
  CheckIcon,
  LoaderIcon,
  XIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  const { t, tString } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showFormPopup, setShowFormPopup] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save to Firestore
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'new'
      });

      // Send email notification
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: formData
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
        setTimeout(() => {
          setShowFormPopup(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: t('contact.call.title'),
      action: "tel:+12362344580"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M183.537 43.052C164.958 24.4451 140.244 14.2017 113.919 14.1875C59.6656 14.1875 15.507 58.339 15.4928 112.606C15.4857 129.957 20.0186 146.89 28.6304 161.808L14.6628 212.812L66.8374 199.129C81.2093 206.974 97.3973 211.103 113.869 211.11H113.912C168.157 211.11 212.316 166.958 212.33 112.691C212.337 86.3877 202.115 61.666 183.53 43.0662L183.537 43.052ZM113.919 194.482H113.883C99.2062 194.482 84.8058 190.531 72.2428 183.083L69.2563 181.309L38.2921 189.432L46.5563 159.24L44.6127 156.148C36.4265 143.123 32.0993 128.071 32.1064 112.613C32.1277 67.5112 68.8236 30.8152 113.947 30.8152C135.796 30.8223 156.332 39.3419 171.782 54.8063C187.225 70.2636 195.731 90.8213 195.717 112.677C195.695 157.786 159.006 194.482 113.919 194.482ZM158.787 133.221C156.325 131.986 144.237 126.042 141.981 125.219C139.726 124.396 138.087 123.985 136.448 126.453C134.81 128.915 130.099 134.455 128.659 136.094C127.226 137.739 125.786 137.938 123.332 136.704C120.87 135.469 112.947 132.873 103.555 124.502C96.2481 117.983 91.3108 109.932 89.8708 107.463C88.4378 105.002 89.7218 103.668 90.949 102.448C92.0557 101.341 93.4106 99.575 94.6378 98.142C95.8721 96.7091 96.2764 95.6805 97.0993 94.0418C97.9222 92.3961 97.5108 90.9632 96.8936 89.7359C96.2764 88.5016 91.3605 76.3997 89.3104 71.4766C87.317 66.6813 85.2882 67.3339 83.7772 67.2558C82.3443 67.1849 80.7057 67.1707 79.0599 67.1707C77.4142 67.1707 74.754 67.7808 72.4982 70.2494C70.2424 72.7109 63.8935 78.6626 63.8935 90.7645C63.8935 102.866 72.7039 114.564 73.9382 116.21C75.1725 117.856 91.2824 142.691 115.947 153.346C121.814 155.878 126.397 157.396 129.972 158.524C135.86 160.397 141.222 160.134 145.457 159.503C150.182 158.794 160.007 153.551 162.057 147.805C164.107 142.059 164.107 137.136 163.49 136.108C162.873 135.079 161.234 134.462 158.772 133.235L158.787 133.221Z" fill="currentColor"/>
        </svg>
      ),
      title: t('contact.whatsapp.title'),
      action: "https://wa.me/12362344580"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M113.5 14.1875C58.6511 14.1875 14.1875 58.6511 14.1875 113.5C14.1875 168.349 58.6511 212.812 113.5 212.812C168.349 212.812 212.812 168.349 212.812 113.5C212.812 58.6511 168.349 14.1875 113.5 14.1875ZM159.531 81.7271C158.035 97.4327 151.572 135.54 148.281 153.126C146.89 160.567 144.145 163.064 141.492 163.305C135.725 163.837 131.348 159.496 125.758 155.836C117.019 150.104 112.081 146.536 103.597 140.946C93.7936 134.483 100.15 130.929 105.739 125.127C107.201 123.609 132.611 100.497 133.107 98.3974C133.171 98.1349 133.228 97.156 132.646 96.6382C132.064 96.1203 131.206 96.2977 130.589 96.4395C129.709 96.6382 115.749 105.867 88.7002 124.126C84.7348 126.85 81.1454 128.177 77.9319 128.106C74.3851 128.028 67.568 126.099 62.4959 124.453C56.2747 122.431 51.3304 121.36 51.7631 117.927C51.9901 116.139 54.4516 114.309 59.1548 112.443C88.1044 99.8303 107.414 91.5165 117.068 87.4943C144.649 76.0237 150.38 74.0304 154.112 73.9665C154.935 73.9523 156.772 74.1581 157.964 75.1228C158.971 75.9386 159.248 77.0381 159.375 77.8113C159.51 78.5846 159.673 80.3438 159.538 81.72L159.531 81.7271Z" fill="currentColor"/>
        </svg>
      ),
      title: t('contact.telegram.title'),
      action: "https://t.me/holylabsbot"
    },
    {
      icon: <MessageSquareIcon className="w-6 h-6" />,
      title: t('contact.form.title'),
      action: () => setShowFormPopup(true)
    }
  ];

  const serviceOptions = [
    tString('contact.service.whatsapp'),
    tString('contact.service.calls'),
    tString('contact.service.leads'),
    tString('contact.service.ads'),
    tString('contact.service.web'),
    tString('contact.service.custom'),
    tString('contact.service.general')
  ];

  return (
    <div className="min-h-screen bg-[#FBFCFF] relative overflow-hidden">
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 mt-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 rounded-full border border-[#d8dfe5] bg-[rgba(241,242,251,0.9)] shadow-[0px_0px_0px_2px_rgba(241,242,251,0.9)]">
            <MessageSquareIcon className="w-4 h-4 text-[#161e2e] opacity-80" />
            <span className="font-normal text-[#161e2e] text-sm opacity-80">
              {t('contact.badge')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl text-center bg-gradient-to-t from-black to-black/60 bg-clip-text text-transparent mb-6 leading-tight" style={{ lineHeight: '1.2', paddingBottom: '0.1em' }}>
            {t('contact.title')}
          </h1>
          
          <p className="text-lg text-[#64646e] max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Methods - 4 Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              onClick={() => {
                if (typeof method.action === 'function') {
                  method.action();
                } else {
                  window.open(method.action, '_blank');
                }
              }}
              className="group cursor-pointer"
            >
              <div 
                className="p-6 rounded-2xl transition-all duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: 'rgb(246, 251, 255)',
                  boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
                }}
              >
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-2xl opacity-100 flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'rgb(246, 251, 255)',
                      boxShadow: 'rgba(141, 194, 235, 0.25) 0px -3px 0px 2px inset, rgba(16, 49, 77, 0.21) 0px 0.706592px 0.706592px -0.583333px, rgba(16, 49, 77, 0.2) 0px 1.80656px 1.80656px -1.16667px, rgba(16, 49, 77, 0.2) 0px 3.62176px 3.62176px -1.75px, rgba(16, 49, 77, 0.18) 0px 6.8656px 6.8656px -2.33333px, rgba(16, 49, 77, 0.16) 0px 13.6468px 13.6468px -2.91667px, rgba(16, 49, 77, 0.09) 0px 30px 30px -3.5px'
                    }}
                  >
                    <div style={{ color: 'rgb(14, 28, 41)' }}>
                      {method.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-black ml-4">
                    {method.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div className="mb-20">
          <img 
            src="/services/contact.avif" 
            alt="Contact Us" 
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-black mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-lg text-[#64646e] max-w-2xl mx-auto leading-relaxed">
              {t('contact.faq.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: t('contact.faq.q1'),
                answer: t('contact.faq.a1')
              },
              {
                question: t('contact.faq.q2'),
                answer: t('contact.faq.a2')
              },
              {
                question: t('contact.faq.q3'),
                answer: t('contact.faq.a3')
              },
              {
                question: t('contact.faq.q4'),
                answer: t('contact.faq.a4')
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-[#d8dfe5]">
                <h3 className="font-semibold text-black mb-3">{faq.question}</h3>
                <p className="text-[#64646e] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Popup Modal */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              backgroundColor: 'rgb(246, 251, 255)',
              boxShadow: 'rgba(16, 49, 77, 0.05) 0px 0.706592px 0.706592px -0.291667px, rgba(16, 49, 77, 0.06) 0px 1.80656px 1.80656px -0.583333px, rgba(16, 49, 77, 0.06) 0px 3.62176px 3.62176px -0.875px, rgba(16, 49, 77, 0.06) 0px 6.8656px 6.8656px -1.16667px, rgba(16, 49, 77, 0.07) 0px 13.6468px 13.6468px -1.45833px, rgba(16, 49, 77, 0.1) 0px 30px 30px -1.75px'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowFormPopup(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <XIcon className="w-5 h-5 text-[#64646e]" />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-semibold text-black mb-6">
                {t('contact.form.title')}
              </h2>
            
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={tString('contact.placeholder.name')}
                      className="w-full px-4 py-3 border border-[#d8dfe5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={tString('contact.placeholder.email')}
                      className="w-full px-4 py-3 border border-[#d8dfe5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-black mb-2">
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={tString('contact.placeholder.company')}
                      className="w-full px-4 py-3 border border-[#d8dfe5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={tString('contact.placeholder.phone')}
                      className="w-full px-4 py-3 border border-[#d8dfe5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-black mb-2">
                    {t('contact.form.service')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#d8dfe5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent transition-colors bg-white"
                  >
                    <option value="">{tString('contact.form.service.select')}</option>
                    {serviceOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={tString('contact.placeholder.message')}
                    rows={6}
                    className="w-full px-4 py-3 border border-[#d8dfe5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#389CFF] focus:border-transparent transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  variant="cta-primary" 
                  size="cta" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <LoaderIcon className="w-4 h-4 animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.form.send')}
                        <SendIcon className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </Button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-600" />
                      <p className="text-green-800 font-medium">
                        {t('contact.form.success')}
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">
                      {t('contact.form.error')}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;