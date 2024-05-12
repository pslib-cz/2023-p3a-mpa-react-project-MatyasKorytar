import React from "react";


import dice1 from "../assets/Dice/Dice1.png";
import dice2 from "../assets/Dice/Dice2.png";
import dice3 from "../assets/Dice/Dice3.png";
import dice4 from "../assets/Dice/Dice4.png";
import dice5 from "../assets/Dice/Dice5.png";
import dice6 from "../assets/Dice/Dice6.png";

interface DiceProps {
    value: number; 
}

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const Dice: React.FC<DiceProps> = ({ value }) => {

    const imageUrl = diceImages[value - 1];

    return <img src={imageUrl} className="DicePicture" alt={`Kostka s hodnotou ${value}`}/>
};

export default Dice;
