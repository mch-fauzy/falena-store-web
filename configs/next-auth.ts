import NextAuth, {type NextAuthConfig, type NextAuthResult} from 'next-auth';
import {PrismaAdapter} from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import {prismaClient} from './prisma-client';
import {CONSTANT} from '@/lib/constant';
import {getUserByEmail} from '@/lib/fetch/user';
import {comparePassword} from '@/lib/password';
import {CONFIG} from './config';

const authConfig: NextAuthConfig = {
  /* Specify URLs to be used if you want to create custom sign in, sign out and error page */
  pages: {
    signIn: CONSTANT.pathRoute.signIn,
    error: CONSTANT.pathRoute.signIn,
  },

  /* Choose how you want to save the user session */
  session: {
    strategy: 'jwt',
    maxAge: CONFIG.jwt.expireInSeconds,
  },

  adapter: PrismaAdapter(prismaClient),

  /* An array of authentication providers for signing in (e.g. Google, Facebook, Twitter, GitHub, Email, etc) in any order. This can be one of the built-in providers or an object with a custom provider. */
  providers: [
    /* The Credentials provider allows you to handle signing in with arbitrary credentials, such as a username and password, two-factor authentication or hardware device (e.g. YubiKey U2F / FIDO) */
    CredentialsProvider({
      credentials: {
        email: {type: 'email'},
        password: {type: 'passowrd'},
      },

      async authorize(credentials) {
        const user = await getUserByEmail({
          email: String(credentials.email),
        });

        if (user && user.password) {
          const isMatch = await comparePassword({
            password: String(credentials.password),
            hashedPassword: user.password,
          });

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],

  /*
   * Callbacks are asynchronous functions you can use to control what happens when an action is performed.
   * Callbacks are extremely powerful, especially in scenarios involving JSON Web Tokens as they allow you to implement access controls without a database and to integrate with external databases or APIs.
   */
  callbacks: {
    async session({session, user, trigger, token}) {
      /* Set the user ID from the token subject*/
      session.user.id = token.sub as string;

      /* If there is an update to the user profile, i.e, user update their name so the session will set the user name with the updated name*/
      if (trigger === 'update') {
        session.user.name = user.name;
      }

      return session;
    },
  },
};

const result = NextAuth(authConfig);
const handlers: NextAuthResult['handlers'] = result.handlers;
const auth: NextAuthResult['auth'] = result.auth;
const signIn: NextAuthResult['signIn'] = result.signIn;
const signOut: NextAuthResult['signOut'] = result.signOut;

export {handlers, auth, signIn, signOut};
