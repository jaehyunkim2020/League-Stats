import React, { useState } from 'react';
import SummonerCard from './SummonerCard';
import SummonerInput from './SummonerInput';
import { SummonerInfo } from '@/types/lol';
import { toast } from 'react-toastify';
import { ErrorBoundary } from './ErrorBoundary';
import { RotatingLines } from  'react-loader-spinner'
import { getRankStyles } from '@/utils/rankUtils';

type Props = {
    index: number;
};

const SummonerContainer: React.FC<Props> = ({ index }) => {
    const [name, setName] = useState<string>('');
    const [region, setRegion] = useState<string>('na1');
    const [data, setData] = useState<SummonerInfo | null>(null); // fetched data
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); 

    const fetchSummonerData = async () => {
        setLoading(true);
        setError(null);

        if (!navigator.onLine) {
            toast.error("You appear to be offline. Please check your internet connection and try again.");
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch(`/api/lol/getSummonerData?summonerName=${encodeURIComponent(name)}&region=${encodeURIComponent(region)}`);

            // Check if the response is OK. If not, treat it as an application error.
            if (!response.ok) {
                const responseBody = await response.json();
                throw new Error(responseBody.error || 'An error occurred. Please try again.');
            }

            const data = await response.json();
            setData(data);
            const rankStyles = getRankStyles(data.tier);
            console.log(rankStyles);



        } catch (error: any) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div 
            aria-live="polite" 
            className={`w-48 h-64 border-4 ${data ? getRankStyles(data.tier) : ''} bg-opacity-25 p-4 rounded-md shadow-md transition-transform duration-300 hover:-translate-y-1 flex flex-col justify-between bg-riot-card`}>
            {loading && <RotatingLines
                strokeColor='red'
                strokeWidth='5'
                animationDuration='0.75'
                width='96'
                visible={true}
            />}
            {error && <p>Error: {error}</p>}
            {data ? (
                <ErrorBoundary>
                    <SummonerCard data={data} />
                </ErrorBoundary>
            ) : (
                <>
                    <SummonerInput
                        index={index}
                        value={name}
                        region={region}
                        onChange={setName}
                        onRegionChange={setRegion}
                    />
                    <div className='text-center mt-4'>
                        <button 
                            onClick={fetchSummonerData}
                            className='bg-lol-lolbutton text-lol-buttonText rounded-md px-4 py-2 mt-4 hover:bg-lol-lolbuttonHover hover:text-lol-buttonTextHover transition-colors duration-300'>
                            Show Data
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SummonerContainer;
