const requiredEnvVars = [
  'NEXT_PUBLIC_API_BASE_URL',
  'NEXT_PUBLIC_API_VERSION',
] as const

// Validate required environment variables
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    version: process.env.NEXT_PUBLIC_API_VERSION,
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Puppy Spa',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Manage your puppy spa appointments',
  },
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  },
} as const

export type Config = typeof config 