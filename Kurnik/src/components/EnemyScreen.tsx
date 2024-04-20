import React from "react";
import RoosterImageEnemy from "./RoosterImageEnemy";
import GameContext from "../providers/GameContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import getHenImage from "./getHenImage";
import EnemyInventoryDisplay from "./EnemyInventoryDisplay";
import Dice from "./Dice";

const EnemyScreen: React.FC = () =>{
    const navigate = useNavigate();
    const { handleEnemyMove } = useContext(GameContext);
    const {enemyInventory } = useContext(GameContext);

    const handleEnemyTurn = () => {
      handleEnemyMove();
      navigate("/enemy-result");
    };
  
    return (
      <div className="PlayerScreen">
        <RoosterImageEnemy isOwned={enemyInventory.rooster} />
        <img className="EnemyScreen__HenHouse" src={getHenImage(enemyInventory.hens)} alt={`Hen Count: ${enemyInventory.hens}`} />
        <EnemyInventoryDisplay/>
        <div className="ResultScreen__Dices">
         <Dice value={1} />
         <Dice value={1} />
       </div>
       <button className="NextButt NextButt--Enemy" onClick={handleEnemyTurn}>
                  <img src="/others/arrow2.png"/>
                  <p>Next</p>
                  <img src="/others/arrow2.png"/>
        </button>
      </div>
    );
};

export default EnemyScreen;