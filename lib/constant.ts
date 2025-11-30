const CONSTANT = {
  product: {
    defaultLatestProductLimit: 4,
  },
  signIn: {
    placeholderEmail: '',
    placeholderPassword: '',
  },
  signUp: {
    placeholderName: '',
    placeholderEmail: '',
    placeholderPassword: '',
    placeholderConfirmPassword: '',
  },
  pathRoute: {
    home: '/',
    product: '/product',
    cart: '/cart',
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
  key: {
    name: 'name',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
    callbackUrl: 'callbackUrl',
  },
} as const;

export {CONSTANT};
