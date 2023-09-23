import React from 'react'
import { SummonerInfo } from '@/types/lol';

type Props = {
    data: SummonerInfo;
};

const SummonerCard: React.FC<Props> = ({ data }) => {
  return (
    <div className='flex flex-col items-center space-y-6'>
      {/* Group 1 Centered Items */}
      <div className='text-center'>
        <div className='relative mb-2'>
          <img 
            src={`http://ddragon.leagueoflegends.com/cdn/13.17.1/img/profileicon/${data.profileIconId}.png`} 
            alt={`${data.name}`}
            className='block w-32 h-32 border-2 border-[#0397AB] rounded-full relative'
             />
          <span className='absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-100 text-white px-1.5 rounded-sm'>
              {data.summonerLevel}
          </span>
        </div>
        <p>{data.name}</p>
        <p>{data.tierRank}</p>
      </div>

      {/* Group 2: Left-aligned Items */}
      <div className='flex justify-between items-center w-full'>
          <span>Games Won:</span>
          <span>{data.gamesWon}</span>
      </div>

      <div className='flex justify-between items-center w-full'>
          <span>Games Lost:</span>
          <span>{data.gamesLost}</span>
      </div>

      <div className='flex justify-between items-center w-full'>
          <span>Win Ratio:</span>
          <span>{data.winRatio}</span>
      </div>
    </div>
  )
}

export default SummonerCard
