import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../providers/GameContext";
import EnemyDiceDisplay from "./EnemyDiceDisplay";

const EnemyResultScreen: React.FC = () => {
    const { enemyInventory } = useContext(GameContext);
    const navigate = useNavigate();
  
    const handleNext = () => {
      navigate("/"); // Přesměruje zpět na tah hráče
    };
  
    return (
      <div>
        <h2>Výsledek tahu nepřítele</h2>
        <EnemyDiceDisplay/>
        {/* Zde můžete přidat detaily o akcích nepřítele a výsledcích */}
        <h3>Aktuální inventář nepřítele:</h3>
        {/* Příklad zobrazení inventáře nepřítele */}
        <p>Vejce: {enemyInventory.eggs}</p>
        <p>Kuřata: {enemyInventory.chickens}</p>
        <p>Slepice: {enemyInventory.hens}</p>
        <p>Kohout: {enemyInventory.rooster ? 'Ano' : 'Ne'}</p>
        <button onClick={handleNext}>Další</button>
      </div>
    );
};

export default EnemyResultScreen;