import { prisma } from '@repo/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';


export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
});
