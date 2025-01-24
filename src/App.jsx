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
  // The name of the current screen, and what screen should be displayed
  // const [currentScreen, setCurrentScreen] = useState('splash');
  
  // The amount of seconds you have to complete ABCPiensa
  const [ABCPiensaSeconds, setABCPiensaSeconds] = useState(0);
  
  const navigate = useNavigate();
  
  
  // If the app is just initializing, we give the splash screen 3 seconds to
  // display, then we hide it
  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true;
      setTimeout(() => {
        navigate('/Digui/info');
      }, 3000);
    }
  }, []);
  
  
  // Perhaps we can unify all of these events?
  // Is it even a good idea?
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
  
  
  // All of the possible screens within a switch
  // let content;
  // switch (currentScreen) {
  //   case 'splash': {
  //     content = <SplashScreen />
  //     break;
  //   }
  //   case 'info': {
  //     content = <InfoScreen onFinish={handleInfoScreenFinish} />
  //     break;
  //   }
  //   case 'join': {
  //     content = <JoinScreen onLogin={handleLoginSuccess} />
  //     break;
  //   }
  //   case 'login-success': {
  //     content = <LoginSuccessfulScreen onSuccessScreenFinish={handleSuccessScreenFinish} />
  //     break;
  //   }
  //   case 'main-menu': {
  //     content = <MainMenuScreen onGameSelected={handleGameSelected} />
  //     break;
  //   }
  //   case 'abc-piensa-difficulty-menu': {
  //     content =
  //       <ABCPiensaDifficultyMenu
  //         onExitToMenu={handleExitToMenu}
  //         onDifficultySelected={handleDifficultySelected}
  //       />
        
  //     break;
  //   }
  //   case 'abc-piensa-game': {
  //     content = 
  //       <ABCPiensaGame
  //         onExitToMenu={handleExitToMenu}
  //         onRetry={handleGameSelected}
  //         startingTimer={ABCPiensaSeconds}
  //       />
        
  //     break;
  //   }
  //   case 'domino-game': {
  //     content = <DominoGame onExitToMenu={handleExitToMenu} />
  //     break;
  //   }
  //   case 'lanza-game': {
  //     content = <LanzaGame onExitToMenu={handleExitToMenu} />
  //     break;
  //   }
  //   case 'ruleta-game': {
  //     content = <RuletaGame onExitToMenu={handleExitToMenu} />
  //     break;
  //   }
  //   case 'word-decoder-game': {
  //     content = <WordDecoderGame onExitToMenu={handleExitToMenu} />
  //     break;
  //   }
  //   default: {
  //     content = null;
  //     break;
  //   }
  // }
  
  
  return (
    <Routes>
      <Route path='/Digui'>
        <Route index element={<SplashScreen />} />
        <Route path='info' element={<InfoScreen onFinish={handleInfoScreenFinish} />} />
        <Route path='join' element={<JoinScreen onLogin={handleLoginSuccess} />} />
        <Route path='main-menu' element={<MainMenuScreen onGameSelected={handleGameSelected} />} />
        <Route path='abc-piensa-difficulty-menu' element={<ABCPiensaDifficultyMenu
          onExitToMenu={handleExitToMenu}
          onDifficultySelected={handleDifficultySelected}
        />} />
        <Route path='abc-piensa' element={<ABCPiensaGame
          onExitToMenu={handleExitToMenu}
          onRetry={handleGameSelected}
          startingTimer={ABCPiensaSeconds}
        />} />
        <Route path='domino' element={<DominoGame onExitToMenu={handleExitToMenu} />} />
        <Route path='lanza-y-diviertete' element={<LanzaGame onExitToMenu={handleExitToMenu} />} />
        <Route path='ruleta' element={<RuletaGame onExitToMenu={handleExitToMenu} />} />
        <Route path='word-decoder' element={<WordDecoderGame onExitToMenu={handleExitToMenu} />} />
        <Route path='callback' element={<LoginSuccessfulScreen onSuccessScreenFinish={handleSuccessScreenFinish} />} />
      </Route>
    </Routes>
  );
}


export default App;