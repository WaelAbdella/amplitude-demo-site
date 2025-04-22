import React, { useState } from 'react';
import TrackedElement from '../components/TrackedElement';

// Features Page using standard elements and CSS classes
const FeaturesPage = () => {
  // Sample feature state (in real app, this might come from API or context)
  const [features, setFeatures] = useState([
    { id: 'feature-A', name: 'Advanced Reporting', description: 'Enable detailed analytics reports.', enabled: false },
    { id: 'feature-B', name: 'AI Assistant', description: 'Get AI-powered insights and suggestions.', enabled: true },
    { id: 'feature-C', name: 'Collaboration Tools', description: 'Share dashboards and findings with your team.', enabled: false },
  ]);

  // Function to toggle feature state
  const handleToggleFeature = (id) => {
    setFeatures(currentFeatures =>
      currentFeatures.map(f =>
        f.id === id ? { ...f, enabled: !f.enabled } : f
      )
    );
    // NOTE: Tracking is handled by TrackedElement wrapper below
  };

  return (
    <div>
      <h1>Product Features</h1>
      <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '1.5rem' }}>
          Explore the features available and see how interactions are tracked.
      </p>

      {/* Grid container for feature cards */}
      <div className="features-grid">
        {features.map((feature) => {
          const eventProps = {
              action_type: feature.enabled ? 'disable' : 'enable',
              feature_name: feature.name,
              page: 'Features',
              location: 'feature_card'
            };
          const codeSnippet = `amplitude.track('Feature Toggle Clicked', ${JSON.stringify(eventProps, null, 2)});`;

          return (
            <div key={feature.id} className="card feature-card"> { /* Apply .card */}
              <h2>{feature.name}</h2>
              <p style={{ flexGrow: 1, marginBottom: '1.5rem' }}>{feature.description}</p> { /* flexGrow pushes button down */}

              {/* Ensure TrackedElement directly wraps the button it tracks */}
              <TrackedElement
                eventName="Feature Toggle Clicked"
                eventProperties={eventProps}
                codeSnippet={codeSnippet}
                elementType="button"
              >
                <button
                  type="button" // Explicitly set button type
                  onClick={() => handleToggleFeature(feature.id)}
                  className={`btn ${feature.enabled ? 'btn-secondary' : 'btn-primary'}`} // Apply .btn classes
                  style={{ width: '100%' }} // Style prop seems okay, ensure it's the only one?
                >
                  {feature.enabled ? 'Disable Feature' : 'Enable Feature'}
                </button>
              </TrackedElement>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Add CSS for .features-grid and .feature-card to index.css
/*
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); // Responsive grid
  gap: 1.5rem;
}

.feature-card {
  display: flex;
  flex-direction: column; // Ensure flexGrow works on paragraph
}
*/

export default FeaturesPage; 