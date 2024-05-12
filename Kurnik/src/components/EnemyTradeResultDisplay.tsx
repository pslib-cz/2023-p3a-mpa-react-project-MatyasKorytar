import { useContext } from "react";
import GameContext from "../providers/GameContext";

// Import obrázků
import eggTradeImage from "../assets/others/EggTrade.png";
import chickenTradeImage from "../assets/others/ChickenTrade.png";
import henTradeImage from "../assets/others/HenTrade.png";
import roosterImage from "../assets/others/Rooster.png";

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
        lost: { quantity: -3, image: eggTradeImage },
        gained: { quantity: 1, image: chickenTradeImage },
      },
      Chickens: {
        lost: { quantity: -3, image: chickenTradeImage },
        gained: { quantity: 1, image: henTradeImage },
      },
      Hens: {
        lost: { quantity: -3, image: henTradeImage },
        gained: { quantity: 1, image: roosterImage },
      },
      X: {
        lost: { quantity: 0, image: "" },
        gained: { quantity: 0, image: "" },
      },
    };

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

export default EnemyTradeResultDisplay;
