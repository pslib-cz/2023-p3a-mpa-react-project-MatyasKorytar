import { useContext } from "react";
import GameContext from "../providers/GameContext";


import EggTradeImage from "../assets/others/EggTrade.png";
import ChickenTradeImage from "../assets/others/ChickenTrade.png";
import HenTradeImage from "../assets/others/HenTrade.png";
import RoosterImage from "../assets/others/Rooster.png";

type TradeType = "Eggs" | "Chickens" | "Hens" | "X"; 

interface TradeDetails {
  lost: {
    quantity: number;
    image: string;
  };
  gained: {
    quantity: number;
    image: string;
  };
}

const TradeResultDisplay = () => {
    const { lastTrade } = useContext(GameContext);
  
    const tradeDetails: Record<TradeType, TradeDetails> = {
      Eggs: {
        lost: { quantity: -3, image: EggTradeImage },
        gained: { quantity: 1, image: ChickenTradeImage },
      },
      Chickens: {
        lost: { quantity: -3, image: ChickenTradeImage },
        gained: { quantity: 1, image: HenTradeImage },
      },
      Hens: {
        lost: { quantity: -3, image: HenTradeImage },
        gained: { quantity: 1, image: RoosterImage },
      },
      X: { 
        lost: { quantity: 0, image: "" },  
        gained: { quantity: 0, image: "" },
      },
    };
    
   
    const details = tradeDetails[lastTrade as TradeType || "X"];

    return (
      <div className="Block__Earnings">
        <div className="Earnings__Item">
          <span>{details.lost.quantity}x</span>
          <img className="Item__Picture" src={details.lost.image} alt="Items lost in trade" />
        </div>
        <div className="Earnings__Item"> 
          <span>{details.gained.quantity}x</span>
          <img className="Item__Picture" src={details.gained.image} alt="Items gained in trade" />
        </div>
      </div>
    );
};

export default TradeResultDisplay;
