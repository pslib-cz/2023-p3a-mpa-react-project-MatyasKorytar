import React, { useContext } from "react";
import GameContext from "../providers/GameContext";
import Dice from "./Dice";
import RoosterImage from "./RoosterImage";
import getHenImage from "./getHenImage";
import EarningsDisplay from "./EarningsDisplay";
import TradeResultDisplay from "./TradeResultDisplay";

import eggImage from "../assets/others/Egg.png";
import chickenImage from "../assets/others/Chicken.png";
import arrowImage from "../assets/others/arrow2.png";

const PlayerResultScreen: React.FC = () => {
    const { diceEqualsMessage, playerInventory, playerDiceValues, lastEarnings, lastTrade, handleNext } = useContext(GameContext);

    return (
      <><div className="PlayingStatus">
        <h1 className="PlayingStatus__Name">Player</h1>
      </div><div className="PlayerResultScreen">
          <RoosterImage isOwned={playerInventory.rooster} />
          <img className="PlayerScreen__HenHouse" src={getHenImage(playerInventory.hens)} alt={`Hen Count: ${playerInventory.hens}`} />
          <div className="ResultScreen__Dices">
            <Dice value={playerDiceValues[0]} />
            <Dice value={playerDiceValues[1]} />
          </div>
          <div>
            {diceEqualsMessage && !lastTrade &&
              <div className="diceEqualsMessage">{diceEqualsMessage}</div>}
          </div>
          <div className="Block Block--Result">
            <div className="Block__Inventory">
              <div className="Inventory__Item">
                <p>{playerInventory.eggs}x</p>
                <img src={eggImage} alt="Eggs" />
              </div>
              <div className="Inventory__Item">
                <p>{playerInventory.chickens}x</p>
                <img src={chickenImage} alt="Chickens" />
              </div>
            </div>

            {lastEarnings.length > 0 && <EarningsDisplay lastEarnings={lastEarnings} />}
            {lastTrade && <TradeResultDisplay />}
            <button className="NextButt" onClick={handleNext}>
              <img src={arrowImage} alt="Next Arrow" />
              <p>Next</p>
              <img src={arrowImage} alt="Next Arrow" />
            </button>
          </div>
        </div></>
    );
  };
  
export default PlayerResultScreen;
