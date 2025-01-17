import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';

// Sounds
import welcomeAudio from './../assets/audios/MainMenuScreen/Welcome.mp3';

// Components
import TopBar from './TopBar.jsx';
import BottomNavBar from './BottomNavBar.jsx';
import HomeScreen from './HomeScreen.jsx';
import EducationScreen from './EducationScreen.jsx';
import GamesScreen from './GamesScreen.jsx';
import NotificationsScreen from './NotificationsScreen.jsx';
import ProfileScreen from './ProfileScreen.jsx';


// MainMenuScreen component
function MainMenuScreen({ onGameSelected }) {
  /* State variables */
  // What section should be displayed?
  const [currentSection, setCurrentSection] = useState('games');
  
  
  // When the main menu loads, play the welcome audio if the corresponding cookie hasn't expired
  useEffect(() => {
    const hasPlayedWelcomeAudio = Cookies.get('hasPlayedWelcomeAudio');
    
    if (!hasPlayedWelcomeAudio) {
      const audio = new Audio(welcomeAudio);
      audio.play();
      
      Cookies.set('hasPlayedWelcomeAudio', 'true', { expires: 1, sameSite: 'Strict' });
    }
  }, []);
  
  
  function handleSectionChange(desiredSection) {
    setCurrentSection(desiredSection);
  }
  
  
  let content;
  let title;
  switch (currentSection) {
    case 'home': {
      title = 'Inicio';
      content = <HomeScreen onSectionChange={handleSectionChange} />
      break;
    }
    case 'education': {
      title = 'Educación';
      content = <EducationScreen />
      break;
    }
    case 'games': {
      title = 'Juegos';
      content = <GamesScreen onGameSelected={onGameSelected} />
      break;
    }
    case 'notifications': {
      title = 'Notificaciones';
      content = <NotificationsScreen />
      break;
    }
    case 'profile': {
      title = 'Perfil'
      content = <ProfileScreen />
      break;
    }
    default: {
      content = null;
      break;
    }
  }
  
  
  return (
    <MainContainer>
      <TopBar title={title} />
      
      {content}
      
      <BottomNavBar onSectionChange={handleSectionChange} />
    </MainContainer>
  );
}


// Animación para hacer que el menú principal aparezca deslizando desde abajo
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px); /* Comienza fuera de la pantalla */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Entra completamente en pantalla */
  }
`;

// Contenedor principal
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #f3e5f5;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 1s ease-in-out;
  font-family: 'Quicksand', sans-serif; 
`;


export default MainMenuScreen;