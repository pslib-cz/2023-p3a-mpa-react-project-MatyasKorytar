import React from "react";


import eggImage from "../assets/others/EggTrade.png";
import chickenImage from "../assets/others/ChickenTrade.png";
import henImage from "../assets/others/HenTrade.png";

type ItemType = 'egg' | 'chicken' | 'hen';


const typeToImage: Record<ItemType, string> = {
  egg: eggImage,
  chicken: chickenImage,
  hen: henImage,
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
