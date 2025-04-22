import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement'; // Import wrapper

// About/Contact Page using standard elements and CSS classes
const AboutContactPage = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission (prevents default, actual tracking via TrackedElement)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted locally:', formData);
    alert('Form submitted! (Check console and Dev Panel for tracking event)');
    // Clear form after submission (optional)
    setFormData({ name: '', email: '', message: '' });
  };

  // Define event properties and snippet for TrackedElement
  const formEventProps = {
    form_name: 'Contact Us',
    page: 'About/Contact'
    // Avoid sending PII like name/email directly in event properties
    // Could potentially add message_length: formData.message.length if needed
  };
  const formCodeSnippet = `amplitude.track('Form Submitted', ${JSON.stringify(formEventProps, null, 2)});`;

  return (
    <div>
      <h1>About Us & Contact</h1>

      <div className="section card">
        <h2>About This Demo</h2>
        <p>
          This website is a demonstration project showcasing the integration of Amplitude analytics 
          within a React application. It illustrates how to track various user interactions, 
          including page views, button clicks, form submissions, and user identification.
        </p>
        <p>
          The goal is to provide a clear, practical example for developers looking to implement 
          event tracking using the Amplitude Browser SDK.
        </p>
      </div>

      <div className="section">
        <h2>Contact Information</h2>
        <p>
          This is a demo site and not a real service. If you have questions about Amplitude integration, 
          please refer to the official Amplitude documentation.
        </p>
        <p>
          For inquiries regarding the development of this specific demo, you can reach out through the associated 
          GitHub repository or contact the developer directly (details would go here in a real project).
        </p>
        
        {/* Contact Form */}
        <TrackedElement
          eventName="Form Submitted"
          eventProperties={formEventProps} // Pass dynamic props
          codeSnippet={formCodeSnippet}    // Pass dynamic snippet
          interactionType="track"       // Explicitly track
          trigger="onSubmit"            // Track on form submit
        >
          <form onSubmit={handleSubmit} className="card" style={{ marginTop: '1.5rem' }}>
            <h3>Quick Contact</h3>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Name</label>
              <input 
                type="text" 
                id="contact-name" 
                name="name" // Add name attribute for handler
                className="form-control" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email</label>
              <input 
                type="email" 
                id="contact-email" 
                name="email" // Add name attribute for handler
                className="form-control" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea 
                id="contact-message" 
                name="message" // Add name attribute for handler
                className="form-control" 
                rows="4" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message (Tracked)</button>
          </form>
        </TrackedElement>
      </div>
    </div>
  );
};

export default AboutContactPage; 