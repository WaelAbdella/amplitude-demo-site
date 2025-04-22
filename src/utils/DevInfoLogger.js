// Simple logger to store dev mode information without cluttering React state
class DevInfoLogger {
  constructor() {
    this.logs = [];
    this.listeners = []; // Simple listener pattern
    this.maxLogs = 50; // Limit logs to prevent memory issues
  }

  addLog(type, data, codeSnippet = '') {
    const timestamp = new Date().toISOString();
    const logEntry = { type, data, codeSnippet, timestamp };

    this.logs.unshift(logEntry); // Add to the beginning
    if (this.logs.length > this.maxLogs) {
      this.logs.pop(); // Remove the oldest if limit exceeded
    }
    this.notifyListeners();
  }

  getLogs() {
    return [...this.logs]; // Return a copy
  }

  clearLogs() {
    this.logs = [];
    this.notifyListeners();
  }

  // Allow components to subscribe to changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => { // Return an unsubscribe function
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.getLogs()));
  }
}

export const devInfoLogger = new DevInfoLogger(); // Singleton instance 