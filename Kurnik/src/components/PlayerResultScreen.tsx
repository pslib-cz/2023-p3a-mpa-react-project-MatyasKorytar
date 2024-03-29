import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../providers/GameContext";
import Dice from "./Dice";


const PlayerResultScreen: React.FC = () => {
    const { playerInventory, playerDiceValues } = useContext(GameContext);
    const navigate = useNavigate();
  
    const handleNext = () => {
      navigate("/enemy-turn");
    };
  
    return (
      <div>
        <h2>Výsledek tahu hráče</h2>
        <h3>Hody kostkou:</h3>
        <div>
          <Dice value={playerDiceValues[0]} />
          <Dice value={playerDiceValues[1]} />
        </div>
        {/* Zde můžete přidat další detaily o získaných předmětech */}
        <h3>Aktuální inventář:</h3>
        {/* Příklad zobrazení inventáře, můžete přizpůsobit podle potřeby */}
        <p>Vejce: {playerInventory.eggs}</p>
        <p>Kuřata: {playerInventory.chickens}</p>
        <p>Slepice: {playerInventory.hens}</p>
        <p>Kohout: {playerInventory.rooster ? 'Ano' : 'Ne'}</p>
        <button onClick={handleNext}>Další</button>
      </div>
    );
  };
  
  export default PlayerResultScreen;