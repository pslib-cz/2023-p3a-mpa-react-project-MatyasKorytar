import { useContext } from 'react';
import GameContext from '../providers/GameContext';

const EndPage = () => {
    const { playerInventory, enemyInventory} = useContext(GameContext);

    const winner = playerInventory.chickens >= 9 ? 'Player' : enemyInventory.chickens >= 9 ? 'Enemy' : null;

    return (
        <div>
            {winner ? (
                <h1>{winner} Wins!</h1>
            ) : (
                <h1>No winner yet!</h1>
            )}
        </div>
    );
};

export default EndPage;
