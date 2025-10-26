export const environment = {
  production: true,
  apiUrl: '/api', // Production API URL
  appInsights: {
    instrumentationKey: '', // Add Application Insights key for production
    connectionString: '' // Add Application Insights connection string for production
  },
  logging: {
    level: 'warn', // More restrictive logging in production
    enableConsoleLogging: false,
    enableApplicationInsights: true
  },
  // Add other environment-specific configurations as needed
  appName: 'WorkflowGitEngine',
  version: '1.0.0'
};