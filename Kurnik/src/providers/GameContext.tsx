import React, { useState, useReducer, createContext } from "react";
import { useNavigate } from "react-router-dom";

type InventoryItems = {
    eggs: number;
    chickens: number;
    hens: number;
    rooster: boolean;
}

interface GameState {
    playerInventory: InventoryItems;
    enemyInventory: InventoryItems;
    playerDiceValues: [number, number];
    enemyDiceValues: [number, number];
    lastTrade: string | null;
    lastEarnings: { type: string; quantity: number }[]; 
    enemyLastEarnings: { type: string; quantity: number }[]; 
  }

  type ActionType =
  | { type: 'SET_LAST_TRADE'; payload: string | null }
  | { type: 'HANDLE_TRADE'; payload: { tradeType: string } }
  | { type: 'HANDLE_ROLL'; payload: [number, number] }
  | { type: 'HANDLE_ENEMY_MOVE'; payload: [number, number] } // Přidané payload pro HANDLE_ENEMY_MOVE
  | { type: 'UPDATE_ENEMY_EARNINGS'; payload: { type: string; quantity: number }[] } // Ujasnění typu payload
  | { type: 'SET_PLAYER_INVENTORY'; payload: InventoryItems }
  | { type: 'SET_ENEMY_INVENTORY'; payload: InventoryItems }
  | { type: 'SET_PLAYER_DICE_VALUES'; payload: [number, number] }
  | { type: 'SET_ENEMY_DICE_VALUES'; payload: [number, number] }
  | { type: 'RESET_LAST_EARNINGS' }
  | { type: 'RESET_LAST_TRADE' }
  | { type: 'RESET_ENEMY_EARNINGS' };



  type GameContextType = {
    playerInventory: InventoryItems;
    lastTrade: string | null;
    enemyInventory: InventoryItems;
    playerDiceValues: [number, number];
    enemyDiceValues: [number, number];
    handleTrade: (tradeType: string) => void;
    handleRoll: (diceValues: [number, number]) => void;
    handleEnemyMove: () => void;
    handleNext: () => void;
    setLastTrade: (lastTrade: string | null) => void;
    lastEarnings: { type: string; quantity: number }[]; 
    enemyLastEarnings: { type: string; quantity: number }[];
};

export const GameContext = createContext<GameContextType>({} as GameContextType);

const initialState: GameState = {
    playerInventory: { eggs: 0, chickens: 0, hens: 0, rooster: false },
    enemyInventory: { eggs: 0, chickens: 0, hens: 0, rooster: false },
    playerDiceValues: [1, 1],
    enemyDiceValues: [1, 1],
    lastTrade: null,
    lastEarnings: [], 
    enemyLastEarnings: [],
  };

  function calculateEnemyEarnings(dice1: number, dice2: number): { type: string; quantity: number }[] {
    let earnings = [];
    // Přidání logiky pro výpočet zisků na základě hodnot kostek
    if (dice1 <= 3) earnings.push({ type: 'egg', quantity: 1 });
    if (dice1 >= 4 && dice1 <= 5) earnings.push({ type: 'chicken', quantity: 1 });
    if (dice1 === 6) earnings.push({ type: 'hen', quantity: 1 });

    if (dice2 <= 3) earnings.push({ type: 'egg', quantity: 1 });
    if (dice2 >= 4 && dice2 <= 5) earnings.push({ type: 'chicken', quantity: 1 });
    if (dice2 === 6) earnings.push({ type: 'hen', quantity: 1 });

    return earnings;
}
  
function gameReducer(state: GameState, action: ActionType): GameState {
    switch (action.type) {
        case 'RESET_LAST_EARNINGS':
            return { ...state, lastEarnings: [] };
        case 'RESET_LAST_TRADE':
            return { ...state, lastTrade: null };
        case 'SET_LAST_TRADE':
            return { ...state, lastTrade: action.payload };

        case 'RESET_ENEMY_EARNINGS':
                return { ...state, enemyLastEarnings: [] };
        case 'UPDATE_ENEMY_EARNINGS':
                return { ...state, enemyLastEarnings: action.payload };

        case 'HANDLE_TRADE':
            let tradeDescription = '';
            let newPlayerInventory = { ...state.playerInventory };
            switch (action.payload.tradeType) {
                case 'eggsToChick':
                    if (newPlayerInventory.eggs >= 3) {
                        newPlayerInventory.eggs -= 3;
                        newPlayerInventory.chickens += 1;
                        tradeDescription = 'Eggs';
                    }
                    break;
                case 'chicksToHen':
                    if (newPlayerInventory.chickens >= 3) {
                        newPlayerInventory.chickens -= 3;
                        newPlayerInventory.hens += 1;
                        tradeDescription = 'Chickens';
                    }
                    break;
                case 'hensToRooster':
                    if (newPlayerInventory.hens >= 3) {
                        newPlayerInventory.hens -= 3;
                        newPlayerInventory.rooster = true;
                        tradeDescription = 'Hens';
                    }
                    break;
                default:
                    tradeDescription = 'X';
                    break;
            }
            return { ...state, playerInventory: newPlayerInventory, lastTrade: tradeDescription };

            case 'HANDLE_ROLL':
                const [dice1, dice2] = action.payload;
                let updatedPlayerInventory = { ...state.playerInventory };
                let updatedEnemyInventory = { ...state.enemyInventory };
                let lastEarnings = []; // Resetování získaných položek
                if (dice1 === dice2) {
                    switch (dice1) {
                        case 1:
                            // Liška: pokud není kohout, ztratí všechny slepice
                            if (!updatedPlayerInventory.rooster) {
                                updatedPlayerInventory.hens = 0;
                            }
                            break;
                        case 2:
                            // Odevzdat kuře, pokud je dostupné
                            if (updatedPlayerInventory.chickens > 0) {
                                updatedPlayerInventory.chickens -= 1;
                                updatedEnemyInventory.chickens += 1;
                            }
                            break;
                        case 3:
                            // Odevzdat slepici, pokud je dostupná
                            if (updatedPlayerInventory.hens > 0) {
                                updatedPlayerInventory.hens -= 1;
                                updatedEnemyInventory.hens += 1;
                            }
                            break;
                        case 4:
                            // Sníst všechna vejce
                            updatedPlayerInventory.eggs = 0;
                            break;
                        case 5:
                            // Ztrácí všechny slepice
                            updatedPlayerInventory.hens = 0;
                            break;
                        case 6:
                            // Liška: pokud není kohout, ztratí všechny slepice
                            if (!updatedPlayerInventory.rooster) {
                                updatedPlayerInventory.hens = 0;
                            }
                            break;
                    }
                } else {
                    updatedPlayerInventory.eggs += dice1 <= 3 ? 1 : 0;
                    updatedPlayerInventory.chickens += dice1 >= 4 && dice1 <= 5 ? 1 : 0;
                    updatedPlayerInventory.hens += dice1 === 6 ? 1 : 0;
            
                    updatedPlayerInventory.eggs += dice2 <= 3 ? 1 : 0;
                    updatedPlayerInventory.chickens += dice2 >= 4 && dice2 <= 5 ? 1 : 0;
                    updatedPlayerInventory.hens += dice2 === 6 ? 1 : 0;
                }

                if (dice1 <= 3) {
                    lastEarnings.push({ type: 'egg', quantity: 1 });
                  }
                  if (dice1 >= 4 && dice1 <= 5) {
                    lastEarnings.push({ type: 'chicken', quantity: 1 });
                  }
                  if (dice1 === 6) {
                    lastEarnings.push({ type: 'hen', quantity: 1 });
                  }
                  if (dice2 <= 3) {
                    lastEarnings.push({ type: 'egg', quantity: 1 });
                  }
                  if (dice2 >= 4 && dice2 <= 5) {
                    lastEarnings.push({ type: 'chicken', quantity: 1 });
                  }
                  if (dice2 === 6) {
                    lastEarnings.push({ type: 'hen', quantity: 1 });
                  }
            
                return {
                    ...state,
                    playerInventory: updatedPlayerInventory, lastEarnings,
                    enemyInventory: updatedEnemyInventory,
                    playerDiceValues: action.payload
                };
            
                case 'HANDLE_ENEMY_MOVE':
                    const { payload } = action;
                    const [enemyDice1, enemyDice2] = payload;
                    let updateEnemyInventory = { ...state.enemyInventory };
                    let enemyLastEarnings = calculateEnemyEarnings(enemyDice1, enemyDice2);
            
                if (enemyDice1 === enemyDice2) {
                    switch (enemyDice1) {
                        case 1:
                            // Liška: pokud není kohout, ztratí všechny slepice
                            if (!updateEnemyInventory.rooster) {
                                updateEnemyInventory.hens = 0;
                            }
                            break;
                        case 2:
                            // Odevzdat kuře, pokud je dostupné
                            if (updateEnemyInventory.chickens > 0) {
                                updateEnemyInventory.chickens -= 1;
                                // Předpokládá se aktualizace inventáře hráče nebo systému, ale to by mělo být řešeno mimo tento případ
                            }
                            break;
                        case 3:
                            // Odevzdat slepici, pokud je dostupná
                            if (updateEnemyInventory.hens > 0) {
                                updateEnemyInventory.hens -= 1;
                                // Podobně, aktualizace inventáře mimo tento blok
                            }
                            break;
                        case 4:
                            // Sníst všechna vejce
                            updateEnemyInventory.eggs = 0;
                            break;
                        case 5:
                            // Ztrácí všechny slepice
                            updateEnemyInventory.hens = 0;
                            break;
                        case 6:
                            // Liška: pokud není kohout, ztratí všechny slepice
                            if (!updateEnemyInventory.rooster) {
                                updateEnemyInventory.hens = 0;
                            }
                            break;
                    }
                } else {
                    // Aktualizace inventáře na základě hodnot kostek
                    updateEnemyInventory.eggs += enemyDice1 <= 3 ? 1 : 0;
                    updateEnemyInventory.chickens += enemyDice1 >= 4 && enemyDice1 <= 5 ? 1 : 0;
                    updateEnemyInventory.hens += enemyDice1 === 6 ? 1 : 0;
            
                    updateEnemyInventory.eggs += enemyDice2 <= 3 ? 1 : 0;
                    updateEnemyInventory.chickens += enemyDice2 >= 4 && enemyDice2 <= 5 ? 1 : 0;
                    updateEnemyInventory.hens += enemyDice2 === 6 ? 1 : 0;
                    if (enemyDice1 <= 3) {
                        enemyLastEarnings.push({ type: 'egg', quantity: 1 });
                    }
                    if (enemyDice1 >= 4 && enemyDice1 <= 5) {
                        enemyLastEarnings.push({ type: 'chicken', quantity: 1 });
                    }
                    if (enemyDice1 === 6) {
                        enemyLastEarnings.push({ type: 'hen', quantity: 1 });
                    }
            
                    if (enemyDice2 <= 3) {
                        enemyLastEarnings.push({ type: 'egg', quantity: 1 });
                    }
                    if (enemyDice2 >= 4 && enemyDice2 <= 5) {
                        enemyLastEarnings.push({ type: 'chicken', quantity: 1 });
                    }
                    if (enemyDice2 === 6) {
                        enemyLastEarnings.push({ type: 'hen', quantity: 1 });
                    }
                }
            
                return {
                    ...state,
                    enemyInventory: updateEnemyInventory,
                    enemyLastEarnings, // Aktualizace stavu s nově vypočítanými zisky
                    enemyDiceValues: [enemyDice1, enemyDice2]
                };

                case 'SET_PLAYER_INVENTORY':
                    return {
                        ...state,
                        playerInventory: action.payload
                    };
        
                case 'SET_ENEMY_INVENTORY':
                    return {
                        ...state,
                        enemyInventory: action.payload
                    };
        
                case 'SET_PLAYER_DICE_VALUES':
                    return {
                        ...state,
                        playerDiceValues: action.payload
                    };
        
                case 'SET_ENEMY_DICE_VALUES':
                    return {
                        ...state,
                        enemyDiceValues: action.payload
                    };
        

        default:
            throw new Error('Neznámý typ akce');
        }
    }

    export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [state, dispatch] = useReducer(gameReducer, initialState);
        const navigate = useNavigate();
        const resetLastEarnings = () => dispatch({ type: 'RESET_LAST_EARNINGS' });
        const resetLastTrade = () => dispatch({ type: 'RESET_LAST_TRADE' });
        
        
        const handleNext = () => {
            resetLastEarnings();
            resetLastTrade();
            navigate("/enemy-turn");
        };
    
        // Přetvoření handleTrade na použití dispatch
        const handleTrade = (tradeType: string) => {
            dispatch({ type: 'HANDLE_TRADE', payload: { tradeType } });
            // Navigace po provedení obchodu
            navigate("/player-result");
        };
    
        // Přetvoření handleRoll na použití dispatch
        const handleRoll = (diceValues: [number, number]) => {
            dispatch({ type: 'HANDLE_ROLL', payload: diceValues });
        };
    
        // Přetvoření handleEnemyMove na použití dispatch
        const handleEnemyMove = () => {
            // Generování hodnot kostek
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
        
            // Vypočet earnings na základě hodnot kostek
            const earnings = calculateEnemyEarnings(dice1, dice2);
        
            // Vyvolání akce HANDLE_ENEMY_MOVE s payloadem hodnot kostek
            dispatch({ type: 'HANDLE_ENEMY_MOVE', payload: [dice1, dice2] });
        
            // Aktualizace zisků nepřítele s vypočteným payloadem
            dispatch({ type: 'UPDATE_ENEMY_EARNINGS', payload: earnings });
        };
        
    
        // Hodnoty poskytnuté kontextem
        const contextValue = {
            ...state,
            handleTrade,
            enemyLastEarnings: state.enemyLastEarnings,
            handleRoll,
            handleEnemyMove,
            resetLastEarnings,
            resetLastTrade,    
            setLastTrade: (lastTrade: string | null) => dispatch({ type: 'SET_LAST_TRADE', payload: lastTrade }),
            setPlayerInventory: (inventory: InventoryItems) => dispatch({ type: 'SET_PLAYER_INVENTORY', payload: inventory }),
            setEnemyInventory: (inventory: InventoryItems) => dispatch({ type: 'SET_ENEMY_INVENTORY', payload: inventory }),
            setPlayerDiceValues: (diceValues: [number, number]) => dispatch({ type: 'SET_PLAYER_DICE_VALUES', payload: diceValues }),
            setEnemyDiceValues: (diceValues: [number, number]) => dispatch({ type: 'SET_ENEMY_DICE_VALUES', payload: diceValues }),
            handleNext, 
        };
    
        return (
            <GameContext.Provider value={contextValue}>
                {children}
            </GameContext.Provider>
        );
    };
        
    export default GameContext;