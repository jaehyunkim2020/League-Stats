import axios from 'axios';
import axiosRetry from 'axios-retry';

export const riotAPI = axios.create({
    headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY
    },
    timeout: 10000 // Setting a 10-second timeout
});

axiosRetry(riotAPI, {
    retries: 3, // Number of retry attemps
    retryDelay: (retryCount) => {
        console.log(`Retrying request. Attempt numbers: ${retryCount}`);
        return retryCount * 2000; // Time interval between retries. Here, it increases with each attempt.
    },
    retryCondition: (error) => {
        // Only retry if it's a network error, timeout error, or 5xx status code
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response && error.response.status >= 500);
    }
})