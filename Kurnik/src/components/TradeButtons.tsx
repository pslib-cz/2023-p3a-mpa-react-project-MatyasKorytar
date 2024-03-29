import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';
import { useNavigate } from 'react-router-dom';

const TradeButtons: React.FC = () => {
  const { handleTrade } = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => handleTrade('eggsToChick')}>Vyměnit 3 vejce za kuře</button>
      <button onClick={() => handleTrade('chicksToHen')}>Vyměnit 3 kuřata za slepici</button>
      <button onClick={() => handleTrade('hensToRooster')}>Vyměnit 3 slepice za kohouta</button>
    </div>
  );
};

export default TradeButtons;