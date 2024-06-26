import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';
import Dice from './Dice';
import { useNavigate } from 'react-router-dom';

const DiceRoller: React.FC = () => {
    const { playerDiceValues, handleRoll } = useContext(GameContext);
    const navigate = useNavigate();

    const roll = () => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        handleRoll([dice1, dice2]); 
        navigate("/player-result");
    };

    return (
        <>
            <button className='Dices' onClick={roll}>
                <div className='Dices__div'>
                    <Dice value={playerDiceValues[0]} />
                    <Dice value={playerDiceValues[1]} />
                </div>
            </button>
        </>
    );
};

export default DiceRoller;
