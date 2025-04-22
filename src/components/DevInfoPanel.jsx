import React, { useState, useEffect } from 'react';
import { devInfoLogger } from '../utils/DevInfoLogger'; // Import the logger instance

const DevInfoPanel = () => {
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
    return new Date(isoString).toLocaleTimeString();
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 w-full max-w-md z-50">
      <div className="bg-white rounded-lg shadow-xl border border-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center p-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
          <h3 className="text-sm font-semibold text-gray-700">Amplitude Dev Logs</h3>
          <div>
             <button
              onClick={() => devInfoLogger.clearLogs()}
              className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded mr-1"
              title="Clear Logs"
            >
              Clear
            </button>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded"
              title={isVisible ? 'Collapse' : 'Expand'}
            >
              {isVisible ? '—' : '+'}
            </button>
          </div>
        </div>

        {/* Log List (Collapsible) */}
        {isVisible && (
          <div className="p-2 h-48 overflow-y-auto text-xs">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic">No logs yet. Interact with tracked elements.</p>
            ) : (
              <ul>
                {logs.map((log, index) => (
                  <li key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
                    <div className="font-mono font-semibold">
                      <span className={`uppercase px-1 py-0.5 rounded text-white text-[10px] ${log.type === 'track' ? 'bg-blue-500' : 'bg-green-500'}`}>
                        {log.type}
                      </span>
                      <span className="ml-2 text-gray-500 text-[10px]">{formatTimestamp(log.timestamp)}</span>
                    </div>
                    {log.type === 'track' && (
                       <div className="mt-1"><strong>Event:</strong> {log.data.eventName}</div>
                    )}
                     <div className="mt-1">
                       <strong>Data:</strong>
                       <pre className="bg-gray-50 p-1 rounded text-[11px] whitespace-pre-wrap break-all">
                         {JSON.stringify(log.data, null, 2)}
                       </pre>
                    </div>
                     {log.codeSnippet && (
                       <div className="mt-1">
                         <strong>Snippet:</strong>
                         <pre className="bg-gray-50 p-1 rounded text-[11px] whitespace-pre-wrap">
                           {log.codeSnippet}
                         </pre>
                       </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevInfoPanel; 