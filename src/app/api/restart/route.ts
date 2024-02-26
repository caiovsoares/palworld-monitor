import checkOnlinePlayers from '@/lib/rcon';
import { execSync } from 'child_process';
export async function POST() {
  const { onlinePlayers } = await checkOnlinePlayers();
  if (onlinePlayers > 0)
    return Response.json({
      message:
        'Não é possível reiniciarr o servidor enquanto houver jogadores online',
    });
  const response = execSync('systemctl restart palworld', {
    encoding: 'utf-8',
  }).split('\n');
  return Response.json({ message: response });
}
