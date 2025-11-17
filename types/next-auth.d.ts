import 'next-auth'

declare module 'next-auth' {
  interface User {
    token?: string
    username: string
    role: string
  }

  interface Token {
    role: string
  }

  interface Session {
    accessToken?: any
    username?: any
    role?: string
  }

  interface JWT {
    accessToken?: string
    username?: string
    role?: string
  }
} 