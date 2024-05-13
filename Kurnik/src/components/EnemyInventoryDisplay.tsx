import React, { useContext } from "react";
import GameContext from "../providers/GameContext";

import eggImage from "../assets/others/Egg.png";
import chickenImage from "../assets/others/Chicken.png";

const EnemyInventoryDisplay: React.FC = () => {
    const { enemyInventory } = useContext(GameContext);

    return (
        <div className="Block Block--Enemy">
            <div className="Block__Inventory Block__Inventory--Enemy">
                <div className="Inventory__Item">
                    <p>{enemyInventory.eggs}x</p>
                    <img src={eggImage} alt="Eggs"/>
                </div>
                <div className="Inventory__Item">
                    <p>{enemyInventory.chickens}x</p>
                    <img src={chickenImage} alt="Chickens"/>
                </div>
            </div>
        </div>
    );
}

export default EnemyInventoryDisplay;
