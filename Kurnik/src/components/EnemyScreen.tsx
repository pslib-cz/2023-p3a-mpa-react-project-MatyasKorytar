import React from "react";
import RoosterImageEnemy from "./RoosterImageEnemy";
import GameContext from "../providers/GameContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import getHenImage from "./getHenImage";
import EnemyInventoryDisplay from "./EnemyInventoryDisplay";
import Dice from "./Dice";

// Import obrázku šipky
import arrowImage from "../assets/others/arrow2.png";

const EnemyScreen: React.FC = () => {
    const navigate = useNavigate();
    const { handleEnemyMove } = useContext(GameContext);
    const { enemyInventory } = useContext(GameContext);

    const handleEnemyTurn = () => {
      handleEnemyMove();
      navigate("/enemy-result");
    };
  
    return (
      <><div className="PlayingStatus">
        <h1 className="PlayingStatus__Name">Enemy</h1>
      </div><div className="PlayerScreen">
          <RoosterImageEnemy isOwned={enemyInventory.rooster} />
          <img className="EnemyScreen__HenHouse" src={getHenImage(enemyInventory.hens)} alt={`Hen Count: ${enemyInventory.hens}`} />
          <EnemyInventoryDisplay />
          <div className="ResultScreen__Dices">
            <Dice value={1} />
            <Dice value={1} />
          </div>
          <button className="NextButt NextButt--Enemy" onClick={handleEnemyTurn}>
            <img src={arrowImage} alt="Next Arrow" />
            <p>Next</p>
            <img src={arrowImage} alt="Next Arrow" />
          </button>
        </div></>
    );
};

export default EnemyScreen;
