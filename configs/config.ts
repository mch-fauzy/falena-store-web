/* Constants for infra and app */
const CONFIG = {
  SERVER: {
    PORT: process.env.SERVER_PORT,
  },
  APP: {
    NAME: process.env.APP_NAME || 'Falena',
    DESCRIPTION: process.env.APP_DESCRIPTION || 'Built with Next.js',
    URL: process.env.APP_URL || 'http://localhost:3000',
  },
} as const;

export {CONFIG};
