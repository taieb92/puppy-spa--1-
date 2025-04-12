export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const ERROR_CODES = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID_REQUEST: 'INVALID_REQUEST',
  SERVER_ERROR: 'SERVER_ERROR',
} as const

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.code) {
      case ERROR_CODES.NOT_FOUND:
        return 'The requested resource was not found'
      case ERROR_CODES.INVALID_REQUEST:
        return 'Invalid request. Please check your input.'
      case ERROR_CODES.SERVER_ERROR:
        return 'An unexpected server error occurred'
      default:
        return error.message
    }
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
} 