import { useContext } from 'react';
import GameContext from '../providers/GameContext';
import { useNavigate } from 'react-router-dom';

const EndPage = () => {
    const { playerInventory, enemyInventory } = useContext(GameContext);

    const winner = playerInventory.hens >= 9 ? 'Player' : enemyInventory.hens >= 9 ? 'Enemy' : null;
    const navigate = useNavigate();

    const handleReset = () => {
        navigate("/");
        window.location.reload();
    };


    const winnerClass = winner === 'Player' ? 'Winner--Player' : 'Winner--Enemy';

    return (
        <div>
            {winner ? (
                <h1 className={`Winner ${winnerClass}`}>{winner} Wins!</h1>
            ) : (
                <h1 className='Winner Winner--NoWinner'>No winner yet!</h1>
            )}
            <button className='Menu__Button Menu__Button--End' onClick={handleReset}>Try again!</button>
        </div>
    );
};

export default EndPage;
