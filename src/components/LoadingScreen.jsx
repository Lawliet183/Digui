import styled, { keyframes } from 'styled-components';

// Images
import circle from './../assets/images/circle.svg';
import star from './../assets/images/star.svg';
import triangle from './../assets/images/triangle.svg';
import logo from './../assets/images/JoinScreen/logo digui.svg';


// LoadingScreen component
function LoadingScreen() {
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

      <LogoContainer>
        <CircleLogo src={logo} alt='Logo de Digui' />
      </LogoContainer>
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

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
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
  animation: ${spin} 6s linear infinite;
  position: relative; /* Centrar el círculo */

  /* Media query para pantallas verticales */
  @media (max-width: 768px) and (orientation: portrait) {
    width: 250px; /* Tamaño reducido para pantallas pequeñas */
  }
`;

export default LoadingScreen;