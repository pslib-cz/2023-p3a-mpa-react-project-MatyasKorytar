import React, { useContext, useState } from 'react';
import GameContext from '../providers/GameContext';
import Dice from './Dice';

const DiceRoller: React.FC = () => {
    const { handleRoll } = useContext(GameContext);
    const { handleEnemyMove } = useContext(GameContext);
    const [diceValues, setDiceValues] = useState<[number, number]>([1, 1]);

  
    const roll = () => {
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      handleRoll([dice1, dice2]);
      setDiceValues([dice1, dice2]);
    };
  
    return (
      <>
      <button onClick={roll}>Hodit kostkami</button>
      <div>
        <Dice value={diceValues[0]} />
        <Dice value={diceValues[1]} />
      </div>
      <button onClick={handleEnemyMove}>Enemy Move</button>
      </>
    );
  };
  
  export default DiceRoller;