
import React from "react";

type ItemType = 'egg' | 'chicken' | 'hen';

const typeToImage: Record<ItemType, string> = {
  egg: "/others/EggTrade.png",
  chicken: "/others/ChickenTrade.png",
  hen: "/others/HenTrade.png",
};

const EarningsDisplay: React.FC<{ lastEarnings: { type: string; quantity: number }[] }> = ({ lastEarnings }) => {
    return (
        <div className="Block__Earnings">
            {lastEarnings.map((earning, index) => (
                <div key={index} className="Earnings__Item">
                    <p>+{earning.quantity}x</p>
                    <img className="Item__Picture" src={typeToImage[earning.type as ItemType]} alt={earning.type} />
                </div>
            ))}
        </div>
    );
};

export default EarningsDisplay;