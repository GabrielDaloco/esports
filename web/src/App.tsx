import { MagnifyingGlassPlus } from 'phosphor-react';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { AdBanner } from './components/AdBanner';
import { useEffect, useState } from 'react';

function App() {
  const [games,setGames] = useState([])

  useEffect(() => {
    fetch("http://localhost:3333/games").then
  }, [])
  
  return(
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-[64px] text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">

        <GameBanner bannerUrl='/game-1.png' title='League of Legends' adsCount={5}/>
        <GameBanner bannerUrl='/game-2.png' title='League of Legends' adsCount={5}/>
        <GameBanner bannerUrl='/game-3.png' title='League of Legends' adsCount={5}/>
        <GameBanner bannerUrl='/game-4.png' title='League of Legends' adsCount={5}/>
        <GameBanner bannerUrl='/game-5.png' title='League of Legends' adsCount={5}/>
        <GameBanner bannerUrl='/game-6.png' title='League of Legends' adsCount={5}/>

      </div>

      <AdBanner/>

    </div>
  )
}

export default App
