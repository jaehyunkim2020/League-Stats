import { AxiosError } from "axios";
import axios from "axios";


export function handleRiotAPIError(error: any): { statusCode: number, errorMessage: string} {
    let statusCode: number = 500;
    let errorMessage: string = "Failed to fetch data"; //Default message

    if (error.response?.status) {
        switch(error.response.status) {
            case 400:
                errorMessage = "Bad request.";
                break;
            case 401:
                errorMessage = "Unauthorized access. Check your API key.";
                break;
            case 403:
                errorMessage = "Forbidden access.";
                break;
            case 404:
                errorMessage = "Summoner was not found. Check region and spelling.";
                break;
            case 405:
                errorMessage = "Method not allowed.";
                break;
            case 415:
                errorMessage = "Unsupported mediaq type.";
                break;
            case 429:
                errorMessage = "Exceeded Riot's data request limit. Please try again later.";
                break;
            case 500:
                errorMessage = "Internal server error from Riot's end.";
                break;
            case 502:
                errorMessage = "Bad gateway. Riot's server might be down.";
                break;
            case 503:
                errorMessage = "Service unavailable. Riot's server might be temporarily down.";
                break;
            case 504:
                errorMessage = "Gateway timed out from Riot's end.";
                break;
            default:
                if (error.response?.data?.status?.message) {
                    errorMessage = error.response.data.status.message;
                } else {
                    errorMessage = "Unknown error occurred while fetching data.";
                }
        }
        statusCode = error.response.status;
    } else if (axios.isAxiosError(error) && !error.response) {
        // The request was made but no response was received
        errorMessage = "No response received from Riot's servers. Please check your internet connection and try again.";
    } else if (error.request) {
        // Something happened in setting up the request that triggered an error
        errorMessage = "Failed to make the request. Please try again."; 
    } else if (!axios.isAxiosError(error)) {
        // Non-Axios related error
        errorMessage = error.message;
    }

    return { statusCode, errorMessage };
}