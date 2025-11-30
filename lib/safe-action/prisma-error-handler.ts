import {Prisma} from '@prisma/client';
import {ERROR_MESSAGE} from '@/lib/message';

/**
 * Common Prisma error codes:
 * - P2002: Unique constraint violation (duplicate entry)
 * - P2025: Record not found (update/delete target missing)
 * - P2003: Foreign key constraint violation
 */

/**
 * Extracts field name from Prisma unique constraint metadata
 */
function extractFieldFromUniqueConstraint(
  error: Prisma.PrismaClientKnownRequestError,
): string | undefined {
  if (error.meta?.target) {
    const target = error.meta.target as string | string[];
    return Array.isArray(target) ? target[0] : target;
  }
  return undefined;
}

/**
 * Handles Prisma errors and returns user-friendly error messages
 * Called from safe-action client's handleReturnedServerError
 */
export function handlePrismaError(error: unknown): string | null {
  // Prisma Client Known Request Errors (database-level)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        // Unique constraint violation (e.g., duplicate email)
        const field = extractFieldFromUniqueConstraint(error);
        const fieldName = field ? field : 'This value';
        return ERROR_MESSAGE.dataEntityFieldAlreadyExists(fieldName);
      }

      case 'P2025': {
        // Record not found (from update/delete operations)
        return ERROR_MESSAGE.notFound;
      }

      case 'P2003': {
        // Foreign key constraint violation
        return ERROR_MESSAGE.conflict;
      }

      default: {
        // Other known Prisma errors - return generic message
        return ERROR_MESSAGE.internalServerError;
      }
    }
  }

  // Prisma Client Validation Errors (schema-level validation)
  if (error instanceof Prisma.PrismaClientValidationError) {
    return ERROR_MESSAGE.databaseInvalidDataProvided;
  }

  // Prisma Client Initialization Error (connection issues)
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return ERROR_MESSAGE.internalServerError;
  }

  // Not a Prisma error
  return null;
}
