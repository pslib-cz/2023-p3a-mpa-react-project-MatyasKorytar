import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';

const DiceRoller: React.FC = () => {
    const { handleRoll } = useContext(GameContext);
  
    const roll = () => {
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      handleRoll([dice1, dice2]);
    };
  
    return (
      <button onClick={roll}>Hodit kostkami</button>
    );
  };
  
  export default DiceRoller;