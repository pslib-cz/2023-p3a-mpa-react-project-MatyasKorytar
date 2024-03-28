import Game from './components/Game'
import { GameProvider } from './providers/GameContext'
import './App.css'

function App() {
  
  return (
    <>
    <GameProvider>
        <Game/>
    </GameProvider>
    </>
  )
}

export default App
