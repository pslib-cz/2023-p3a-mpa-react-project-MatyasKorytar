import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';

type ItemType = 'egg' | 'chicken' | 'hen';

const typeToImage: Record<ItemType, string> = {
  egg: "/others/EggTrade.png",
  chicken: "/others/ChickenTrade.png",
  hen: "/others/HenTrade.png",
};

const EnemyEarningsDisplay: React.FC = () => {
    const { enemyLastEarnings } = useContext(GameContext);
    console.log(enemyLastEarnings);
    return (
        <div className="Block__Earnings">
            {enemyLastEarnings.map((earning, index) => (
                <div key={index} className="Earnings__Item Earnings__Item--Enemy">
                    <p>+{earning.quantity}x</p>
                    <img className="Item__Picture" src={typeToImage[earning.type as ItemType]} alt={earning.type} />
                </div>

            ))}
        </div>
    );
};

export default EnemyEarningsDisplay;
