const API_TOKEN = 'RGAPI-0608555f-d06c-4546-ae2c-bacf2b469eb9';

export function getSummonerBySummonerName(name, server) {
    const url = "https://" + server + ".api.riotgames.com/lol/summoner/v3/summoners/by-name/" + name + "?api_key=" + API_TOKEN
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


export function getLeageBySummonerId(summonerId) {
    const url = "https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/" + summonerId + "?api_key=" + API_TOKEN
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

