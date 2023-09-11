import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Region = 'na1' | 'br1' | 'la1' | 'la2' | 'kr' | 'jp1' | 'eun1' | 'euw1' | 'tr1' | 'ru' | 'oc1' | 'ph2' | 'sg2' | 'th2' | 'tw2' | 'vn2';

// a function to convert specific regions to their general routing value
function getRoutingValue(region: Region): string {
    const map: Record<Region, string> = {
        'na1': 'AMERICAS',
        'br1': 'AMERICAS',
        'la1': 'AMERICAS',  // LAN
        'la2': 'AMERICAS',  // LAS
        'kr': 'ASIA',       // KR
        'jp1': 'ASIA',      // JP
        'eun1': 'EUROPE',   // EUNE
        'euw1': 'EUROPE',   // EUW
        'tr1': 'EUROPE',    // TR
        'ru': 'EUROPE',     // RU
        'oc1': 'SEA',       // OCE
        'ph2': 'SEA',       // PH2
        'sg2': 'SEA',       // SG2
        'th2': 'SEA',       // TH2
        'tw2': 'SEA',       // TW2
        'vn2': 'SEA'        // VN2
    };
    
    return map[region] || region;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log('API handler initiated'); // 1. Checking if the handler is triggered

    if (req.method === 'GET') {
        const summonerName = req.query.summonerName as string;
        const region = req.query.region as string; // Retrieve the region from the query parameters

        console.log(`Received summonerName: ${summonerName}, region: ${region}`); // 2. Checking received data

        // Scope is limited since the beginning of the current year due to rate limits and website performance
        const startDate = new Date(new Date().getFullYear(), 0, 1); // Jan 1st of current year
        const startTimestamp = startDate.getTime();


        if (!summonerName || !region) {
            return res.status(400).json({ error: "Summoner name and region are required" });
        }

        console.log("Riot API Key: ", process.env.RIOT_API_KEY)

        try {
            // Fetch summoner details
            const summonerResponse = await axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
                headers: {
                    "X-Riot-Token": process.env.RIOT_API_KEY
                }
            });

            console.log('summoner response: ', summonerResponse.data);
            
            const puuid = summonerResponse.data.puuid;
            console.log('Fetching match data for PUUID: ', puuid);
            
            const routingValue = getRoutingValue(region as Region);

            // Fetch match list and calculate total hour
            const matchResponse = await axios.get(`https://${routingValue}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${startTimestamp}`, {
                headers: {
                    "X-Riot-Token": process.env.RIOT_API_KEY
                }
            });
            console.log('Start Timestamp: ', startTimestamp);

            const matches = matchResponse.data;

            console.log('match response: ', matchResponse.data); // 4. Check the response data for matches

            let totalPlaytime = 0;

            // Compute the total playtime from the matches
            for (let match of matches) {
                totalPlaytime += match.gameDuration;
            }
            
            
            return res.status(200).json({ hoursPlayed: totalPlaytime / 3600 });

        } catch (error) {
            console.error('Error while fetching data: ', error.message)
            console.error('Error details: ', error.response ? error.response.data : 'No additional error details');

            if (error.response && error.response.status === 404) {
                return res.status(404).json({ error: "Summoner was not found" });
            }
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}
