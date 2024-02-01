import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getRoutingValue } from '../../../utils/lolRouting';
import { riotAPI } from '../../../utils/network';
import { isValidPlayerName } from '@/utils/validation/playerNameValidation';
import { handleRiotAPIError } from '@/utils/errorHandlers/riotAPIErrors';
import { getSummonerByNameURL, getLadderRankBySummonerIdURL } from '@/utils/riotAPIEndpoints';
import { LadderRankItem } from '@/types/lol';

function processLadderRank(ladderRankData: LadderRankItem[]): any {
    const soloRank = ladderRankData.find(rank => rank.queueType === 'RANKED_SOLO_5x5');
    if (!soloRank) {
        throw new Error("Solo rank data not found for this Summoner.");
    }
    const tier = soloRank.tier;
    const tierRank = `${soloRank.tier} ${soloRank.rank}`;
    const gamesWon = soloRank.wins;
    const gamesLost = soloRank.losses;
    const winRatio = gamesWon / (gamesWon + gamesLost) * 100;
    return { tier, tierRank, gamesWon, gamesLost, winRatio };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('1. API handler initiated'); // 1. Checking if the handler is triggered

    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { summonerName, region } = req.query; // Retrieve the region from the query parameters
    
    if (!summonerName || !region) {
        return res.status(400).json({ error: "Summoner name and region are required" });
    }

    // Ensure summonerName and region are strings
    const summonerNameStr = Array.isArray(summonerName) ? summonerName[0] : summonerName;
    const regionStr = Array.isArray(region) ? region[0] : region;
    
    if (!isValidPlayerName(summonerNameStr)) {
        return res.status(400).json({ error: "Invalid Summoner name provided." });
    }
    console.log(`2. Received summonerName: ${summonerName}, region: ${region}`); // 2. Checking received data
    
    try {
        // Fetch summoner details
        const summonerResponse = await riotAPI.get(getSummonerByNameURL(regionStr, summonerNameStr));
        
        // Fetch ladder rank using id
        const ladderRankResponse = await riotAPI.get(getLadderRankBySummonerIdURL(regionStr, summonerResponse.data.id));
        if (!ladderRankResponse.data || !Array.isArray(ladderRankResponse.data)) {
            return res.status(500).json({ error: "Unexpected data format received." });
        }
        console.log('4. ladder rank: ', ladderRankResponse.data);
        
        const puuid = summonerResponse.data.puuid;
        console.log('5. Fetching match data for PUUID: ', puuid);
        

        const { tier, tierRank, gamesWon, gamesLost, winRatio } = processLadderRank(ladderRankResponse.data); 
        console.log('6. Tier: ', tier)
        console.log('7. Solo Rank: ', tierRank)
        
        // Process both responses to return necessary data
        return res.status(200).json({
            name: summonerResponse.data.name,
            summonerLevel: summonerResponse.data.summonerLevel,
            profileIconId: summonerResponse.data.profileIconId,
            tier: tier,
            tierRank: tierRank,
            gamesWon: gamesWon,
            gamesLost: gamesLost,
            winRatio: winRatio.toFixed(2)
        });

    } catch (error: any) {
        console.error("API Error: ", error);
        const { statusCode, errorMessage } = handleRiotAPIError(error);
        return res.status(statusCode).json({ error: errorMessage });
    }
}