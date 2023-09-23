import { useState } from 'react';
import Head from 'next/head';
import SummonerContainer from '@/components/SummonerContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@/components/AddIcon';

export default function Home() {
  const [containers, setContainers] = useState<number[]>([1, 2]); // number of summoner containers
  const [activeGame, setActiveGame] = useState('LoL'); // Initial state

  const addSummonerContainer = () => {
    setContainers(prev => [...prev, prev.length + 1]); // simpleincrement to add a new container
  }

  return (
    <div className='bg-riot-dark text-white min-h-screen'>
      <Head>
        <title>Compare Your Riot Game Stats</title>
        <meta name="description" content="A simple tool to compare your League of Legends stats with your friends." />
      </Head>

      {/* Navbar */}
      <nav className='bg-riot-dark w-full pb-0 p-5 border-b-2 border-riot-red shadow-md relative z-10'>
        <div className='container mx-auto'>
          <ul className='flex m-0 p-0 list-none'>
            <li className='mr-4 m-0 p-0'>
              <a 
                href="#" 
                onClick={() => setActiveGame('LoL')}
                className={`text-xl text-white px-10 py-2 block bg-riot-red rounded-t-lg transform transition-transform duration-300 hover:scale-110 ${activeGame === 'LoL' ? 'bg-riot-primaryRed' : 'bg-riot-dark'}`}
              >
                  LoL
              </a>
            </li>
            {/* Add other game tabs in the future */}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className='h-[80vh] container mx-auto mt-24'>
        {/* Background Image Container */}
        <div className='absolute inset-0 top-0 h-[90vh] z-0'>
          <img src='/leagueBackground.jpg' alt='League of Legends Background Image' className='w-full h-full object-cover' />
        </div>
        <div className='z-10 relative'>
          <h1 className='text-5xl mb-10 font-bold text-center'  >Compare Your League of Legends Stats</h1>  
          <div className='flex justify-center space-x-6'>
            {containers.map((_, index) => (
              <SummonerContainer
                  key={index} 
                  index={index}
              />
            ))}
            {containers.length < 5 && <AddIcon onClick={addSummonerContainer} />}
          </div>
          <button 
            onClick={addSummonerContainer}
            className='text-lol-buttonText mt-6 px-6 py-2 bg-lol-lolbutton rounded-md hover:bg-lol-lolbuttonHover hover:text-lol-buttonTextHover transition-all duration 300'
          >
            Add another summoner
          </button>
        </div>

        
      </div>

      <ToastContainer />
    </div>
  );
}
