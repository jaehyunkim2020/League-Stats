import { render } from '@testing-library/jest-dom';
import SummonerCard from '../SummonerCard';
import { SummonerInfo } from '@/types/lol';
import '@testing-library/jest-dom/extend-expect';

test('SummonerCard displays summoner information', () => {
    const mockData : SummonerInfo = {
        name: 'SampleSummoner',
        summonerLevel: 30,
        profileIconId: 1234,
        tierRank: 'Gold IV',
        gamesWon: 55,
        gamesLost: 45,
        winRatio: '55.00'
    };

    const { getByText } = render(<SummonerCard data={mockData} />);

    expect(getByText('SampleSummoner')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
    expect(getByText('Gold IV')).toBeInTheDocument();
    expect(getByText('55')).toBeInTheDocument();
    expect(getByText('45')).toBeInTheDocument();
    expect(getByText('55.00%')).toBeInTheDocument();
});