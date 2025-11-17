import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from 'next-auth';

interface CustomUser extends Omit<User, 'role'> {
  id: string;
  token: string;
  role: string;
  username: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required');
          }

          const res = await fetch('http://127.0.0.1:8000/api/auth-token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: 'admin',
              password: 'passer',
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.detail || 'Authentication failed');
          }

          if (data) {
            return {
              id: data.user_id.toString(),
              email: credentials.email,
              name: data.name || data.username,
              username: data.username,
              token: data.token,
              role: 'user' // Default role since it's not in the API response
            };
          }

          return null;
        } catch (error: any) {
          console.error('Authentication error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/logon',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.email = user.email;
        token.name = user.username;
        token.role = (user as CustomUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        (session.user as any).role = token.role;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    }
  },
  secret: 'EpumSJrZ+pEyuKduZHIafPkFvByMXhqLRI7SIQ0GKoA=',
  debug: true,
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST }; 