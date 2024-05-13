import React, { useContext } from "react";
import GameContext from "../providers/GameContext";
import DiceRoller from "./DiceRoller";
import InventoryDisplay from "./InventoryDisplay";
import "../PlayerScreen.css";
import getHenImage from "./getHenImage";
import RoosterImage from "./RoosterImage";


const PlayerScreen: React.FC = () =>{
    const {playerInventory } = useContext(GameContext);

    return (
        <><div className="PlayingStatus">
            <h1 className="PlayingStatus__Name">Player</h1>
        </div><div className="PlayerScreen">
                <RoosterImage isOwned={playerInventory.rooster} />
                <img className="PlayerScreen__HenHouse" src={getHenImage(playerInventory.hens)} alt={`Hen Count: ${playerInventory.hens}`} />
                <DiceRoller />
                <InventoryDisplay />
            </div></>
    )
};

export default PlayerScreen;