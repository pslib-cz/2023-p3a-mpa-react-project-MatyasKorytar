import { GameProvider } from './providers/GameContext';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import PlayerScreen from './components/PlayerScreen';
import RulesScreen from './components/RulesScreen'; 
import EnemyScreen from './components/EnemyScreen';
import EnemyResultScreen from './components/EnemyResultScreen';
import PlayerResultScreen from './components/PlayerResultScreen';

function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/player-screen" element={<PlayerScreen />} />
          <Route path="/player-result" element={<PlayerResultScreen />} />
          <Route path="/enemy-turn" element={<EnemyScreen />} />
          <Route path="/enemy-result" element={<EnemyResultScreen />} />
          <Route path="/rules" element={<RulesScreen />} />  // Přidání nové cesty pro RulesScreen
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
