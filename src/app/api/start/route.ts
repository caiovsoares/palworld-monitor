import { execSync } from 'child_process';
export async function POST() {
  const response = execSync('systemctl start palworld', {
    encoding: 'utf-8',
  }).split('\n');
  return Response.json({ message: response });
}
