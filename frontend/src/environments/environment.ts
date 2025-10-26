// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Default API URL for development
  applicationEndpoint: 'http://localhost:3000/api', // API endpoint for base service
  applicationInsights: '', // Application Insights connection string - leave empty for development
  appInsights: {
    instrumentationKey: '', // Add Application Insights key if needed
    connectionString: '' // Add Application Insights connection string if needed
  },
  logging: {
    level: 'info', // Default logging level
    enableConsoleLogging: true,
    enableApplicationInsights: false
  },
  // Add other environment-specific configurations as needed
  appName: 'WorkflowGitEngine',
  version: '1.0.0'
};