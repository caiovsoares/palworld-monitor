import { execSync } from 'child_process';
export async function POST() {
  const response = execSync(process.env.START_SERVER_COMMAND || '', {
    encoding: 'utf-8',
  }).split('\n');
  return Response.json({ message: response });
}
