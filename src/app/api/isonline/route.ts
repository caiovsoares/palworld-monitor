import { Player } from '@/lib/types';
import axiosDefault from 'axios';

export async function POST() {
  let isOnline = false;
  let onlinePlayers = 0;
  let playerList: Player[] = [];

  try {
    const axios = axiosDefault.create({
      maxBodyLength: Infinity,
      baseURL: `${process.env.PALWORLD_API_URL}/v1/api`,
      headers: {
        Accept: 'application/json',
        Authorization: `Basic admin:${process.env.ADMINPW}`,
      },
    });

    const infoResponse = (await axios.get('info')).data;
    const playersResponse = (await axios.get('players')).data;
    isOnline = !!infoResponse.servername;
    playerList = playersResponse.players;
    onlinePlayers = playerList.length;
  } catch (error) {
    console.log(error);
    console.log('cannot GET RestAPI');
  }
  return Response.json({ isOnline, onlinePlayers, playerList });
}
