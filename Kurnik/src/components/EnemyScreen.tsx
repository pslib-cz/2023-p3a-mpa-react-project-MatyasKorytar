import React from "react";
import GameContext from "../providers/GameContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const EnemyScreen: React.FC = () =>{
    const navigate = useNavigate();
    const { handleEnemyMove } = useContext(GameContext);

    const handleEnemyTurn = () => {
      handleEnemyMove();
      navigate("/enemy-result");
    };
  
    return (
      <div>
        <h2>Tah Nepřítele</h2>
        <button onClick={handleEnemyTurn}>Ukázat výsledek nepřítele</button>
      </div>
    );
};

export default EnemyScreen;