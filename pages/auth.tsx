import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import Input from '@/components/Input';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const handleGetStartedClick = () => {
    setShowOptions(true); // Show sign-in or sign-up options
  };

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
        console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/background.webp')] bg-no-repeat bg-fixed bg-center bg-cover">
        <nav className='header'>
          <div className="header_logo">
            <h5>Task Manager</h5>
          </div>
        </nav>
          {!showOptions && (
            <div className='flex flex-col items-center mt-44'>
              <p className=' text-5xl text-red-600 font-extrabold'>Organize it all with <span className='text-green-500'>Task Manager</span></p>
              <button
                onClick={handleGetStartedClick}
                className='bg-red-600 py-3 text-white rounded-md w-40 mt-10 hover:bg-red-700 transition'
              >
                Get Started
              </button>
            </div>
          )}
        {showOptions && (
          <div className='flex justify-center items-center mt-10'>
            <div className='bg-gray-100 px-16 py-16 self-center flex flex-col items-center shadow-md mt-2 rounded-md w-50'>
              <h2 className="text-black text-4xl mb-8 font-semibold">
                {variant === 'login' ? 'Sign in' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                  <Input
                    id="name"
                    type="text"
                    label="Username"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                )}
                <Input
                  id="email"
                  type="email"
                  label="Email address or phone number"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={variant === 'login' ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-40 mt-10 hover:bg-red-700 transition"
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
              <p className="text-neutral-500 mt-12">
                {variant === 'login' ? 'First time?' : 'Already have an account?'}
                <span
                  onClick={toggleVariant}
                  className="text-black ml-1 hover:underline cursor-pointer"
                >
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
                .
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

export default Auth;