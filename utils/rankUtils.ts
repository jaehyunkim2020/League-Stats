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
    return `border-${rank} bg-${rank} bg-opacity-25`;
}