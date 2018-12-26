const API_TOKEN = 'RGAPI-b6f9ac72-ee40-42ea-bfe9-2dc65485c40e';

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

export function getLasVersionddragon() {
    const url = "https://ddragon.leagueoflegends.com/api/versions.json"
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
