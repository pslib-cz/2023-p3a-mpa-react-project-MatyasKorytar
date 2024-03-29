import Game from './components/Game'
import { GameProvider } from './providers/GameContext'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PlayerScreen from './components/PlayerScreen'
import EnemyScreen from './components/EnemyScreen'
import EnemyResultScreen from './components/EnemyResultScreen'
import PlayerResultScreen from './components/PlayerResultScreen'
import PlayerTradeResultScreen from './components/PlayerTradeResultScreen'

function App() {
  
  return (
    <Router>
      <GameProvider>
        <Routes>
            <Route path="/" element={<PlayerScreen />} />
            <Route path="/player-result" element={<PlayerResultScreen />} />
            <Route path='/player-traderesult' element={<PlayerTradeResultScreen/>}/>
            <Route path="/enemy-turn" element={<EnemyScreen />} />
            <Route path="/enemy-result" element={<EnemyResultScreen />} />
        </Routes>
      </GameProvider>
    </Router>
  )
}

export default App
