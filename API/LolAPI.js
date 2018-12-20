const API_TOKEN = 'RGAPI-cda9b6de-f5e4-40bc-b135-cc20fa162deb';

export function getSummonerBySummonerName(name, server) {
    const url = "https://" + server + ".api.riotgames.com/lol/summoner/v3/summoners/by-name/" + name + "?api_key=" + API_TOKEN
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


export function getLeageBySummonerId(summonerId, server) {
    const url = "https://" + server + ".api.riotgames.com/lol/league/v3/positions/by-summoner/" + summonerId + "?api_key=" + API_TOKEN
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getMatchsByAccountId(accountId, server, index) {
    const url = "https://" + server + ".api.riotgames.com/lol/match/v3/matchlists/by-account/" + accountId + "?endIndex=" + index + "&api_key=" + API_TOKEN
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}


export function getInfoMatchByMatchId(matchId, server) {
    const url = "https://" + server + ".api.riotgames.com/lol/match/v3/matches/" + matchId + "?api_key=" + API_TOKEN
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
