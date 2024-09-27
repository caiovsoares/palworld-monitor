import { getSession } from '@/auth';
import LogoutButton from '@/components/LogoutButton';
import OfflineButtons from '@/components/OfflineButtons';
import OnlineButtons from '@/components/OnlineButtons';
import { Player } from '@/lib/types';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const revalidate = 5;
export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/isonline`, {
    method: 'POST',
    cache: 'no-store',
  });
  const {
    isOnline,
    onlinePlayers,
    playerList,
  }: { isOnline: boolean; onlinePlayers: number; playerList: Player[] } =
    await response.json();

  const ses = await getSession();
  if (!ses) redirect('/api/auth/signin');

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
        <p className='font-semibold text-2xl'>Status:</p>
        <div className='flex gap-1 items-center'>
          <Image
            src={isOnline ? '/online.png' : '/offline.png'}
            width={20}
            height={20}
            alt='Online'
          />
          <p>{isOnline ? 'Online' : 'Offline'}</p>
        </div>
        <p>
          {onlinePlayers} Jogadores Online {ses?.user?.name}
        </p>
      </div>
      <div className='flex flex-col items-center px-20 py-4 gap-2 rounded-2xl bg-[rgb(244,215,1)] border border-black'>
        <p className='font-semibold text-2xl'>Jogadores Online:</p>
        <div className='flex flex-col gap-1 items-center'>
          {playerList.map((player) => (
            <p key={player.playerId}>
              {player.name} - Lv.{player.level} - (X:{player.location_x} Y:
              {player.location_y}) - ping:{player.ping}
            </p>
          ))}
        </div>
      </div>
      <details className='px-10 py-4 rounded-2xl bg-[rgb(244,215,1)] border border-black'>
        <summary>Opções</summary>
        <div className='flex items-center gap-10 py-4'>
          {isOnline ? <OnlineButtons /> : <OfflineButtons />}
        </div>
      </details>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
