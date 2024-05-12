import RoosterOwned1 from "../assets/rooster/RoosterOwned1.png";
import RoosterOwned0 from "../assets/rooster/RoosterOwned0.png";

const RoosterImage = ({ isOwned }: { isOwned: boolean }) => {
    const imageSrc = isOwned ? RoosterOwned1 : RoosterOwned0;
    return <img className="PlayerScreen__Rooster" src={imageSrc} alt="Rooster" />;
};

export default RoosterImage;
