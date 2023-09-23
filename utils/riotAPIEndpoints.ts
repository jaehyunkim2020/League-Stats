// League endpoints
export function getSummonerByNameURL(region: string, summonerName: string) {
    return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`;
}

export function getLadderRankBySummonerIdURL(region: string, summonerId: string) {
    return `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
}
