'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      className='px-10 py-4 rounded-2xl bg-[rgb(244,215,1)] hover:bg-[rgb(249,225,100)] border border-black text-xl font-semibold'
      onClick={() => {
        signOut();
      }}
    >
      Sair
    </button>
  );
}
