import React from "react";
import InventoryDisplay from "./InventoryDisplay";
import DiceRoller from "./DiceRoller";
import TradeButtons from "./TradeButtons";
import EnemyInventoryDisplay from "./EnemyInventoryDisplay";
import EnemyDiceDisplay from "./EnemyDiceDisplay";

const Game: React.FC = () => {
    return (
      <div>
        <h1>Farmářská hra</h1>
        <InventoryDisplay />
        <DiceRoller />
        <TradeButtons />
        <EnemyInventoryDisplay/>
        <EnemyDiceDisplay/>
      </div>
    );
  };
  
  export default Game;