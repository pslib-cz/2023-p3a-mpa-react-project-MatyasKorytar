import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../providers/GameContext";
import Dice from "./Dice";


const PlayerTradeResultScreen: React.FC = () => {
    const { playerInventory } = useContext(GameContext);
    const navigate = useNavigate();
    const {lastTrade} = useContext(GameContext);
  
    const handleNext = () => {
      navigate("/enemy-turn");
    };
  
    return (
      <div>
        <h2>Výsledek tahu hráče</h2>
        <p>Poslední obchod: {lastTrade}</p>
        <h3>Aktuální inventář:</h3>
        <p>Vejce: {playerInventory.eggs}</p>
        <p>Kuřata: {playerInventory.chickens}</p>
        <p>Slepice: {playerInventory.hens}</p>
        <p>Kohout: {playerInventory.rooster ? 'Ano' : 'Ne'}</p>
        <button onClick={handleNext}>Další</button>
      </div>
    );
  };
  
  export default PlayerTradeResultScreen;