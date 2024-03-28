import React, { useContext} from "react";
import GameContext from "../providers/GameContext";

const InventoryDisplay: React.FC = () => {
    const {playerInventory } = useContext(GameContext);

    return (
        <div>
            <h3>Inventory</h3>
            <p>Vejce: {playerInventory.eggs}</p>
            <p>Kuřata: {playerInventory.chickens}</p>
             <p>Slepice: {playerInventory.hens}</p>
             <p>Kohout: {playerInventory.rooster ? 'Ano' : 'Ne'}</p>
        </div>
    );
};

export default InventoryDisplay;