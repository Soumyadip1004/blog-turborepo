'use client';
import { authClient } from '@repo/auth';
import { Button } from '@repo/ui/components/button';
import { Spinner } from '@repo/ui/components/spinner';
import { cn } from '@repo/ui/lib/utils';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function SignOutBtn({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  async function handleSignOut() {
    startTransition(async () => {
      const res = await authClient.signOut();

      if (res.error) {
        toast.error('Logout failed', {
          description: 'Please try again.',
        });
      } else {
        toast.success('Logged out', {
          description: 'Come back soon!',
        });
      }
    });
    redirect('/');
  }
  return (
    <Button
      variant='outline'
      type='button'
      className={cn('w-22', className)}
      onClick={handleSignOut}
    >
      {isPending ? <Spinner /> : 'Logout'}
    </Button>
  );
}
