import React, { useState, useEffect } from 'react';
import { devInfoLogger } from '../utils/DevInfoLogger'; // Import the logger instance

// Dev Info Panel using standard elements and CSS classes
const DevInfoPanel = ({ className }) => {
  const [logs, setLogs] = useState(devInfoLogger.getLogs());
  const [isVisible, setIsVisible] = useState(true); // Allow collapsing the panel

  useEffect(() => {
    // Subscribe to logger updates
    const unsubscribe = devInfoLogger.subscribe(updatedLogs => {
      setLogs(updatedLogs);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Run only once on mount

  const formatTimestamp = (isoString) => {
    // Simple time format
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second:'2-digit' });
  };

  return (
    <div className={className || 'dev-info-sidebar'}> {/* Main container class */}
      <div className="dev-info-header"> {/* Header class */}
        <h3>Amplitude Dev Logs</h3>
        <div>
           <button
            onClick={() => devInfoLogger.clearLogs()}
            className="btn btn-secondary btn-sm" /* Use standard button classes */
            title="Clear Logs"
          >
            Clear
          </button>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="btn btn-secondary btn-sm" /* Use standard button classes */
            title={isVisible ? 'Collapse Section' : 'Expand Section'}
            style={{ marginLeft: '0.25rem' }}
          >
            {isVisible ? '−' : '+'} { /* Use characters for collapse/expand */}
          </button>
        </div>
      </div>

      {/* Logs Container */}
      {isVisible && (
        <div className="dev-info-logs"> {/* Logs container class */}
          {logs.length === 0 ? (
            <p className="dev-info-no-logs"> {/* Class for empty state */}
              No logs yet. Interact with tracked elements.
            </p>
          ) : (
            <ol className="dev-info-log-list"> {/* Log list class */}
              {/* Reverse logs for display order */}
              {logs.slice().reverse().map((log, index) => (
                <li key={index} className="dev-info-log-item"> {/* Log item class */}
                  <span className="log-type">{log.type}</span> 
                  <span className="log-timestamp">{formatTimestamp(log.timestamp)}</span>
                  <p className="log-details">
                    {/* Display name differently based on type */}
                    {log.type === 'track' && <><strong>Event:</strong> {log.name || 'N/A'}<br /></>}
                    {log.type === 'identify' && <><strong>Identify:</strong> User Traits<br /></>}
                    {log.type === 'setUserId' && <><strong>Set User ID:</strong> {log.properties?.userId ?? 'N/A'}<br /></>}
                    {log.type === 'error' && <><strong>Error:</strong> {log.name || 'N/A'}<br /></>}
                    
                    <strong>Data/Properties:</strong>
                    <pre className="log-data-pre"> { /* Preformatted data class */}
                      {JSON.stringify(log.properties || {}, null, 2)}
                    </pre>
                  </p>
                  {log.code && (
                     <div className="log-code-snippet">
                       <strong>Code Snippet:</strong>
                       <pre className="log-code-pre"> { /* Code snippet class */}
                          {log.code}
                       </pre>
                     </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

// Add CSS for .dev-info-panel and sub-elements to index.css
/*
.dev-info-panel {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 100%;
  max-width: 450px;
  z-index: 1050; / * Ensure it's above most content * /
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-size: 0.875rem; / * Smaller base font for panel * /
}

.dev-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #e9ecef;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}

.dev-info-header h3 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0;
}

.dev-info-logs {
  padding: 0.75rem 1rem;
  max-height: 250px; / * Limit height and enable scroll * /
  overflow-y: auto;
}

.dev-info-no-logs {
  color: #6c757d;
  font-style: italic;
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 0; / * Override default p margin * /
}

.dev-info-log-list {
  list-style-type: none; / * Remove default list style * /
  padding: 0;
}

.dev-info-log-item {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e9ecef;
}
.dev-info-log-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.log-type {
  font-weight: 600;
  display: inline-block;
  margin-right: 0.5rem;
  background-color: #f8f9fa;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  border: 1px solid #dee2e6;
}

.log-timestamp {
  color: #6c757d;
  font-size: 0.8rem;
}

.log-details {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.log-data-pre, .log-code-pre {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border-radius: 0.25rem;
  overflow-x: auto; / * Allow horizontal scroll for long lines * /
  white-space: pre-wrap; / * Wrap long lines * /
  word-wrap: break-word; / * Break long words if needed * /
  font-size: 0.8rem;
}

.log-code-snippet {
  margin-top: 0.5rem;
}
*/

export default DevInfoPanel; 