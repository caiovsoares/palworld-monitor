import { execSync } from 'child_process';
export async function POST() {
  try {
    const response = execSync('systemctl is-active palworld', {
      encoding: 'utf-8',
    }).split('\n');
    console.log(response[0]);
    return Response.json({ isOnline: response[0] == 'active' });
  } catch (error) {
    return Response.json({ isOnline: false });
  }
}
