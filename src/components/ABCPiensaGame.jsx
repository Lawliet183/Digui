import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import useSound from 'use-sound';

// Images
import ABCPiensaImageDatabase from './ABCPiensaImageDatabase.jsx';

// Sounds
import selectSound from './../assets/audios/ABCPiensaGame/select.mp3';
import correctSound from './../assets/audios/ABCPiensaGame/correct.mp3';
import errorSound from './../assets/audios/ABCPiensaGame/error.mp3';
import confettiSound from './../assets/audios/ABCPiensaGame/confetti.mp3';

// Components
import ExitConfirmationDialog from './ExitConfirmationDialog.jsx';
import ABCPiensaLoserScreen from './ABCPiensaLoserScreen.jsx';
import ABCPiensaWinnerScreen from './ABCPiensaWinnerScreen.jsx';


// Constant, unchangeable instances of the letters and images
const originalImages = ABCPiensaImageDatabase.map((value) => {
  return (
    {
      ...value,
      isFlipped: false,
      isDropped: false
    }
  );
});

const originalLetters = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'Ñ',
  'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X',
  'Y', 'Z'
];


// Randomize an array (used for both letters and images/cards)
function randomizeArray(originalArray) {
  const arrayLength = originalArray.length;
  const copyArray = originalArray.slice();
  
  let randomizedArray = [];
  for (let i = 0; i < arrayLength; i++) {
    const index = Math.floor((Math.random() * 100) % (arrayLength - i));
    randomizedArray.push(copyArray[index]);
    copyArray.splice(index, 1);
  }

  return randomizedArray;
}


// ABCPiensaGame component
function ABCPiensaGame({ onExitToMenu, onRetry, startingTimer }) {
  /* State variables */
  // The current ticking timer, if it's 0 we give it a default value of 180 seconds (3 minutes)
  const [currentTimer, setCurrentTimer] = useState((startingTimer <= 0) ? 180 : startingTimer);
  
  // The current images and their updated properties, randomized once at the beginning
  const [currentImages, setCurrentImages] = useState(randomizeArray(originalImages));
  
  // The current letters (randomized whenever starting the game or clicking anywhere)
  const [currentLetters, setCurrentLetters] = useState(randomizeArray(originalLetters));
  
  // Whether the exit confirmation dialog should be shown or not
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // Whether the starting animation is over or not
  const [isAnimationOver, setIsAnimationOver] = useState(false);
  
  
  /* Sounds functions */
  // When the user selects a card
  const [playSelectSound] = useSound(selectSound);
  
  // When the user places a matching card with their letter
  const [playCorrectSound] = useSound(correctSound);
  
  // When the user selects more than one card, or the card doesn't match the letter
  const [playErrorSound] = useSound(errorSound);
  
  // When the user wins and the confetti is displayed
  const [playConfettiSound] = useSound(confettiSound);
  
  
  const foundUndroppedCard = currentImages.find((image) => image.isDropped === false);
  
  const isGameWon = foundUndroppedCard ? false : true;

  // Make the timer tick down to 0
  useEffect(() => {
    if (isAnimationOver && currentTimer > 0 && !isGameWon) {
      const intervalID = setInterval(() => {
        setCurrentTimer(currentTimer - 1);
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [currentTimer, isGameWon, isAnimationOver]);
  
  
  // When the user wants to play again
  function handleRetryGame() {
    onRetry('abc-piensa-difficulty-menu');
  }
  
  // When the starting animation ends, indicate it
  function handleAnimationEnd() {
    setIsAnimationOver(true);
  }
  
  // Confirm if the user wants to exit the game, and take appropiate action
  function handleConfirmationDialog() {
    setShowExitDialog(true);
  }
  
  function handleConfirmExit() {
    onExitToMenu();
  }
  
  function handleCancelExit() {
    setShowExitDialog(false);
  }
  
  // Whenever we click, randomize the letters
  function handleContainerClick() {
    const newLetters = randomizeArray(originalLetters);
    setCurrentLetters(newLetters);
  }
  
  // Whenever we select a card, change its isFlipped property to true
  function handleCardSelected(cardIndex) {
    const isImageFlipped = currentImages.find(
      (image) => image.isFlipped
    );
    
    // If a card has already been selected, we update the images to set the 
    // error property on the card that the user attempted to select,
    // and we play an error sound
    if (isImageFlipped) {
      setCurrentImages((prevImages) => prevImages.map((value, imageIndex) => {
        if (cardIndex === imageIndex) {
          return (
            {
              ...value,
              error: true
            }
          );
        } else {
          return (
            {
              ...value
            }
          );
        }
      }));
      
      setTimeout(() => {
        setCurrentImages((prevImages) => prevImages.map((value, imageIndex) => {
          if (cardIndex === imageIndex) {
            return (
              {
                ...value,
                error: false
              }
            );
          } else {
            return (
              {
                ...value
              }
            );
          }
        }));
      }, 500);
      
      playErrorSound();
      
      return;
    }
    
    // Otherwise, we just switch the isFlipped property of the currently selected card,
    // playing the corresponding select sound
    const newImages = currentImages.map((value, imageIndex) => {
      if (cardIndex === imageIndex) {
        return (
          {
            ...value,
            isFlipped: true
          }
        );
      } else {
        return (
          {
            ...value
          }
        );
      }
    });
    
    playSelectSound();
    
    setCurrentImages(newImages);
  }
  
  // Whenever we click on a letter, check if the selected image matches the letter.
  // If it does, we change flip the isFlipped and isDropped properties (the card has
  // now been dropped, and therefore should not be flipped);
  // Otherwise, indicate an error by playing a sound
  function handleLetterClick(letter) {
    const image = currentImages.find(
      (image) => image.isFlipped && (image.letter === letter)
    );
    
    if (image) {
      const newImages = currentImages.map((value) => {
        if (value.letter === image.letter) {
          return (
            {
              ...value,
              isFlipped: false,
              isDropped: true
            }
          );
        } else {
          return (
            {
              ...value
            }
          );
        }
      });
      
      playCorrectSound();
      
      setCurrentImages(newImages);
    } else {
      playErrorSound();
    }
  }
  
  
  const letters = currentLetters.map((letter) => {
    const imageDropped = currentImages.find(
      (image) => image.isDropped && (image.letter === letter)
    );
    
    // If the image was dropped, we display that image;
    // Otherwise, we display the letter
    if (imageDropped) {
      return (
        <LetterBox key={letter} correct={true}>
          <DroppedImage src={imageDropped.src} />
        </LetterBox>
      );
    } else {
      return (
        <LetterBox key={letter} onClick={() => handleLetterClick(letter)}>{letter}</LetterBox>
      );
    }
  });
  
  const cards = currentImages.map((image, cardIndex) => {
    // If the image has not been dropped, we display it;
    // Otherwise, we render nothing
    if (!image.isDropped) {
      return (
        <CardContainer key={image.letter}>
          <FlipCard isFlipped={image.isFlipped} error={image.error}>
            <CardFront onClick={() => handleCardSelected(cardIndex)} />
            <CardBack src={image.src} alt={image.alt} />
          </FlipCard>
        </CardContainer>
      );
    }
  });
  
  // Calculating the currently displayed timer and formatting it
  const minutes = Math.floor(currentTimer / 60);
  
  const moduloTimer = currentTimer % 60;
  const seconds = (moduloTimer > 9) ? moduloTimer : '0' + moduloTimer;
  
  const formattedTimer = minutes + ':' + seconds;
  
  
  // If we don't have any more cards to drop, we won the game;
  // If the time runs out, we lose the game;
  // If none of this is true, we keep playing the game
  if (isGameWon) {
    playConfettiSound();
    
    return (
      <ABCPiensaWinnerScreen
        onRetry={handleRetryGame}
        onExitToMenu={onExitToMenu}
        finishTimer={currentTimer}
      />
    );
  } else if (currentTimer <= 0) {
    return (
      <ABCPiensaLoserScreen onRetry={handleRetryGame} />
    );
  } else {
    return (
      <GameContainer onAnimationEnd={handleAnimationEnd} onClick={handleContainerClick}>
        <BackButton onClick={handleConfirmationDialog}>&lt;-</BackButton>

        {showExitDialog &&
          <ExitConfirmationDialog
            onConfirmExit={handleConfirmExit}
            onCancelExit={handleCancelExit}
          />
        }

        <Timer>Tiempo restante: {formattedTimer}</Timer>


        <LettersGrid>
          {letters}
        </LettersGrid>

        <ImagesContainer>
          {cards}
        </ImagesContainer>
      </GameContainer>
    );
  }
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
  box-sizing: border-box;

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
  
  @media (max-height: 650px) {
    grid-template-columns: repeat(6, 70px);
  }
  
  /* Changed the columns size to 50px and have it in 5 columns for smaller screens */
  /* Also changed the max widths at which we start changing how the letters look */

  @media (max-width: 960px) {
    grid-template-columns: repeat(6, 60px);
    grid-gap: 10px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(5, 50px);
    grid-gap: 8px;
    padding: 10px;
  }

  @media (orientation: portrait) {
    grid-template-columns: repeat(5, 50px);
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
  /* Changed from 40px to 80% */
  width: 80%;
  height: 80%;
  
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
  grid-template-columns: repeat(9, 1fr); /* 9 columnas distribuidas equitativamente */
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
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
  }

  @media (orientation: portrait) {
    grid-template-columns: repeat(5, 1fr);
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