const CONSTANT = {
  PRODUCT: {
    DEFAULT_LATEST_PRODUCT_LIMIT: 4,
  },
  SIGN_IN: {
    DEFAULT_EMAIL: '',
    DEFAULT_PASSWORD: '',
  },
  SIGN_UP: {
    DEFAULT_NAME: '',
    DEFAULT_EMAIL: '',
    DEFAULT_PASSWORD: '',
    DEFAULT_CONFIRM_PASSWORD: '',
  },
  PATH_ROUTE: {
    HOME: '/',
    PRODUCT: '/product',
    CART: '/cart',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
  },
  KEY: {
    NAME: 'name',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    CALLBACK_URL: 'callbackUrl',
  },
  TOKEN_EXPIRATION_TIME: 1 * 24 * 60 * 60, // Token expiration time set for 1 days
} as const;

export {CONSTANT};
