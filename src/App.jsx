import { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen.jsx'
import InfoScreen from './components/InfoScreen.jsx';

let isInitialized = false;

function App() {
  const [isVisible, setIsVisible] = useState(true); // Whether one of the screens is visible or not
  
  // If the app is just initializing, we give the splash screen 3 seconds to
  // display, then we hide it
  useEffect(() => {
    if (!isInitialized) {
      isInitialized = true;
      setTimeout(() => {
        setIsVisible(false)
      }, 3000);
    }
  }, []);
  
  //let content = isVisible && <SplashScreen />
  let content = isVisible ? <SplashScreen /> : <InfoScreen />
  
  return (
    <>
      {content}
    </>
  );
}

export default App
