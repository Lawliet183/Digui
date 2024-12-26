import { useEffect, useState } from 'react';

// Components
import SplashScreen from './components/SplashScreen.jsx'
import InfoScreen from './components/InfoScreen.jsx';
import JoinScreen from './components/JoinScreen.jsx';
import LoginSuccessfulScreen from './components/LoginSuccessfulScreen.jsx';


let isInitialized = false;


// App component
function App() {
  const [currentScreen, setCurrentScreen] = useState('splash'); // The name of the current screen
  
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
  
  function handleInfoScreenFinish() {
    setCurrentScreen('join');
  }
  
  function handleLoginSuccess() {
    setCurrentScreen('login-success');
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
      content = <LoginSuccessfulScreen />
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
