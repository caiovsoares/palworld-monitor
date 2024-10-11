import { getSession } from '@/auth';
import { execSync } from 'child_process';
export async function POST() {
  const session = await getSession();
  if (!session?.user?.name)
    return Response.json(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' }
    );
  const response = execSync(process.env.START_SERVER_COMMAND || '', {
    encoding: 'utf-8',
  }).split('\n');
  return Response.json({ message: response });
}
