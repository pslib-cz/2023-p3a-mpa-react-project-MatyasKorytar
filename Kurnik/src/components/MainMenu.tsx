import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <div className='Menu'>
      <Link className='Menu__Button' to="/player-screen">Play</Link>
      <Link className='Menu__Button' to="/rules">Rules</Link>
    </div>
  );
}

export default MainMenu;
