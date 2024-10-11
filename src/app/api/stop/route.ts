import palworldApi from '@/lib/palworldApi';
import { execSync } from 'child_process';
import { getSession } from '@/auth';
export async function POST() {
  const session = await getSession();
  if (!session?.user?.name)
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );

  const { players } = (
    await palworldApi
      .get('players')
      .catch((e) => ({ data: { error: 'Cannot GET RestAPI', players: [] } }))
  ).data;

  if (players.length > 0)
    return Response.json({
      message:
        'Não é possível parar o servidor enquanto houver jogadores online',
      error: 'Não é possível parar o servidor enquanto houver jogadores online',
    });

  const response = execSync(process.env.STOP_SERVER_COMMAND || '', {
    encoding: 'utf-8',
  }).split('\n');
  return Response.json({ message: response });
}
