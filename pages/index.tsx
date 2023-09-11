import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [summonerName, setSummonerName] = useState('');
  const [playtime, setPlaytime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState('na1'); // Default to North America

  const fetchPlaytime = async () => {
    setLoading(true);
    setError(null); // reset any previous errors

    try {
      // Include the region in the API request
      const response = await fetch(`/api/getUserPlaytime?summonerName=${summonerName}&region=${region}`);

      if (!response.ok) {
        throw new Error('Failed to fetch playtime. Please ensure the summoner name is correct.')
      }

      const data = await response.json();
      setPlaytime(data.hoursPlayed);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const formattedPlaytime = playtime?.toLocaleString();
  const daysEquivalent = (playtime / 24).toFixed(2);

  return (
    <div>
      <Head>
        <title>Check Your League of Legends Playtime</title>
        <meta name="description" content="A simple tool to check how many hours you've spent playing League of Legends." />
      </Head>

      <h1>Check Your League of Legends Playtime</h1>
      
      <input 
        value={summonerName} 
        onChange={e => setSummonerName(e.target.value)} 
        placeholder="Enter your summoner name..."
        aria-label="Summoner Name"
      />

      <button onClick={fetchPlaytime} disabled={loading}>
        Check Playtime
      </button>
      <select value={region} onChange={e => setRegion(e.target.value)}>
        <option value="na1">NA</option>
        <option value="euw1">EU W</option>
        <option value="eun1">EU NE</option>
        <option value="kr">KR</option>
        {/*... other regions */}
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {playtime && (
        <div>
          <p>Total hours: {playtime}</p>
          <p>Equivalent days: {playtime / 24}</p>
        </div>
      )}
    </div>
  );
}
