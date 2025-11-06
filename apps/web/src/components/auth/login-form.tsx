'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@repo/auth';
import { type LoginInput, LoginSchema } from '@repo/schemas';
import { Button } from '@repo/ui/components/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { Spinner } from '@repo/ui/components/spinner';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Activity, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginInput) {
    startTransition(async () => {
      const res = await authClient.signIn.email(data);

      if (res.error) {
        toast.error('Login failed', {
          description: res.error.message || 'Please check your credentials and try again.',
        });
      } else {
        toast.success('Login successful', {
          description: 'Welcome back!',
        });
        form.reset();
      }
    });
    redirect('/');
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`login-${field.name}`}>Email</FieldLabel>
              <Input {...field} id={`login-${field.name}`} aria-invalid={fieldState.invalid} />
              <Activity mode={fieldState.invalid ? 'visible' : 'hidden'}>
                <FieldError errors={[fieldState.error]} />
              </Activity>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name='password'
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`login-${field.name}`}>Password</FieldLabel>
              <Input {...field} id={`login-${field.name}`} aria-invalid={fieldState.invalid} />
              <Activity mode={fieldState.invalid ? 'visible' : 'hidden'}>
                <FieldError errors={[fieldState.error]} />
              </Activity>
            </Field>
          )}
        />
        <Field>
          <Button type='submit'>{isPending ? <Spinner /> : 'Login'}</Button>
          <FieldDescription className='text-center'>
            Don&apos;t have an account? <Link href='/sign-up'>Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
