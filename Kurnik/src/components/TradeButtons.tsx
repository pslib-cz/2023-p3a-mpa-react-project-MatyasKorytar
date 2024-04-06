import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';
import { useNavigate } from 'react-router-dom';

const TradeButtons: React.FC = () => {
  const { handleTrade } = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <div className='TradeFlex'>
      <button className='TradeButton' onClick={() => handleTrade('eggsToChick')}>
        <div className='Trade'>
          <img className='Trade_Item' src='/others/Triple_Eggs.png'/>
          <img className='Trade_Arrow' src='/others/arrow.png'/>
          <img className='Trade_Item' src='/others/Chicken_Transparent.png'/>  
        </div>
      </button>
      <button className='TradeButton' onClick={() => handleTrade('chicksToHen')}>
        <div className='Trade'>
          <img className='Trade_Item' src='/others/Triple_Chickens.png'/>
          <img className='Trade_Arrow' src='/others/arrow.png'/>
          <img className='Trade_Item' src='/others/Hen_Transparent.png'/>
        </div>
      </button>
      <button className='TradeButton' onClick={() => handleTrade('hensToRooster')}>
        <div className='Trade'>
          <img className='Trade_Item' src='/others/Triple_Hen.png'/>
          <img className='Trade_Arrow' src='/others/arrow.png'/>
          <img className='Trade_Item' src='/others/Rooster_Transparent.png'/>
        </div>
      </button>
    </div>
  );
};

export default TradeButtons;