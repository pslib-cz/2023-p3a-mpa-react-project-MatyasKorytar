import React, { useContext } from "react";
import GameContext from "../providers/GameContext";
import TradeButtons from "./TradeButtons";

import eggImage from "../assets/others/Egg.png";
import chickenImage from "../assets/others/Chicken.png";

const InventoryDisplay: React.FC = () => {
    const { playerInventory } = useContext(GameContext);

    return (
        <div className="Block">
            <div className="Block__Inventory">
                <div className="Inventory__Item">
                    <p>{playerInventory.eggs}x</p>
                    <img src={eggImage} alt="Eggs"/>
                </div>
                <div className="Inventory__Item">
                    <p>{playerInventory.chickens}x</p>
                    <img src={chickenImage} alt="Chickens"/>
                </div>
            </div>
            <div className="Block__Trading">
                <TradeButtons/>
            </div>
        </div>
    );
};

export default InventoryDisplay;
