import React from "react";
import InventoryDisplay from "./InventoryDisplay";
import DiceRoller from "./DiceRoller";
import TradeButtons from "./TradeButtons";

const Game: React.FC = () => {
    return (
      <div>
        <h1>Farmářská hra</h1>
        <InventoryDisplay />
        <DiceRoller />
        <TradeButtons />
        {/* Zde můžete přidat další komponenty jako je zobrazení inventáře nepřítele atd. */}
      </div>
    );
  };
  
  export default Game;