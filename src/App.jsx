import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

// Components
import SplashScreen from './components/SplashScreen.jsx'
import InfoScreen from './components/InfoScreen.jsx';
import JoinScreen from './components/JoinScreen.jsx';
import LoginSuccessfulScreen from './components/LoginSuccessfulScreen.jsx';
import MainMenuScreen from './components/MainMenuScreen.jsx';
import ABCPiensaDifficultyMenu from './components/ABCPiensaDifficultyMenu.jsx';
import ABCPiensaGame from './components/ABCPiensaGame.jsx';
import DominoGame from './components/DominoGame.jsx';
import LanzaGame from './components/LanzaGame.jsx';
import RuletaGame from './components/RuletaGame.jsx';
import WordDecoderGame from './components/WordDecoderGame.jsx';


// Did the app initialize already?
let isInitialized = false;


// App component
function App() {
  // The amount of seconds you have to complete ABCPiensa
  const [ABCPiensaSeconds, setABCPiensaSeconds] = useState(0);
  
  // Used to navigate programmatically through the app
  const navigate = useNavigate();
  
  
  // Perhaps we can unify all of these events?
  // Is it even a good idea?
  function handleSplashEnd() {
    navigate('/Digui/info');
  }
  
  function handleInfoScreenFinish() {
    navigate('/Digui/join');
  }
  
  function handleLoginSuccess() {
    navigate('/Digui/callback');
  }
  
  function handleSuccessScreenFinish() {
    navigate('/Digui/main-menu');
  }
  
  function handleGameSelected(desiredGame) {
    navigate(`/Digui/${desiredGame}`);
  }
  
  function handleExitToMenu() {
    navigate('/Digui/main-menu');
  }
  
  function handleDifficultySelected(difficultySeconds) {
    setABCPiensaSeconds(difficultySeconds);
    navigate('/Digui/abc-piensa');
  }
  
  
  return (
    <Routes>
      <Route path='/Digui'>
        <Route index element={<SplashScreen onSplashEnd={handleSplashEnd} />} />
        <Route path='info' element={<InfoScreen onFinish={handleInfoScreenFinish} />} />
        <Route path='join' element={<JoinScreen onLogin={handleLoginSuccess} />} />
        <Route path='main-menu' element={<MainMenuScreen onGameSelected={handleGameSelected} />} />
        
        <Route
          path='abc-piensa-difficulty-menu'
          element={
            <ABCPiensaDifficultyMenu
              onExitToMenu={handleExitToMenu}
              onDifficultySelected={handleDifficultySelected}
            />
          }
        />
        
        <Route
          path='abc-piensa'
          element={
            <ABCPiensaGame
              onExitToMenu={handleExitToMenu}
              onRetry={handleGameSelected}
              startingTimer={ABCPiensaSeconds}
            />
          }
        />
        
        <Route path='domino' element={<DominoGame onExitToMenu={handleExitToMenu} />} />
        <Route path='lanza-y-diviertete' element={<LanzaGame onExitToMenu={handleExitToMenu} />} />
        <Route path='ruleta' element={<RuletaGame onExitToMenu={handleExitToMenu} />} />
        <Route path='word-decoder' element={<WordDecoderGame onExitToMenu={handleExitToMenu} />} />
        
        <Route
          path='callback'
          element={
            <LoginSuccessfulScreen onSuccessScreenFinish={handleSuccessScreenFinish} />
          }
        />
      </Route>
    </Routes>
  );
}


export default App;