import React, { useContext, useState } from 'react';
import GameContext from '../providers/GameContext';
import Dice from './Dice';
import { useNavigate } from 'react-router-dom';

const DiceRoller: React.FC = () => {
    const { handleRoll } = useContext(GameContext);
    const [diceValues, setDiceValues] = useState<[number, number]>([1, 1]);
    const navigate = useNavigate();


  
    const roll = () => {
      
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      handleRoll([dice1, dice2]);
      setDiceValues([dice1, dice2]);
      navigate("/player-result");
    };
  
    return (
      <>
      <button onClick={roll}>Hodit kostkami</button>
      <div>
        <Dice value={diceValues[0]} />
        <Dice value={diceValues[1]} />
      </div>
      </>
    );
  };
  
  export default DiceRoller;