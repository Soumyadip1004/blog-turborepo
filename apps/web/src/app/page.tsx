import AuthForm from '@/components/auth/auth-form';

export default function HomePage() {
  return (
    <main>
      <section className='container mx-auto h-screen w-full bg-background'>
        <div className='flex h-full w-full items-center justify-center gap-4'>
          <AuthForm formType='login' />
          <AuthForm formType='sign-up' />
        </div>
      </section>
    </main>
  );
}
