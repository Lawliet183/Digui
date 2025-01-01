import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Images
import imageDatabase from './ABCPiensaImageDatabase.jsx';


let isFirstRender = true;


// ABCPiensaGame component
function ABCPiensaGame({ onGoBack, startingTimer }) {
  // The current ticking timer
  const [currentTimer, setCurrentTimer] = useState(startingTimer);
  
  
  const initialLetters = [
    'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'Ñ',
    'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
  ];
  
  const initialImages = imageDatabase;
  
  const letters = initialLetters.map((value, index) => {
    return (
      <LetterBox key={index}>{value}</LetterBox>
    );
  });
  
  const cards = initialImages.map((value, index) => {
    return (
      <CardContainer key={index}>
        <FlipCard>
          <CardFront />
          <CardBack src={value.src} />
        </FlipCard>
      </CardContainer>
    );
  });
  
  // Make the timer tick down to 0
  if (!isFirstRender && currentTimer > 0) {
    setTimeout(() => {
      setCurrentTimer(currentTimer - 1);
    }, 1000);
  } else {
    isFirstRender = false;
  }
  
  // Calculating the currently displayed timer and formatting it
  const minutes = Math.floor(currentTimer / 60);
  
  const moduloTimer = currentTimer % 60;
  const seconds = (moduloTimer > 9) ? moduloTimer : '0' + moduloTimer;
  
  const formattedTimer = minutes + ':' + seconds;
  
  
  return (
    <GameContainer>
      <BackButton onClick={onGoBack}>&lt;-</BackButton>
      
      <Timer>{formattedTimer} --- {currentTimer}</Timer>
      
      
      <LettersGrid>
        {letters}
      </LettersGrid>
      
      <ImagesContainer>
        {cards}
      </ImagesContainer>
      
      {currentTimer <= 0 && <img src='L:/Images/Memes/Zazu cat stare.jpg'></img>}
    </GameContainer>
  );
}


// Animación de entrada general
const fadeInGeneral = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Definición de la animación shake (error)
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

// Definición de la animación bounce (correcto)
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Definición de la animación fadeIn para la entrada suave
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Contenedor del juego
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3e5f5;
  padding: 10px;
  position: relative;
  overflow: hidden;
  animation: ${fadeInGeneral} 1s ease forwards;

  @media (orientation: portrait) {
    padding: 5px;
  }
`;

// Botón de regreso
const BackButton = styled.button`
  font-family: 'Poppins', sans-serif; /* Fuente Poppins */
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  background-color: #6b21a8;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  animation: ${fadeIn} 0.5s ease;

  &:hover {
    background-color: #5a189a;
  }

  @media (orientation: portrait) {
    font-size: 16px;
    padding: 8px 12px;
  }
`;

// Grid de letras
const LettersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 70px);
  grid-gap: 15px;
  margin-bottom: 20px;
  background-color: #d1c4e9;
  padding: 20px;
  border-radius: 15px;
  
  ${(props) => props.initialRender && css`
    animation: ${fadeIn} 0.5s ease;
  `}

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 60px);
    grid-gap: 10px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 50px);
    grid-gap: 8px;
    padding: 10px;
  }

  @media (orientation: portrait) {
    grid-template-columns: repeat(3, 50px);
    grid-gap: 8px;
    padding: 10px;
    margin-bottom: 15px;
  }
`;

// Cuadro de letras con animación de entrada y éxito
const LetterBox = styled.div`
  font-family: 'Quicksand', sans-serif; /* Fuente Quicksand */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.error) ? '#ffb3b3' : '#f0e5ff'};
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #000;
  
  ${(props) => props.error && css`
    animation: ${shake} 0.5s ease-in-out;
  `};
  
  ${(props) => props.correct && css`
    animation: ${bounce} 0.5s ease-in-out;
  `};
  
  position: relative;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  @media (orientation: portrait) {
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
`;

// Definición de DroppedImage
// Whenever you drop an image on the correct card?
const DroppedImage = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 5px;
  left: 5px;
  object-fit: contain;
  animation: ${fadeIn} 0.5s ease;

  @media (orientation: portrait) {
    width: 35px;
    height: 35px;
  }
`;

// Definición de CardFront y CardBack con animación
// The front and back of the cards themselves
const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-color: #f9c7ff; /* Fondo rosado claro */
  border-radius: 10px;
  border: 3px solid #e57373; /* Borde de color rosa más oscuro */
`;

const CardBack = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 10px;
  animation: ${fadeIn} 0.5s ease;
`;

// Contenedor de las imágenes ajustado para 5 columnas
const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 columnas distribuidas equitativamente */
  grid-auto-rows: min-content; /* Ajuste de altura automática según el contenido */
  gap: 20px;
  width: 100%;
  margin-top: 10px;
  background-color: #fff6b7;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  justify-items: center;
  animation: ${fadeIn} 0.8s ease;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (orientation: portrait) {
    width: 95%;
    padding: 5px;
    margin-top: 10px;
  }
`;

// Temporizador
const Timer = styled.div`
  font-family: 'Baloo 2', cursive; /* Fuente Baloo */
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  color: #6b21a8;
  animation: ${fadeIn} 0.5s ease;

  @media (orientation: portrait) {
    font-size: 18px;
    padding: 8px;
  }
`;

// Contenedor de cartas con margen ajustado para apilarlas
const CardContainer = styled.div`
  perspective: 1000px;
  margin: -20px;
  z-index: ${(props) => props.index};
`;

// Componente de las cartas ajustadas
const FlipCard = styled.div`
  width: 55px;
  height: 55px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  
  ${(props) => props.isFlipped && css`
    transform: rotateY(180deg);
  `}
  
  ${(props) => props.error && css`
    animation: ${shake} 0.5s ease-in-out;
  `}

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }

  @media (orientation: portrait) {
    width: 45px;
    height: 45px;
  }
`;


export default ABCPiensaGame;