import React, { useContext} from "react";
import GameContext from "../providers/GameContext";

const EnemyInventoryDisplay: React.FC = () => {
    const { enemyInventory } = useContext(GameContext);
  
    return (
      <div>
        <h3>Nepřítelův Inventář</h3>
        <p>Vejce: {enemyInventory.eggs}</p>
        <p>Kuřata: {enemyInventory.chickens}</p>
        <p>Slepice: {enemyInventory.hens}</p>
        <p>Kohout: {enemyInventory.rooster ? 'Ano' : 'Ne'}</p>
      </div>
    );
  };
  
  export default EnemyInventoryDisplay;

  