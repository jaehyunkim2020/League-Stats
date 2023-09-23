// Invalid character/length check
const VALID_SUMMONER_NAME_REGEX = /^(?!.*Riot)[0-9a-zA-Z _.]+$/i;
const MIN_SUMMONER_NAME_LENGTH =  3;
const MAX_SUMMONER_NAME_LENGTH = 16;

export function isValidPlayerName(playerName: string): boolean {
    return typeof playerName === 'string' &&
        playerName.length >= MIN_SUMMONER_NAME_LENGTH &&
        playerName.length <= MAX_SUMMONER_NAME_LENGTH &&
        VALID_SUMMONER_NAME_REGEX.test(playerName);
}