module.exports = {
  apps: [
    {
      name: 'wtl-backend',
      script: './index.js',
      instances: 'max', // Utilize all available CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        // Add other required env vars for AWS here
      }
    }
  ]
};
