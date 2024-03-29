import React, { useContext } from "react";
import GameContext from "../providers/GameContext";
import DiceRoller from "./DiceRoller";
import InventoryDisplay from "./InventoryDisplay";
import TradeButtons from "./TradeButtons";

const PlayerScreen: React.FC = () =>{


    return (
        <div>
            <h2>Player</h2>
            <InventoryDisplay/>
            <DiceRoller/>
            <TradeButtons/>
        </div>
    )
};

export default PlayerScreen;