/* Constants for infra and app */
const CONFIG = {
  server: {
    port: process.env.SERVER_PORT,
  },
  app: {
    name: process.env.APP_NAME || 'Falena',
    description: process.env.APP_DESCRIPTION || 'Built with Next.js',
    url: process.env.APP_URL || 'http://localhost:3000',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  bcrypt: {saltRounds: +(process.env.BCRYPT_SALT_ROUNDS || 10)},
  jwt: {
    expireInSeconds: +(process.env.JWT_EXPIRES_IN_SECONDS || 86400),
  },
} as const;

export {CONFIG};
