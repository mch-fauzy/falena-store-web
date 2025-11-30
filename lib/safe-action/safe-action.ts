import {createSafeActionClient} from 'next-safe-action';
import {AuthError} from 'next-auth';
import {handlePrismaError} from './prisma-error-handler';
import {ERROR_MESSAGE} from '@/lib/message';

/**
 * Default error message for unhandled server errors
 * Prevents leaking sensitive information to clients
 */
const DEFAULT_SERVER_ERROR = ERROR_MESSAGE.internalServerError;

/**
 * Configured safe action client with custom error handling
 *
 * Features:
 * - Handles Prisma database errors
 * - Maps errors to user-friendly messages
 * - Type-safe validation with Zod
 */
export const actionClient = createSafeActionClient({
  /**
   * Customizes error messages returned to the client
   * Called when an error occurs during action execution
   */
  handleServerError(error) {
    // Try to handle as Prisma error first
    const prismaError = handlePrismaError(error);
    if (prismaError) {
      return prismaError;
    }

    // Check for NextAuth errors
    if (error instanceof AuthError) {
      return ERROR_MESSAGE.invalidCredentials;
    }

    // Check for custom error types
    if (error instanceof Error) {
      // You can add custom error classes here if needed
      // For now, return the error message for known Error instances
      // In production, you might want to mask these
      return error.message || DEFAULT_SERVER_ERROR;
    }

    // Unknown error - return generic message
    return DEFAULT_SERVER_ERROR;
  },
});
