'use client';

import { authClient } from '@repo/auth';
import SignOutBtn from '@/components/auth/signout-btn';

export default function HomePage() {
  const user = authClient.useSession();
  return (
    <div>
      {JSON.stringify(user)}
      <SignOutBtn />
    </div>
  );
}
