'use client';

import { useState } from 'react';
import ApiButton from './ApiButton';

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default function OnlineButtons() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <ApiButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        command='stop'
        text='Desligar'
      />
      <ApiButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        command='restart'
        text='Reiniciar'
      />
    </>
  );
}
