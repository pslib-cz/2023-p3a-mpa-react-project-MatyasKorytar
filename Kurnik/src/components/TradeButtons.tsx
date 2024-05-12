import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';

import TripleEggsImage from '../assets/others/TripleEggs.png';
import ArrowImage from '../assets/others/arrow.png';
import ChickenTradeImage from '../assets/others/ChickenTrade.png';
import TripleChickenImage from '../assets/others/TripleChicken.png';
import HenTradeImage from '../assets/others/HenTrade.png';
import TripleHenImage from '../assets/others/TripleHen.png';
import RoosterImage from '../assets/others/Rooster.png';

const TradeButtons: React.FC = () => {
  const { handleTrade } = useContext(GameContext);

  return (
    <div className='TradeFlex'>
      <button className='TradeButton' onClick={() => handleTrade('eggsToChick')}>
        <div className='Trade'>
          <img className='Trade_Item' src={TripleEggsImage} alt="Triple Eggs"/>
          <img className='Trade_Arrow' src={ArrowImage} alt="Arrow"/>
          <img className='Trade_Item' src={ChickenTradeImage} alt="Chicken"/>
        </div>
      </button>
      <button className='TradeButton' onClick={() => handleTrade('chicksToHen')}>
        <div className='Trade'>
          <img className='Trade_Item' src={TripleChickenImage} alt="Triple Chickens"/>
          <img className='Trade_Arrow' src={ArrowImage} alt="Arrow"/>
          <img className='Trade_Item' src={HenTradeImage} alt="Hen"/>
        </div>
      </button>
      <button className='TradeButton' onClick={() => handleTrade('hensToRooster')}>
        <div className='Trade'>
          <img className='Trade_Item' src={TripleHenImage} alt="Triple Hens"/>
          <img className='Trade_Arrow' src={ArrowImage} alt="Arrow"/>
          <img className='Trade_Item' src={RoosterImage} alt="Rooster"/>
        </div>
      </button>
    </div>
  );
};

export default TradeButtons;
