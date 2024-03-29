import React from "react";

interface DiceProps {
    value: number; // Definice typu pro 'value' jako number
  }


const Dice: React.FC<DiceProps> = ({ value }) => {
    const imageUrl = `public/dice${value}.png`

    return <img src={imageUrl} alt={`Kostka s hodnotou ${value}`}/>
};

export default Dice;