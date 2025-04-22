import React from 'react';

// About/Contact Page using standard elements and CSS classes
const AboutContactPage = () => {
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
        {/* Example: Add a simple contact form placeholder if needed */}
        {/* 
        <form className="card" style={{ marginTop: '1.5rem' }}>
          <h3>Quick Contact</h3>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">Name</label>
            <input type="text" id="contact-name" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">Email</label>
            <input type="email" id="contact-email" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">Message</label>
            <textarea id="contact-message" className="form-control" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
         */}
      </div>
    </div>
  );
};

export default AboutContactPage; 