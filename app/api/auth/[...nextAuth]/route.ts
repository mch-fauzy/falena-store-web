/*
 * When you define /app/api/auth/[...nextauth] JS/TS file, you instruct NextAuth.js that every API request beginning with /api/auth/* should be handled by the code written in the [...nextauth] file
 * Internally, NextAuth.js detects that it is being initialized in a Route Handler (by understanding that it is passed a Web Request instance), and will return a handler that returns a Response instance
 * Technically, in a Route Handler, the api/ prefix is not necessary, but we decided to keep it required for an easier migration
 */

import {handlers} from '@/configs/next-auth';

const {GET, POST} = handlers;

export {GET, POST};
