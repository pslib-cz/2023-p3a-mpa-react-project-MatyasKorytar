const RoosterImage = ({ isOwned }: { isOwned: boolean }) => {
    const imagePath = isOwned ? 'RoosterOwned1.png' : 'RoosterOwned0.png';
    return <img className="PlayerScreen__Rooster" src={`/rooster/${imagePath}`} alt="Rooster" />;
  };

  export default RoosterImage;