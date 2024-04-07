import { useContext } from "react";
import GameContext from "../providers/GameContext";

type TradeType = "Eggs" | "Chickens" | "Hens" | "X"; // Definujeme omezenou množinu klíčů

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
      X: { // Přidáme výchozí prázdný objekt pro neznámý obchod
        lost: { quantity: 0, image: "" },
        gained: { quantity: 0, image: "" },
      },
    };
    
  
    // Získání detailů obchodu na základě popisu
    const details = tradeDetails[lastTrade as TradeType];

    return (
      <div className="Block__Earnings">
        <div className="Earnings__Item">
          <span>{details.lost.quantity}x</span>
          <img className="Item__Picture" src={details.lost.image} alt="Lost" />
        </div>
        <div className="Earnings__Item"> 
          <span>{details.gained.quantity}x</span>
          <img className="Item__Picture" src={details.gained.image} alt="Gained" />
        </div>
      </div>
    );
  };
  
  export default TradeResultDisplay;