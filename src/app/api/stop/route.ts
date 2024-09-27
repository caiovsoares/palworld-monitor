import { execSync } from 'child_process';
export async function POST() {
  const { onlinePlayers } = await (
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/isonline`, {
      method: 'POST',
    })
  ).json();
  if (onlinePlayers > 0)
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
