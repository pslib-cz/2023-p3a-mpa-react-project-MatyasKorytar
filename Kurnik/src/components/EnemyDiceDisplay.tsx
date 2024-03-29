import { useContext } from "react";
import React from "react";
import Dice from "./Dice";
import GameContext from "../providers/GameContext";

const EnemyDiceDisplay: React.FC = () => {
    const {enemyDiceValues} = useContext(GameContext);

    return (
        <div>
            <Dice value={enemyDiceValues[0]} />
            <Dice value={enemyDiceValues[1]} />
        </div>
    )
};

export default EnemyDiceDisplay;