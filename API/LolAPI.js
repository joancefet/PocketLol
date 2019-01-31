const API_TOKEN = 'RGAPI-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

export function getSummonerBySummonerName(name, server) {
  const url = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_TOKEN}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}


export function getLeageBySummonerId(summonerId, server) {
  const url = `https://${server}.api.riotgames.com/lol/league/v4/positions/by-summoner/${summonerId}?api_key=${API_TOKEN}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function getMatchsByAccountId(accountId, server, index) {
  const url = `https://${server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${index}&api_key=${API_TOKEN}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}


export function getInfoMatchByMatchId(matchId, server) {
  const url = `https://${server}.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${API_TOKEN}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}

export function getLasVersionddragon() {
  const url = 'https://ddragon.leagueoflegends.com/api/versions.json';
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}
