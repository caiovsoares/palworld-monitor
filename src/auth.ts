import { randomUUID } from 'crypto';
import { AuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const uuid = randomUUID();
        const user: User = { id: uuid, name: uuid };
        if (credentials?.password == process.env.PASSWORD) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: '/login' },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
