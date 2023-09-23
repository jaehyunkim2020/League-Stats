import React from 'react';
import { isValidPlayerName } from '@/utils/validation/playerNameValidation';

type Props = {
    index: number;
    value: string;
    region: string;
    onChange: (value: string) => void;
    onRegionChange: (region: string) => void;
};

const SummonerInput: React.FC<Props> = ({ index, value, region, onChange, onRegionChange }) => {

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (isValidPlayerName(inputValue)) {
            onChange(inputValue);
        } else {
            // Optionally display a tooltip/error message if i want
            console.log("Invalid summoner name");
        }
    }
    
    return (
        <div>
            <input
                placeholder="Enter summoner name..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='bg-transparent appearance-none border-none p-0'
            />
            <select value={region} onChange={e => onRegionChange(e.target.value)} className='text-black'>
                <option value="na1">NA</option>
                <option value="euw1">EU W</option>
                <option value="eun1">EU NE</option>
                <option value="kr">KR</option>
                {/*... other regions */}
            </select>
        </div>
    );
}

export default SummonerInput;
