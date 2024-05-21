'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type type = {
  command: string;
  text: string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function ApiButton({
  command,
  text,
  isLoading,
  setIsLoading,
}: type) {
  const router = useRouter();

  const onClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await fetch(`/api/${command}`, { method: 'POST' });
    await delay(3000);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <div
      onClick={onClick}
      className='px-6 py-2 bg-gray-200 hover:bg-gray-300 border border-gray-600 rounded-md hover:cursor-pointer'
    >
      {isLoading ? 'aguarde...' : text}
    </div>
  );
}
