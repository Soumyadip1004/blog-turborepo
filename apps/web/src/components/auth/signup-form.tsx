'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@repo/auth';
import { type SignUpInput, SignUpSchema } from '@repo/schemas';
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

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: SignUpInput) {
    startTransition(async () => {
      const res = await authClient.signUp.email(data);

      if (res.error) {
        toast.error('Signup failed', {
          description: res.error.message || 'Please verify your details and try again.',
        });
      } else {
        toast.success('Account created successfully', {
          description: 'Your account is ready',
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
          name='name'
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`signup-${field.name}`}>Name</FieldLabel>
              <Input {...field} id={`signup-${field.name}`} aria-invalid={fieldState.invalid} />
              <Activity mode={fieldState.invalid ? 'visible' : 'hidden'}>
                <FieldError errors={[fieldState.error]} />
              </Activity>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`signup-${field.name}`}>Email</FieldLabel>
              <Input {...field} id={`signup-${field.name}`} aria-invalid={fieldState.invalid} />
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
              <FieldLabel htmlFor={`signup-${field.name}`}>Password</FieldLabel>
              <Input {...field} id={`signup-${field.name}`} aria-invalid={fieldState.invalid} />
              <Activity mode={fieldState.invalid ? 'visible' : 'hidden'}>
                <FieldError errors={[fieldState.error]} />
              </Activity>
            </Field>
          )}
        />
        <Field>
          <Button type='submit'>{isPending ? <Spinner /> : 'Create Account'}</Button>
          <FieldDescription className='text-center'>
            Already have an account? <Link href='/login'>Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
