const RoosterImageEnemy = ({ isOwned }: { isOwned: boolean }) => {
    const imagePath = isOwned ? 'RoosterOwned1.png' : 'RoosterOwned0.png';
    return <img className="EnemyScreen__Rooster" src={`/rooster/${imagePath}`} alt="Rooster" />;
  };

  export default RoosterImageEnemy;