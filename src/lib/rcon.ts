const { PalRCONClient } = require('palrconclient');

type SteamPlayer = { name: string; playeruid: string; steamid: string };
function getPlayersFromResponse(response: string): SteamPlayer[] {
  const players: SteamPlayer[] = [];

  let temp = response.split('\n');
  temp = temp.slice(1, temp.length - 1);
  temp.forEach((e) => {
    const data = e.split(',');
    players.push({ name: data[0], playeruid: data[1], steamid: data[2] });
  });

  return players;
}

export default async function checkOnlinePlayers() {
  let onlinePlayers = 0;
  let isOnline = false;
  let playerList: SteamPlayer[] = [];

  const rcon = new PalRCONClient(
    process.env.HOST,
    process.env.RCOMPORT,
    process.env.ADMINPW
  );

  await PalRCONClient.checkConnection(rcon)
    .then(async (isValid: boolean) => {
      if (isValid) {
        // Use the "/ShowPlayers" command
        await PalRCONClient.ShowPlayers(rcon)
          // Log the response
          .then((response: string) => {
            const players = getPlayersFromResponse(response);
            isOnline = true;
            onlinePlayers = players.length;
            playerList = players;
          })
          .catch((error: any) => console.error('Error:', error.message));
      } else {
        console.error(
          'Connection failed. Please check your connection details.'
        );
        onlinePlayers = 0;
        isOnline = false;
      }
    })
    .catch((error: any) => console.error('Error:', error.message));

  return { onlinePlayers, isOnline, playerList };
}
