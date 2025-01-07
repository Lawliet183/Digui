import { useEffect, useState } from 'react';

// Components
import SplashScreen from './components/SplashScreen.jsx'
import InfoScreen from './components/InfoScreen.jsx';
import JoinScreen from './components/JoinScreen.jsx';
import LoginSuccessfulScreen from './components/LoginSuccessfulScreen.jsx';
import MainMenuScreen from './components/MainMenuScreen.jsx';
import ABCPiensaDifficultyMenu from './components/ABCPiensaDifficultyMenu.jsx';
import ABCPiensaGame from './components/ABCPiensaGame.jsx';
import DominoGame from './components/DominoGame.jsx';


// Did the app initialize already?
let isInitialized = false;


// App component
function App() {
  // The name of the current screen, and what screen should be displayed
  const [currentScreen, setCurrentScreen] = useState('splash');
  
  // The amount of seconds you have to complete ABCPiensa
  const [ABCPiensaSeconds, setABCPiensaSeconds] = useState(0);
  
  
  // If the app is just initializing, we give the splash screen 3 seconds to
  // display, then we hide it
  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true;
      setTimeout(() => {
        setCurrentScreen('info');
      }, 3000);
    }
  }, []);
  
  
  // Perhaps we can unify all of these events?
  // Is it even a good idea?
  function handleInfoScreenFinish() {
    setCurrentScreen('join');
  }
  
  function handleLoginSuccess() {
    setCurrentScreen('login-success');
  }
  
  function handleSuccessScreenFinish() {
    setCurrentScreen('main-menu');
  }
  
  function handleGameSelected(desiredGame) {
    setCurrentScreen(desiredGame);
  }
  
  function handleExitToMenu() {
    setCurrentScreen('main-menu');
  }
  
  function handleDifficultySelected(difficultySeconds) {
    setABCPiensaSeconds(difficultySeconds);
    setCurrentScreen('abc-piensa-game');
  }
  
  
  let content;
  switch (currentScreen) {
    case 'splash': {
      content = <SplashScreen />
      break;
    }
    case 'info': {
      content = <InfoScreen onFinish={handleInfoScreenFinish} />
      break;
    }
    case 'join': {
      content = <JoinScreen onLogin={handleLoginSuccess} />
      break;
    }
    case 'login-success': {
      content = <LoginSuccessfulScreen onSuccessScreenFinish={handleSuccessScreenFinish} />
      break;
    }
    case 'main-menu': {
      content = <MainMenuScreen onGameSelected={handleGameSelected} />
      break;
    }
    case 'abc-piensa-difficulty-menu': {
      content =
        <ABCPiensaDifficultyMenu
          onExitToMenu={handleExitToMenu}
          onDifficultySelected={handleDifficultySelected}
        />
        
      break;
    }
    case 'abc-piensa-game': {
      content = 
        <ABCPiensaGame
          onExitToMenu={handleExitToMenu}
          onRetry={handleGameSelected}
          startingTimer={ABCPiensaSeconds}
        />
        
      break;
    }
    case 'domino-game': {
      content = <DominoGame onExitToMenu={handleExitToMenu} />
      break;
    }
    default: {
      content = null;
      break;
    }
  }
  
  
  return (
    <>
      {content}
    </>
  );
}


export default App;
