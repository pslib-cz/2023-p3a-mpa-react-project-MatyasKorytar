import React from "react";

interface DiceProps {
    value: number; 
  }


const Dice: React.FC<DiceProps> = ({ value }) => {
    const imageUrl = `public/Dice/dice${value}.png`

    return <img src={imageUrl} className="DicePicture" alt={`Kostka s hodnotou ${value}`}/>
};

export default Dice;