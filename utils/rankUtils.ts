type Tier = 
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';


export const getRankStyles = (rank: string) => {

    console.log("Ranked passed: ", rank)
    return `border-${rank} bg-${rank} bg-opacity-25`;
}