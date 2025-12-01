/**
 * Type declarations for extending Next Auth and Next Auth JWT types.
 *
 * This file augments the default Next Auth type definitions to include
 * custom properties for authentication, session management, and JWT tokens.
 *
 * @file types/next-auth.d.ts
 */
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
