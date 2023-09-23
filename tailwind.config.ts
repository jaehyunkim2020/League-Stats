import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-IRON',
    'bg-BRONZE',
    'bg-SILVER',
    'bg-GOLD',
    'bg-PLATINUM',
    'bg-EMERALD',
    'bg-DIAMOND',
    'bg-MASTER',
    'bg-GRANDMASTER',
    'bg-CHALLENGER',
    'border-IRON',
    'border-BRONZE',
    'border-SILVER',
    'border-GOLD',
    'border-PLATINUM',
    'border-EMERALD',
    'border-DIAMOND',
    'border-MASTER',
    'border-GRANDMASTER',
    'border-CHALLENGER'
  ],
  theme: {
    extend: {
      colors: {
        'riot-dark': '#2D2D2D',
        riot: {
          primaryRed: '#d13639',
          secondaryRed: '#F12B15',
          black: '#000000',
          grayBlack: '#2D2D2D',
          white: '#FFFFFF'
        },
        lol: {
          primaryBlue: '#0bc6e3',
          lighterBlue: '#CDFAFA',
          darkerBlue: '#0A1428',
          functionalityGold: '#e0b667',
          lolbutton: '#0AC8B9',
          lolbuttonHover: '#0A323C',
          buttonText: '#0A323C',
          buttonTextHover: '#0AC8B9',
        },
        backgroundColor: {
          'riot-card': '#5B5A56',
          'riot-red': '#ff4248',
          'riot-gray1': '#A09B8C',
          'riot-gray1.5': '#5B5A56',
          'riot-gray2': '#3C3C41',
          'riot-gray3': '#1E2328',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
       },
        backgroundColor: {
          IRON: '#43464B',
          BRONZE: '#8B4513',
          SILVER: '#C0C0C0',
          GOLD: '#FFD700',
          PLATINUM: '#E5E4E2',
          EMERALD: '#50C878',
          DIAMOND: '#1E90FF',
          MASTER: '#9932CC',
          GRANDMASTER: '#4169E1',
          CHALLENGER: '#00008B',
        },
        borderColor: {
          IRON: '#43464B',
          BRONZE: '#8B4513',
          SILVER: '#C0C0C0',
          GOLD: '#FFD700',
          PLATINUM: '#E5E4E2',
          EMERALD: '#50C878',
          DIAMOND: '#1E90FF',
          MASTER: '#9932CC',
          GRANDMASTER: '#4169E1',
          CHALLENGER: '#00008B', 
        },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-clip-path-polyfill')
  ],
}
export default config;
