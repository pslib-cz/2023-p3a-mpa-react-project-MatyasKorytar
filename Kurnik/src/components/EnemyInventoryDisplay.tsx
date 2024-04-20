import React, { useContext} from "react";
import GameContext from "../providers/GameContext";

const EnemyInventoryDisplay: React.FC = () => {
    const { enemyInventory } = useContext(GameContext);

     return (
          <div className="Block">
              <div className="Block__Inventory Block__Inventory--Enemy">
                  <div className="Inventory__Item">
                      <p>{enemyInventory.eggs}x</p>
                      <img src="/others/Egg.png"/>
                  </div>
                  <div className="Inventory__Item">
                      <p>{enemyInventory.chickens}x</p>
                      <img src="/others/Chicken.png"/>
              </div>
              </div>
          </div>
      );

}
  export default EnemyInventoryDisplay;

  