import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';

const TradeButtons: React.FC = () => {
  const { handleTrade } = useContext(GameContext);

  return (
    <div className='TradeFlex'>
      <button className='TradeButton' onClick={() => handleTrade('eggsToChick')}>
        <div className='Trade'>
          <img className='Trade_Item' src='/others/TripleEggs.png'/>
          <img className='Trade_Arrow' src='/others/arrow.png'/>
          <img className='Trade_Item' src='/others/ChickenTrade.png'/>  
        </div>
      </button>
      <button className='TradeButton' onClick={() => handleTrade('chicksToHen')}>
        <div className='Trade'>
          <img className='Trade_Item' src='/others/TripleChicken.png'/>
          <img className='Trade_Arrow' src='/others/arrow.png'/>
          <img className='Trade_Item' src='/others/HenTrade.png'/>
        </div>
      </button>
      <button className='TradeButton' onClick={() => handleTrade('hensToRooster')}>
        <div className='Trade'>
          <img className='Trade_Item' src='/others/TripleHen.png'/>
          <img className='Trade_Arrow' src='/others/arrow.png'/>
          <img className='Trade_Item' src='/others/Rooster.png'/>
        </div>
      </button>
    </div>
  );
};

export default TradeButtons;