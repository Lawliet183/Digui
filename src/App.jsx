import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

// Components
import { AuthenticationGuard } from './components/AuthenticationGuard.jsx';
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
import LoadingScreen from './components/LoadingScreen.jsx';


// App component
function App() {
  // The amount of seconds you have to complete ABCPiensa
  const [ABCPiensaSeconds, setABCPiensaSeconds] = useState(0);
  
  // Used to navigate programmatically through the app
  const navigate = useNavigate();
  
  // Used for checking if the Auth0 sdk has loaded or not
  const { isAuthenticated, isLoading } = useAuth0();
  
  // If the Auth0 sdk hasn't loaded, we present a loading screen instead
  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }
  
  
  // Perhaps we can unify all of these events?
  // Is it even a good idea?
  function handleSplashEnd() {
    if (isAuthenticated) {
      navigate('/Digui/login-success');
    } else {
      navigate('/Digui/info');
    }
  }
  
  function handleSuccessScreenFinish() {
    navigate('/Digui/main-menu');
  }
  
  // This one is "unnecessary" since it's handled by Auth0 now,
  // but it's still good for dev purposes
  function handleLoginSuccess() {
    navigate('/Digui/login-success');
  }
  
  // These 3 functions could be removed if we rewrite the respective buttons
  // that trigger them to use <Link />
  function handleInfoScreenFinish() {
    navigate('/Digui/join');
  }
  
  function handleGameSelected(desiredGame) {
    navigate(`/Digui/${desiredGame}`);
  }
  
  function handleExitToMenu() {
    navigate('/Digui/main-menu');
  }
  
  // This one could also be removed if we used <Link />, but I'm not 100% sure
  function handleDifficultySelected(difficultySeconds) {
    setABCPiensaSeconds(difficultySeconds);
    navigate('/Digui/abc-piensa');
  }
  
  
  return (
    <Routes>
      <Route path='/Digui'>
        {/* Unprotected, public paths */}
        <Route index element={<SplashScreen onSplashEnd={handleSplashEnd} />} />
        <Route path='info' element={<InfoScreen onFinish={handleInfoScreenFinish} />} />
        <Route path='join' element={<JoinScreen onLogin={handleLoginSuccess} />} />
        
        
        {/* Protected, private paths, we use a props property to pass down the props we need */}
        {/* Main menu */}
        <Route
          path='main-menu'
          element={
            <AuthenticationGuard
              component={MainMenuScreen}
              props={
                { onGameSelected: handleGameSelected }
              }
            />
          }
        />
        
        {/* ABC Piensa difficulty menu */}
        <Route
          path='abc-piensa-difficulty-menu'
          element={
            <AuthenticationGuard
              component={ABCPiensaDifficultyMenu}
              props={
                {
                  onExitToMenu: handleExitToMenu,
                  onDifficultySelected: handleDifficultySelected
                }
              }
            />
          }
        />
        
        {/* ABC Piensa */}
        <Route
          path='abc-piensa'
          element={
            <AuthenticationGuard
              component={ABCPiensaGame}
              props={
                {
                  onExitToMenu: handleExitToMenu,
                  onRetry: handleGameSelected,
                  startingTimer: ABCPiensaSeconds
                }
              }
            />
          }
        />
        
        {/* Domino */}
        <Route
          path='domino'
          element={
            <AuthenticationGuard
              component={DominoGame}
              props={
                { onExitToMenu: handleExitToMenu }
              }
            /> 
          }
        />
        
        {/* Lanza y diviertete */}
        <Route
          path='lanza-y-diviertete'
          element={
            <AuthenticationGuard
              component={LanzaGame}
              props={
                { onExitToMenu: handleExitToMenu }
              }
            />
          }
        />
        
        {/* Ruleta */}
        <Route
          path='ruleta'
          element={
            <AuthenticationGuard
              component={RuletaGame}
              props={
                { onExitToMenu: handleExitToMenu }
              }
            />
          }
        />
        
        {/* Word Decoder */}
        <Route
          path='word-decoder'
          element={
            <AuthenticationGuard
              component={WordDecoderGame}
              props={
                { onExitToMenu: handleExitToMenu }
              }
            />
          }
        />
        
        {/* Login success screen */}
        <Route
          path='login-success'
          element={
            <AuthenticationGuard
              component={LoginSuccessfulScreen}
              props={
                { onSuccessScreenFinish: handleSuccessScreenFinish }
              }
            />
          }
        />
        
        {/* Loading screen */}
        <Route
          path='loading'
          element={
            <AuthenticationGuard
              component={LoadingScreen}
            />
          }
        />
      </Route>
    </Routes>
  );
}


export default App;