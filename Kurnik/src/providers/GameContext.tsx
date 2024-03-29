import React, { useState, createContext } from "react";

type InventoryItems = {
    eggs: number;
    chickens: number;
    hens: number;
    rooster: boolean;
}

type GameContextType = {
    playerInventory: InventoryItems;
    enemyInventory: InventoryItems;
    setPlayerInventory:  React.Dispatch<React.SetStateAction<InventoryItems>>;
    setEnemyInventory: React.Dispatch<React.SetStateAction<InventoryItems>>;
    handleTrade: (tradeType: string) => void;
    handleRoll: (diceValues: [number, number]) => void;
    handleEnemyMove: () => void;
    enemyDiceValues: [number, number]; // Přidání nové vlastnosti
    setEnemyDiceValues: React.Dispatch<React.SetStateAction<[number, number]>>; // Přidání setteru pro novou vlastnost
}

const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const[playerInventory, setPlayerInventory] = useState<InventoryItems>({eggs: 0, chickens: 0, hens: 0, rooster: false});
    const[enemyInventory, setEnemyInventory] = useState<InventoryItems>({eggs: 0, chickens: 0, hens: 0, rooster: false});
    
    const handleTrade = (tradeType: string) => {
        setPlayerInventory(prevInventory => {
            let newInventory = { ...prevInventory };
            switch (tradeType) {
                case 'eggsToChick':
                    if (prevInventory.eggs >= 3) {
                        newInventory.eggs -= 3;
                        newInventory.chickens += 1;
                    }
                    break;
                case 'chicksToHen':
                    if (prevInventory.chickens >= 3) {
                        newInventory.chickens -= 3;
                        newInventory.hens += 1;
                    }
                    break;
                case 'hensToRooster':
                    if (prevInventory.hens >= 3) {
                        newInventory.hens -= 3;
                        newInventory.rooster = true;
                    }
                    break;
                default:
                    // Neplatný typ obchodu
                    break;
            }
            return newInventory;
        });
    };
    
    const handleRoll = (diceValues: [number, number]) => {
        setPlayerInventory(prevInventory => {
            const [dice1, dice2] = diceValues;
            let newInventory = { ...prevInventory };
    
            // Kontrola, zda hodnoty na kostkách nejsou stejné
            if (dice1 === dice2) {
                // Speciální pravidla pro dvojice
                switch (dice1) {
                    case 1:
                        // Liška pokud není kohout
                        if (!newInventory.rooster) {
                            newInventory.hens = 0;
                        }
                        break;
                    case 2:
                        // Odevzdat kuře, pokud je dostupné
                        if (newInventory.chickens > 0) {
                            newInventory.chickens -= 1;
                            setEnemyInventory(enemy => ({ ...enemy, chickens: enemy.chickens + 1 }));
                        }
                        break;
                    case 3:
                        // Odevzdat slepici, pokud je dostupná
                        if (newInventory.hens > 0) {
                            newInventory.hens -= 1;
                            setEnemyInventory(enemy => ({ ...enemy, hens: enemy.hens + 1 }));
                        }
                        break;
                    case 4:
                        // Sníst všechna vejce
                        newInventory.eggs = 0;
                        break;
                    case 5:
                        // Ztrácí všechny slepice
                        newInventory.hens = 0;
                        break;
                    case 6:
                        // Liška pokud není kohout
                        if (!newInventory.rooster) {
                            newInventory.hens = 0;
                        }
                        break;
                }
                    } else {
                // Rozdělení odměn podle hodnoty na kostkách
                [dice1, dice2].forEach(dice => {
                    if (dice >= 1 && dice <= 3) {
                        newInventory.eggs += 1;
                    } else if (dice >=
                    4 && dice <= 5) {
                    newInventory.chickens += 1;
                    } else if (dice === 6) {
                    newInventory.hens += 1;
                    }
                    });
                    }
                    return newInventory;
                    });
                    };
        const [enemyDiceValues, setEnemyDiceValues] = useState<[number, number]>([1, 1]);


    const handleEnemyMove = () => {
        // Simulace hodu kostkou pro nepřítele
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        setEnemyDiceValues([dice1, dice2]);
    
        // Zde můžete použít logiku podobnou `handleRoll`, ale pro nepřítele (enemyInventory)
        // Například:
        if (dice1 === dice2) {
            // Implementujte speciální pravidla pro dvojice pro nepřítele
            // Podobně, jak je to implementováno pro hráče
        } else {
            // Rozdělení odměn podle hodnoty na kostkách pro nepřítele
            [dice1, dice2].forEach(dice => {
                if (dice >= 1 && dice <= 3) {
                    setEnemyInventory(prev => ({ ...prev, eggs: prev.eggs + 1 }));
                } else if (dice >= 4 && dice <= 5) {
                    setEnemyInventory(prev => ({ ...prev, chickens: prev.chickens + 1 }));
                } else if (dice === 6) {
                    setEnemyInventory(prev => ({ ...prev, hens: prev.hens + 1 }));
                }
            });
        }
    
        // Přidání logiky pro náhodné obchody může být také zajímavé
        // Můžete vytvořit náhodnou šanci, že nepřítel provede obchod
    };
                    


    return (
        <GameContext.Provider value={{
          playerInventory,
          enemyInventory,
          enemyDiceValues,
          setEnemyDiceValues,
          setPlayerInventory,
          setEnemyInventory,
          handleTrade,
          handleRoll,
          handleEnemyMove,
        }}>
          {children}
        </GameContext.Provider>
      );
    };
    
    export default GameContext;