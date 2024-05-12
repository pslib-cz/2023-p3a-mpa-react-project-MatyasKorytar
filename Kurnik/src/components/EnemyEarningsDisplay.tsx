import React, { useContext } from 'react';
import GameContext from '../providers/GameContext';

import eggImage from '../assets/others/EggTrade.png';
import chickenImage from '../assets/others/ChickenTrade.png';
import henImage from '../assets/others/HenTrade.png';

type ItemType = 'egg' | 'chicken' | 'hen';

const typeToImage: Record<ItemType, string> = {
  egg: eggImage,
  chicken: chickenImage,
  hen: henImage,
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
