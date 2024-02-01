export type SummonerInfo = {
    name: string;
    summonerLevel: number;
    profileIconId: number;
    tier: string;
    tierRank: string;
    gamesWon: number;
    gamesLost: number;
    winRatio: string;
};


export type LadderRankItem = {
    queueType: string;
    tier: string;
    rank: string;
    wins: number;
    losses: number;
}