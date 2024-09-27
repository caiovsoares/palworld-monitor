'use client';
import { signIn } from 'next-auth/react';
import { Palanquin } from 'next/font/google';
import Image from 'next/image';
import { FormEvent } from 'react';

export default async function Login() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', {
      password: e.currentTarget['password'].value,
      redirect: true,
      callbackUrl: process.env.NEXT_PUBLIC_HOST,
    });
  };

  return (
    <div className='flex flex-col items-center gap-10 py-10 '>
      <div>
        <Image
          className='rounded-full border border-black'
          src={'/logo.jpg'}
          width={150}
          height={150}
          alt='Logo'
        />
      </div>
      <div className='flex flex-col items-center px-20 py-4 gap-2 rounded-2xl bg-[rgb(244,215,1)] border border-black'>
        <p className='font-semibold text-2xl'>Senha</p>
        <form onSubmit={onSubmit} className='flex flex-col items-center gap-2'>
          <input
            type='password'
            id='password'
            name='password'
            className='rounded-md border border-black px-2'
          />
          <button
            type='submit'
            className='bg-[rgb(30,41,59)] text-white p-2 rounded-md border border-black hover:bg-[rgb(15,27,35)]'
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}
