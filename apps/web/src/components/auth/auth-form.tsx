import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Field, FieldGroup, FieldSeparator } from '@repo/ui/components/field';
import { cn } from '@repo/ui/lib/utils';
import GithubBtn from './github-btn';
import GoogleBtn from './google-btn';
import LoginForm from './login-form';
import SignUpForm from './signup-form';

const authMeta = {
  'sign-up': {
    title: 'Create your account',
    description: 'Sign up with your Github or Google account',
  },
  login: {
    title: 'Welcome back',
    description: 'Login with your Github or Google account',
  },
};

export default function AuthForm({
  formType,
  className,
  ...props
}: React.ComponentProps<typeof Card> & {
  formType: 'sign-up' | 'login';
}) {
  return (
    <Card {...props} className={cn('w-full max-w-sm', className)}>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>{authMeta[formType].title}</CardTitle>
        <CardDescription>{authMeta[formType].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className='mb-6'>
          <Field>
            <GithubBtn>
              {formType === 'login' ? 'Login with Github' : 'Sign up with Github'}
            </GithubBtn>
            <GoogleBtn>
              {formType === 'login' ? 'Login with Google' : 'Sign up with Google'}
            </GoogleBtn>
          </Field>

          <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
            Or continue with
          </FieldSeparator>
        </FieldGroup>

        {formType === 'login' ? <LoginForm /> : <SignUpForm />}
      </CardContent>
    </Card>
  );
}
