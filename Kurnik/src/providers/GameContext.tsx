import { stat } from "fs";
import React, { useReducer, createContext } from "react";
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
    lastEnemyTrade: string | null;
    lastEarnings: { type: string; quantity: number }[]; 
    enemyLastEarnings: { type: string; quantity: number }[]; 
    diceEqualsMessage: string;
  }

  type ActionType =
  | { type: 'SET_LAST_TRADE'; payload: string | null }
  | { type: 'SET_ENEMY_LAST_TRADE'; payload: string | null }
  | { type: 'HANDLE_TRADE'; payload: { tradeType: string } }
  | { type: 'HANDLE_ROLL'; payload: [number, number] }
  | { type: 'HANDLE_ENEMY_MOVE'; payload: [number, number] } 
  | { type: 'UPDATE_ENEMY_EARNINGS'; payload: { type: string; quantity: number }[] } 
  | { type: 'SET_PLAYER_INVENTORY'; payload: InventoryItems }
  | { type: 'SET_ENEMY_INVENTORY'; payload: InventoryItems }
  | { type: 'SET_PLAYER_DICE_VALUES'; payload: [number, number] }
  | { type: 'SET_ENEMY_DICE_VALUES'; payload: [number, number] }
  | { type: 'RESET_LAST_EARNINGS' }
  | { type: 'RESET_LAST_TRADE' }
  | { type: 'RESET_ENEMY_LAST_TRADE' }
  | { type: 'RESET_ENEMY_EARNINGS' }
  | { type: 'RESET_LAST_DICEMESSAGE' };




  type GameContextType = {
    playerInventory: InventoryItems;
    lastTrade: string | null;
    lastEnemyTrade: string | null;
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
    diceEqualsMessage: string;
};

export const GameContext = createContext<GameContextType>({} as GameContextType);

const initialState: GameState = {
    playerInventory: { eggs: 0, chickens: 0, hens: 0, rooster: false },
    enemyInventory: { eggs: 0, chickens: 0, hens: 0, rooster: false },
    playerDiceValues: [1, 1],
    enemyDiceValues: [1, 1],
    lastTrade: null,
    lastEnemyTrade: null,
    lastEarnings: [], 
    enemyLastEarnings: [],
    diceEqualsMessage: "",
  };

  function calculateEnemyEarnings(dice1: number, dice2: number): { type: string; quantity: number }[] {
    let earnings = [];
    
    if (dice1 <= 3) earnings.push({ type: 'egg', quantity: 1 });
    if (dice1 >= 4 && dice1 <= 5) earnings.push({ type: 'chicken', quantity: 1 });
    if (dice1 === 6) earnings.push({ type: 'hen', quantity: 1 });

    if (dice2 <= 3) earnings.push({ type: 'egg', quantity: 1 });
    if (dice2 >= 4 && dice2 <= 5) earnings.push({ type: 'chicken', quantity: 1 });
    if (dice2 === 6) earnings.push({ type: 'hen', quantity: 1 });

    if (dice1 == dice2) {
        earnings = []
    }

    return earnings;
}
  
function gameReducer(state: GameState, action: ActionType): GameState {
    switch (action.type) {
        case 'RESET_LAST_EARNINGS':
            return { ...state, lastEarnings: [] };
        case 'RESET_LAST_TRADE':
            return { ...state, lastTrade: null };
        case 'RESET_LAST_DICEMESSAGE':
            return { ...state, diceEqualsMessage: "" };
        case 'SET_LAST_TRADE':
            return { ...state, lastTrade: action.payload };

        case 'RESET_ENEMY_LAST_TRADE':
            return { ...state, lastEnemyTrade: null };

        case 'RESET_ENEMY_EARNINGS':
                return { ...state, enemyLastEarnings: [] };
        case 'UPDATE_ENEMY_EARNINGS':
                return { ...state, enemyLastEarnings: action.payload };


        case 'SET_ENEMY_LAST_TRADE':
            return { ...state, lastEnemyTrade: action.payload }


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
                let message = "";
                let updatedEnemyInventory = { ...state.enemyInventory };
                let lastEarnings = [];
                if (dice1 === dice2) {
                    switch (dice1) {
                        case 1:
                           
                            if (!updatedPlayerInventory.rooster) {
                                updatedPlayerInventory.hens = 0;
                                message = "Fox snucks in! Unfortunatly you dont have a rooster, so all of yours chickens are gone!";
                            }
                            else {
                                message = "Fox snucks in! Luckily you have a rooster.";
                            }
                            break;
                        case 2:
                           
                            if (updatedPlayerInventory.chickens > 0) {
                                updatedPlayerInventory.chickens -= 1;
                                updatedEnemyInventory.chickens += 1;
                                message = "You have to donate one chicken to the enemy!";
                            }
                            break;
                        case 3:
                            
                            if (updatedPlayerInventory.hens > 0) {
                                updatedPlayerInventory.hens -= 1;
                                updatedEnemyInventory.hens += 1;
                                message = "You have to donate one hen to the enemy!";
                            }
                            break;
                        case 4:
                     
                            updatedPlayerInventory.eggs = 0;
                            message = "Misery came and all the eggs had to be eaten on the farm.";
                            break;
                        case 5:
                           
                            updatedPlayerInventory.hens = 0;
                            message = "All chickens have been lost.";
                            break;
                        case 6:
                          
                            if (!updatedPlayerInventory.rooster) {
                                updatedPlayerInventory.hens = 0;
                                message = "Fox snucks in! Unfortunatly you dont have a rooster, so all of yours chickens are gone!";
                            }
                            else {
                                message = "Fox snucks in! Luckily you have a rooster.";
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
                    message = "";
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

                if (dice1 == dice2) {
                    lastEarnings = []
                }
            
                return {
                    ...state,
                    playerInventory: updatedPlayerInventory, lastEarnings,
                    enemyInventory: updatedEnemyInventory,
                    playerDiceValues: action.payload,
                    diceEqualsMessage: message
                };
            
                case 'HANDLE_ENEMY_MOVE':
                    const { payload } = action;
                    const [enemyDice1, enemyDice2] = payload;
                    let updateEnemyInventory = { ...state.enemyInventory };
                    let updatePlayerInventory = {...state.playerInventory};
                    let enemyLastEarnings = calculateEnemyEarnings(enemyDice1, enemyDice2);
                    let enemyMessage = ""; 
                if (enemyDice1 === enemyDice2) {
                    switch (enemyDice1) {
                        case 1:
                            
                            if (!updateEnemyInventory.rooster) {
                                enemyMessage = "Fox snucks in! Unfortunatly Enemy dont have a rooster, so all of his chickens are gone!";
                                updateEnemyInventory.hens = 0;
                            }
                            else {
                                enemyLastEarnings = [];
                                enemyMessage = "Fox snucks in! Luckily Enemy have a rooster.";
                            }
                            break;
                        case 2:
                           
                            if (updateEnemyInventory.chickens > 0) {
                                updateEnemyInventory.chickens -= 1;
                                updatePlayerInventory.chickens += 1;
                                enemyLastEarnings = [];
                                enemyMessage = "Enemy have to donate one chicken to you!";
                                
                            }
                            break;
                        case 3:
                         
                            if (updateEnemyInventory.hens > 0) {
                                updateEnemyInventory.hens -= 1;
                                updatePlayerInventory.hens += 1;
                                enemyLastEarnings = [];
                                enemyMessage = "Enemy have to donate one hen to you!";
                            }
                            break;
                        case 4:
                        
                            updateEnemyInventory.eggs = 0;
                            enemyLastEarnings = [];
                            enemyMessage = "Misery came and all the eggs had to be eaten on the farm.";
                            break;
                        case 5:
                            
                            updateEnemyInventory.hens = 0;
                            enemyLastEarnings = [];
                            enemyMessage = "All chickens have been lost!";
                            break;
                        case 6:
                           
                            if (!updateEnemyInventory.rooster) {
                                enemyMessage = "Fox snucks in! Unfortunatly Enemy dont have a rooster, so all of his chickens are gone!";
                                updateEnemyInventory.hens = 0;
                            }
                            else {
                                enemyLastEarnings = [];
                                enemyMessage = "Fox snucks in! Luckily Enemy have a rooster.";
                            }
                            break;
                    }
                } else {
                    
                    updateEnemyInventory.eggs += enemyDice1 <= 3 ? 1 : 0;
                    updateEnemyInventory.chickens += enemyDice1 >= 4 && enemyDice1 <= 5 ? 1 : 0;
                    updateEnemyInventory.hens += enemyDice1 === 6 ? 1 : 0;
                    enemyMessage = "";
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

                if (enemyDice1 == enemyDice2) {
                    enemyLastEarnings = [];
                }
            
                return {
                    ...state,
                    enemyInventory: updateEnemyInventory,
                    playerInventory: updatePlayerInventory,
                    enemyLastEarnings, 
                    enemyDiceValues: [enemyDice1, enemyDice2],
                    diceEqualsMessage: enemyMessage
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
        const resetEnemyLastTrade = () => dispatch({ type: "RESET_ENEMY_LAST_TRADE" });
        
        const handleNext = () => {
            resetLastEarnings();
            resetLastTrade();
            resetEnemyLastTrade();
            dispatch({ type: 'RESET_LAST_DICEMESSAGE' });
                if (state.playerInventory.hens >= 9) {
                    console.log("End?", state.playerInventory.hens);
                    navigate("/end-game");
                } else {
                    console.log("Player?", state.playerInventory.hens);
                    navigate("/enemy-turn");
                }
            };
        
    
        
        const handleTrade = (tradeType: string) => {
            dispatch({ type: 'HANDLE_TRADE', payload: { tradeType } });
            
            navigate("/player-result");
        };
    

        const handleRoll = (diceValues: [number, number]) => {
            dispatch({ type: 'RESET_LAST_DICEMESSAGE' });
            dispatch({ type: 'HANDLE_ROLL', payload: diceValues });
        };

    
        const handleEnemyMove = () => {
            let updatedEnemyInventory = { ...state.enemyInventory };
            let updatedEnemyLastEarnings = [...state.enemyLastEarnings];
            let tradeDescription = '';
        
            if (updatedEnemyInventory.hens >= 3 && !updatedEnemyInventory.rooster) {
                updatedEnemyInventory.hens -= 3;
                updatedEnemyInventory.rooster = true;
                tradeDescription = 'Hens';
                updatedEnemyLastEarnings.push({ type: 'rooster', quantity: 1 });
                dispatch({ type: 'SET_ENEMY_INVENTORY', payload: updatedEnemyInventory });
                dispatch({ type: 'UPDATE_ENEMY_EARNINGS', payload: updatedEnemyLastEarnings });
                dispatch({ type: 'SET_ENEMY_LAST_TRADE', payload: tradeDescription });
                navigate("/enemy-result");
            } else if (updatedEnemyInventory.chickens >= 3) {
                updatedEnemyInventory.chickens -= 3;
                updatedEnemyInventory.hens += 1;
                tradeDescription = 'Chickens';
                updatedEnemyLastEarnings.push({ type: 'hen', quantity: 1 });
                dispatch({ type: 'SET_ENEMY_INVENTORY', payload: updatedEnemyInventory });
                dispatch({ type: 'UPDATE_ENEMY_EARNINGS', payload: updatedEnemyLastEarnings });
                dispatch({ type: 'SET_ENEMY_LAST_TRADE', payload: tradeDescription });
                navigate("/enemy-result");
            } else if (updatedEnemyInventory.eggs >= 3) {
                updatedEnemyInventory.eggs -= 3;
                updatedEnemyInventory.chickens += 1;
                tradeDescription = 'Eggs';
                updatedEnemyLastEarnings.push({ type: 'chicken', quantity: 1 });
                dispatch({ type: 'SET_ENEMY_INVENTORY', payload: updatedEnemyInventory });
                dispatch({ type: 'UPDATE_ENEMY_EARNINGS', payload: updatedEnemyLastEarnings });
                dispatch({ type: 'SET_ENEMY_LAST_TRADE', payload: tradeDescription });
                navigate("/enemy-result");
            } else {
           
                const dice1 = Math.floor(Math.random() * 6) + 1;
                const dice2 = Math.floor(Math.random() * 6) + 1;
        
                const earnings = calculateEnemyEarnings(dice1, dice2);
                dispatch({ type: 'HANDLE_ENEMY_MOVE', payload: [dice1, dice2] });
                dispatch({ type: 'UPDATE_ENEMY_EARNINGS', payload: earnings });
                navigate("/enemy-result");
            }

            
        };

        
        
    
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
            diceEqualsMessage: state.diceEqualsMessage 
        };
    
        return (
            <GameContext.Provider value={contextValue}>
                {children}
            </GameContext.Provider>
        );
    };
        
    export default GameContext;