import { getSession } from '@/auth';
import LogoutButton from '@/components/LogoutButton';
import OfflineButtons from '@/components/OfflineButtons';
import OnlineButtons from '@/components/OnlineButtons';
import { Player } from '@/lib/types';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export const revalidate = 5;
export default async function Home() {
  const fixPosition = (player: Player) => {
    const posX = player.location_x;
    const posY = player.location_y;
    player.location_x = (posY - 157664.55791065) / 462.962962963;
    player.location_y = (posX + 123467.1611767) / 462.962962963;
  };

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
  playerList.forEach(fixPosition);
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
        <div className='grid grid-cols-[1fr_80px_170px_80px] gap-2'>
          {playerList.map((player) => (
            <>
              <div className='text-center font-semibold'>{player.name}</div>
              <div className='grow text-center'>
                Lv.{' '}
                {player.level.toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                })}
              </div>
              <div className='text-center'>
                (X:
                {player.location_x.toFixed(1)} Y:{player.location_y.toFixed(1)})
              </div>
              <div className='text-center'>ping:{player.ping.toFixed(0)}</div>
            </>
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
