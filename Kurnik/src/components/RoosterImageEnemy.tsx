import RoosterOwned1 from "../assets/rooster/RoosterOwned1.png";
import RoosterOwned0 from "../assets/rooster/RoosterOwned0.png";

const RoosterImageEnemy = ({ isOwned }: { isOwned: boolean }) => {
    const imageSrc = isOwned ? RoosterOwned1 : RoosterOwned0;
    return <img className="EnemyScreen__Rooster" src={imageSrc} alt="Rooster" />;
};

export default RoosterImageEnemy;
