import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../providers/GameContext";
import EnemyDiceDisplay from "./EnemyDiceDisplay";
import EnemyEarningsDisplay from "./EnemyEarningsDisplay";
import RoosterImageEnemy from "./RoosterImageEnemy";
import getHenImage from "./getHenImage";


const EnemyResultScreen: React.FC = () => {
    const { enemyInventory, diceEqualsMessage  } = useContext(GameContext);
    const navigate = useNavigate();
  
    const handleNext = () => {
      navigate("/"); // Přesměruje zpět na tah hráče
    };
  
    return (
      <div className="PlayerResultScreen">
      <RoosterImageEnemy isOwned={enemyInventory.rooster} />
      <img className="EnemyScreen__HenHouse" src={getHenImage(enemyInventory.hens)} alt={`Hen Count: ${enemyInventory.hens}`} />
      <div className="ResultScreen__Dices">
        <EnemyDiceDisplay/>
      </div>
      <div>
      {diceEqualsMessage && 
     <div className="diceEqualsMessage">{diceEqualsMessage}</div>}
      </div>
      <div className="Block Block--Result Block--Enemy">


          <div className="Block__Inventory">
              <div className="Inventory__Item">
                  <p>{enemyInventory.eggs}x</p>
                  <img src="/others/Egg.png"/>
              </div>
              <div className="Inventory__Item">
                  <p>{enemyInventory.chickens}x</p>
                  <img src="/others/Chicken.png"/>
              </div>
           </div>   

           <EnemyEarningsDisplay/>
        
          <button className="NextButt" onClick={handleNext}>
                  <img src="/others/arrow2.png"/>
                  <p>Next</p>
                  <img src="/others/arrow2.png"/>
          </button>
      </div>
    </div>
    );
};

export default EnemyResultScreen;