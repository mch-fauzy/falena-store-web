export const SUCCESS_MESSAGE = {
  entityCreated: (entityName: string) => `${entityName} created successfully`,
  entityUploaded: (entityName: string) => `${entityName} uploaded successfully`,
  entityUpdated: (entityName: string) => `${entityName} updated successfully`,
  entityDeleted: (entityName: string) => `${entityName} deleted successfully`,
  entityRetrieved: (entityName: string) =>
    `${entityName} retrieved successfully`,
  entitiesRetrieved: (entityName: string) =>
    `${entityName} retrieved successfully`,
  action: (action: string) => `${action} successfully`,
} as const;

export const ERROR_MESSAGE = {
  unprocessableEntity: 'Unprocessable Entity',
  unauthorized: 'Not Authorized',
  forbiddenAccess: 'Forbidden Access',
  notFound: 'Not Found',
  internalServerError: 'Internal Server Error',
  badRequest: 'Bad Request',
  conflict: 'Conflict',
  validationError: 'Validation Error',
  fieldRequired: 'Field Required',
  fieldRequiredWithName: (fieldName: string) =>
    `Field ${fieldName} is required`,
  fieldInvalidValue: 'Field Invalid Value',
  fieldInvalidValueWithName: (fieldName: string, expectedType?: string) =>
    `Field ${fieldName} has an invalid value${expectedType ? `, expected ${expectedType}` : ''}`,
  fieldMinLength: (fieldName: string, length: number) =>
    `${fieldName} must be at least ${length} characters`,
  fieldExactLength: (fieldName: string, length: number) =>
    `${fieldName} must be exactly ${length} character${length > 1 ? 's' : ''}`,
  fieldArrayMinLength: (fieldName: string, length: number) =>
    `${fieldName} must contain at least ${length} item${length > 1 ? 's' : ''}`,
  fieldMustBePositive: (fieldName: string) => `${fieldName} must be positive`,
  fieldInvalidFormat: (fieldName: string, format: string) =>
    `${fieldName} must be in format ${format}`,
  dataEntityNotFound: (entityName: string) => `Data ${entityName} not found`,
  dataEntityFieldAlreadyExists: (fieldName: string) =>
    `Data with ${fieldName} already exists`,
  dataEntityFieldNotFound: (fieldName: string) =>
    `Data with ${fieldName} not found`,
  fieldDuplicateWithName: (fieldName: string) =>
    `Field ${fieldName} is duplicate`,
  dataEntityReferencedByOther: (entityName: string, referencedBy: string) =>
    `Data ${entityName} is referenced by ${referencedBy}`,
  dataEntityInInvalidState: (entityName: string, state: string) =>
    `Data ${entityName} is ${state}`,
  prerequisiteEntitiesState: (entities: string, state: string) =>
    `${entities} must exist before ${state}`,
  entityForbidden: (entityName: string) =>
    `${entityName} are not allowed to perform this operation`,

  /**
   * Error messages related to auth operations
   */
  invalidCredentials: 'Invalid credentials',
  userAccountInactive: 'User account is inactive',

  /**
   * Error messages related to user passwords
   */
  passwordTooWeak:
    'Password too weak, must contain at least 1 number and 1 alphabet',
  passwordTooShort: (length = 6) =>
    `Password must be at least ${length} characters long`,
  passwordNotMatch: "Passwords don't match",

  /**
   * Error message related to user phone
   */
  phoneNumberInvalidFormatId:
    'Should start with 62, followed by 9 to 13 digits (excluding 62)',

  /**
   * Error message related to email
   */
  invalidEmailFormat: 'Invalid email format',

  /**
   * Error message related to JWT tokens
   */
  invalidOrExpiredToken: 'Invalid or expired token',

  databaseInvalidDataProvided: 'Invalid data provided to database operation',
} as const;
