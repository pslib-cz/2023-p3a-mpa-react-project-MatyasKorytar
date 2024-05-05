import { useContext } from "react";
import GameContext from "../providers/GameContext";

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

const EnemyTradeResultDisplay = () => {
    const { lastEnemyTrade } = useContext(GameContext);

    const tradeDetails: Record<TradeType, TradeDetails> = {
      Eggs: {
        lost: { quantity: -3, image: "/others/EggTrade.png" },
        gained: { quantity: 1, image: "/others/ChickenTrade.png" },
      },
      Chickens: {
        lost: { quantity: -3, image: "/others/ChickenTrade.png" },
        gained: { quantity: 1, image: "/others/HenTrade.png" },
      },
      Hens: {
        lost: { quantity: -3, image: "/others/HenTrade.png" },
        gained: { quantity: 1, image: "/others/Rooster.png" },
      },
      X: { 
        lost: { quantity: 0, image: "" },
        gained: { quantity: 0, image: "" },
      },
    };

    // Ensure a valid trade type is used, defaulting to "X" if not found
    const details = tradeDetails[lastEnemyTrade as TradeType || "X"];

    return (
      <div className="Block__Earnings">
        <div className="Earnings__Item Earnings__Item--Enemy">
          <span>{details.lost.quantity}x</span>
          <img className="Item__Picture" src={details.lost.image} alt="Items lost in trade" />
        </div>
        <div className="Earnings__Item Earnings__Item--Enemy">
          <span>{details.gained.quantity}x</span>
          <img className="Item__Picture" src={details.gained.image} alt="Items gained in trade" />
        </div>
      </div>
    );
};

export default EnemyTradeResultDisplay
