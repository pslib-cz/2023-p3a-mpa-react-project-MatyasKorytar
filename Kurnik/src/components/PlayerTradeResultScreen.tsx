import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GameContext from "../providers/GameContext";
import RoosterImage from "./RoosterImage";
import getHenImage from "./getHenImage";
import Dice from "./Dice";


const PlayerTradeResultScreen: React.FC = () => {
  const { playerInventory, playerDiceValues, lastTrade } = useContext(GameContext);
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/enemy-turn");
  };

  return (
    <div className="PlayerResultScreen">
      <RoosterImage isOwned={playerInventory.rooster} />
      <img className="PlayerScreen__HenHouse" src={getHenImage(playerInventory.hens)} alt={`Hen Count: ${playerInventory.hens}`} />
      <div className="ResultScreen__Dices">
        <Dice value={playerDiceValues[0]} />
        <Dice value={playerDiceValues[1]} />
      </div>
      <div className="Block Block--Result">
              <div className="Block__Earnings">
                  <p>{lastTrade}</p>
              </div>


          <div className="Block__Inventory">
              <div className="Inventory__Item">
                  <p>{playerInventory.eggs}x</p>
                  <img src="/others/Egg.png"/>
              </div>
              <div className="Inventory__Item">
                  <p>{playerInventory.chickens}x</p>
                  <img src="/others/Chicken.png"/>
              </div>
           </div>     
        
          <button className="NextButt" onClick={handleNext}>
                  <img src="/others/arrow2.png"/>
                  <p>Next</p>
                  <img src="/others/arrow2.png"/>
          </button>
      </div>
    </div>
  );
};
  export default PlayerTradeResultScreen;