import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../providers/GameContext";
import EnemyDiceDisplay from "./EnemyDiceDisplay";
import EnemyEarningsDisplay from "./EnemyEarningsDisplay";
import RoosterImageEnemy from "./RoosterImageEnemy";
import getHenImage from "./getHenImage";
import EnemyTradeResultDisplay from "./EnemyTradeResultDisplay";

import eggImage from "../assets/others/Egg.png";
import chickenImage from "../assets/others/Chicken.png";
import arrowImage from "../assets/others/arrow2.png";

const EnemyResultScreen: React.FC = () => {
    const { enemyInventory, diceEqualsMessage, lastEnemyTrade, enemyLastEarnings } = useContext(GameContext);
    const navigate = useNavigate();

    const handleNext = () => {
      if (enemyInventory.hens >= 9) {
          console.log("End?", enemyInventory.hens);
          navigate("/end-game");
      } else {
          console.log("Player?", enemyInventory.hens);
          navigate("/player-screen");
      }
  };

    return (
        <><div className="PlayingStatus">
            <h1 className="PlayingStatus__Name">Enemy</h1>
        </div><div className="PlayerResultScreen">
                <RoosterImageEnemy isOwned={enemyInventory.rooster} />
                <img className="EnemyScreen__HenHouse" src={getHenImage(enemyInventory.hens)} alt={`Hen Count: ${enemyInventory.hens}`} />
                <div className="ResultScreen__Dices">
                    <EnemyDiceDisplay />
                </div>
                <div>
                    {diceEqualsMessage &&
                        <div className="diceEqualsMessage">{diceEqualsMessage}</div>}
                </div>
                <div className="Block Block--Result Block--Enemy">
                    <div className="Block__Inventory">
                        <div className="Inventory__Item">
                            <p>{enemyInventory.eggs}x</p>
                            <img src={eggImage} alt="Eggs" />
                        </div>
                        <div className="Inventory__Item">
                            <p>{enemyInventory.chickens}x</p>
                            <img src={chickenImage} alt="Chickens" />
                        </div>
                    </div>
                    {!lastEnemyTrade && enemyLastEarnings && <EnemyEarningsDisplay />}
                    {lastEnemyTrade && <EnemyTradeResultDisplay />}

                    <button className="NextButt" onClick={handleNext}>
                        <img src={arrowImage} alt="Arrow" />
                        <p>Next</p>
                        <img src={arrowImage} alt="Arrow" />
                    </button>
                </div>
            </div></>
    );
};

export default EnemyResultScreen;
