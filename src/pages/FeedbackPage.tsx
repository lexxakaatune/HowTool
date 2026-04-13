import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, MessageSquare, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import { sendFeedback } from "../services/api";
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import AdBanner from '../components/ads/AdBanner';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    type: 'request' as 'request' | 'issue' | 'suggestion',
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await sendFeedback(formData);   // call backend
    setIsSubmitted(true);
  } catch (err) {
    console.error("Failed to send feedback", err);
  }

  setIsSubmitting(false);

  // Reset form after 3 seconds
  setTimeout(() => {
    setIsSubmitted(false);
    setFormData({
      type: "request",
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }, 3000);
};

  const feedbackTypes = [
    { 
      id: 'request', 
      label: 'Article Request', 
      icon: MessageSquare,
      description: 'Request a guide on a specific topic'
    },
    { 
      id: 'issue', 
      label: 'Report Issue', 
      icon: AlertCircle,
      description: 'Report a problem with the website or content'
    },
    { 
      id: 'suggestion', 
      label: 'Suggestion', 
      icon: Lightbulb,
      description: 'Share ideas to improve our platform'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Top Ad */}
      <div className="pt-20">
        <AdBanner position="top" />
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Send Us <span className="text-gradient">Feedback</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            We value your input! Whether you want to request a new article, 
            report an issue, or share suggestions, we&apos;d love to hear from you.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type */}
            <div>
              <label className="block text-white font-medium mb-3">What type of feedback?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.id as typeof formData.type })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.type === type.id
                        ? 'border-red-600 bg-red-600/10'
                        : 'border-dark-500 bg-dark-800 hover:border-dark-400'
                    }`}
                  >
                    <type.icon 
                      size={24} 
                      className={formData.type === type.id ? 'text-red-500' : 'text-gray-400'} 
                    />
                    <div className="mt-2 font-medium text-white text-sm">{type.label}</div>
                    <div className="mt-1 text-xs text-gray-500">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-500 rounded-lg px-4 py-3 text-white 
                    placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-800 border border-dark-500 rounded-lg px-4 py-3 text-white 
                    placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-white font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-dark-800 border border-dark-500 rounded-lg px-4 py-3 text-white 
                  placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                placeholder="Brief description of your feedback"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-white font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-dark-800 border border-dark-500 rounded-lg px-4 py-3 text-white 
                  placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors resize-none"
                placeholder="Please provide detailed information about your request, issue, or suggestion..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Feedback
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-16 animate-scale-in">
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Your feedback has been received. We appreciate your input and will review it shortly.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-dark-500 text-center">
          <p className="text-gray-400 text-sm">
            Prefer email? Reach us at{' '}
            <a href="mailto:feedback@howto.com" className="text-red-500 hover:underline">
              feedback@howto.com
            </a>
          </p>
        </div>
      </main>

      {/* Bottom Ad */}
      <AdBanner position="bottom" />

      <Footer />
    </div>
  );
};

export default FeedbackPage;
