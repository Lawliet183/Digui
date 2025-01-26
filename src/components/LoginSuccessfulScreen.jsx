import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Cookies from 'js-cookie';

// Images
import circle from './../assets/images/circle.svg';
import star from './../assets/images/star.svg';
import triangle from './../assets/images/triangle.svg';
import checkIcon from './../assets/images/LoginSuccessfulScreen/check-icon.svg';
import logoCircle from './../assets/images/LoginSuccessfulScreen/circle-logo.svg';
import letterD from './../assets/images/LoginSuccessfulScreen/letter-d.svg';
import letterI from './../assets/images/LoginSuccessfulScreen/letter-i.svg';
import letterG from './../assets/images/LoginSuccessfulScreen/letter-g.svg';
import letterU from './../assets/images/LoginSuccessfulScreen/letter-u.svg';
import letterI_2 from './../assets/images/LoginSuccessfulScreen/letter-i2.svg';


// LoginSuccessfulScreen component
function LoginSuccessfulScreen({ onSuccessScreenFinish }) {
  /* State variables */
  // Whether this is the text or logo part
  const [currentScreen, setCurrentScreen] = useState('text');
  
  const { isAuthenticated } = useAuth0();
  
  
  // Log in the user if we reach this screen
  // DISCLAIMER: This is by no means safe, but I really can't get Auth0 to work properly
  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    
    if (!isLoggedIn) {
      Cookies.set('isLoggedIn', 'true', { expires: 1, sameSite: 'Strict' });
    }
  }, []);
  
  
  // When the text animation ends
  let animationCount = 0;
  function handleAnimationEnd() {
    animationCount++;
    
    // If this is the text disappearing (it's the 2nd animation), then change the screen
    if (animationCount === 2) {
      setCurrentScreen('logo');
    }
  }
  
  
  let content;
  switch (currentScreen) {
    case 'text': {
      content =
        <SuccessContainer>
          <CheckIcon src={checkIcon} alt='Icono de exito' />
          <SuccessText 
            onAnimationEnd={handleAnimationEnd}
          >
            ¡Inicio de sesión exitoso!
          </SuccessText>
        </SuccessContainer>
      break;
    }
    case 'logo': {
      content =
        <LogoContainer>
          <CircleLogo src={logoCircle} alt='Anillo del logo de Digui' />
          <LettersContainer>
            <Letter src={letterD} delay={3} alt='D' />
            <Letter src={letterI} delay={3.5} alt='I' />
            <Letter src={letterG} delay={4} alt='G' />
            <Letter src={letterU} delay={4.5} alt='U' />
            <Letter src={letterI_2} delay={5} onAnimationEnd={onSuccessScreenFinish} alt='I' />
          </LettersContainer>
        </LogoContainer>
      break;
    }
    default: {
      break;
    }
  }
  
  return (
    <Background>
      <FloatingImage
        src={triangle}
        alt="Triangulo"
        size="120px"
        top="10%"
        left="15%"
        duration="6s"
      />
      
      <FloatingImage
        src={circle}
        alt="Circulo"
        size="100px"
        top="70%"
        right="10%"
        duration="4.5s"
      />
      
      <FloatingImage
        src={star}
        alt="Estrella"
        size="80px"
        bottom="20%"
        left="20%"
        duration="5s"
      />
      
      {content}
    </Background>
  );
}


// Animación de flotación para las imágenes
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Animación de zoom y fade-in para el texto
const textZoom = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animación de salida para el texto y el check
const textFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

// Animación de aparición del logo
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Contenedor principal
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f3e5f5, #e0f7fa);
  position: relative;
  overflow: hidden;
`;

const SuccessContainer = styled.div`
  text-align: center;
`;

// Estilos para el texto con animación de salida
const SuccessText = styled.h1`
  font-size: 48px;
  color: #6b21a8;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  animation: ${textZoom} 1s ease-in-out, ${textFadeOut} 1s 1s ease-in-out forwards; /* Aparece y luego desaparece más rápido */
`;

// Ícono de check animado con salida
const CheckIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  z-index: 1;
  animation: ${float} 3s ease-in-out infinite, ${textFadeOut} 1s 1s ease-in-out forwards; /* Aparece y luego desaparece más rápido */
`;

// Imágenes animadas en el fondo
const FloatingImage = styled.img`
  position: absolute;
  width: ${(props) => props.size};
  animation: ${float} ${(props) => props.duration} ease-in-out infinite;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
`;

// Contenedor para el logo
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  position: relative; /* Asegura que las letras se posicionen sobre el círculo */
`;

// Círculo del logo
const CircleLogo = styled.img`
  width: 300px; /* Ajustado para mayor tamaño */
  height: auto;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out 2.5s forwards; /* Aparece después de 2.5 segundos */
  position: relative; /* Centrar el círculo */

  /* Media query para pantallas verticales */
  @media (max-width: 768px) and (orientation: portrait) {
    width: 250px; /* Tamaño reducido para pantallas pequeñas */
  }
`;

// Letras del logo, centradas dentro del círculo
const LettersContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centrar las letras dentro del círculo */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Estilos para las letras, con posición relativa al centro
const Letter = styled.img`
  width: 40px;
  height: auto;
  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out ${(props) => props.delay}s forwards; /* Cada letra tiene un retraso */
  margin: 0 5px; /* Espacio entre las letras */

  /* Media query para pantallas verticales */
  @media (max-width: 768px) and (orientation: portrait) {
    width: 30px; /* Tamaño reducido para pantallas pequeñas */
  }
`;


export default LoginSuccessfulScreen;