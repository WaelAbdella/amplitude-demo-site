import React from 'react';
import TrackedElement from '../components/TrackedElement'; // Import the wrapper

// Pricing Page using standard elements and CSS classes
const PricingPage = () => {

  // Sample pricing plans
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      frequency: '/ month',
      description: 'Get started with basic tracking and analytics.',
      features: ['1 Project', 'Basic Event Tracking', 'Community Support'],
      buttonText: 'Sign Up for Free',
      buttonClass: 'btn-secondary' // Example: Secondary button for free plan
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$49',
      frequency: '/ month',
      description: 'For growing teams needing more power and features.',
      features: ['Unlimited Projects', 'Advanced Analytics', 'User Segmentation', 'Email Support'],
      buttonText: 'Choose Pro',
      buttonClass: 'btn-primary' // Primary button for paid plan
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Contact Us',
      frequency: '',
      description: 'Tailored solutions for large-scale organizations.',
      features: ['Everything in Pro', 'Dedicated Support', 'Custom Integrations', 'SSO'],
      buttonText: 'Contact Sales',
      buttonClass: 'btn-outline-primary' // Example: Outline button (needs CSS definition)
    },
  ];

  return (
    <div>
      <h1>Pricing Plans</h1>
      <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '1.5rem' }}>
          Choose the plan that fits your needs.
      </p>

      {/* Use the same grid class as Features page, or define a new one */}
      <div className="features-grid"> { /* Reusing .features-grid */}
        {plans.map((plan) => {
           const eventProps = {
              button_type: 'cta',
              plan: plan.id,
              page: 'Pricing'
            };
           const codeSnippet = `amplitude.track('Plan Selected', ${JSON.stringify(eventProps, null, 2)});`;

           return (
            <div key={plan.id} className="card feature-card"> { /* Reuse .card and .feature-card styles */}
              <h2>{plan.name}</h2>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '600' }}>{plan.price}</span>
                <span style={{ color: '#6c757d' }}>{plan.frequency}</span>
              </div>
              <p style={{ color: '#495057', minHeight: '3em' }}>{plan.description}</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: '1rem 0', flexGrow: 1 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{feature}</li>
                ))}
              </ul>

              <TrackedElement
                eventName="Plan Selected"
                eventProperties={eventProps}
                codeSnippet={codeSnippet}
                elementType="button"
              >
                {/* We need to define btn-outline-primary in CSS if we use it */}
                <button 
                  type="button" 
                  className={`btn ${plan.buttonClass || 'btn-primary'}`}
                  style={{ width: '100%' }}
                >
                  {plan.buttonText}
                </button>
              </TrackedElement>
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default PricingPage; 