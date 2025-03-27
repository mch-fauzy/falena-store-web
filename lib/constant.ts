const CONSTANT = {
  PRODUCT: {
    DEFAULT_LATEST_PRODUCT_LIMIT: 4,
  },
  SIGN_IN: {
    DEFAULT_EMAIL: '',
    DEFAULT_PASSWORD: '',
  },
  PATH_ROUTE: {
    HOME: '/',
    PRODUCT: '/product',
    CART: '/cart',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
  },
  KEY: {
    EMAIL: 'email',
    PASSWORD: 'password',
    CALLBACK_URL: 'callbackUrl',
  },
  TOKEN_EXPIRATION_TIME: 1 * 24 * 60 * 60, // Token expiration time set for 1 days
} as const;

export {CONSTANT};
