import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Images
import imageDatabase from './ABCPiensaImageDatabase.jsx';


// Constant, unchangeable instances of the letters and images
const originalImages = imageDatabase.map((value) => {
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


// Letters and images, but randomized once
const initialImages = randomizeArray(originalImages);

const initialLetters = randomizeArray(originalLetters);


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

  console.log(randomizedArray);
  return randomizedArray;
}


// ABCPiensaGame component
function ABCPiensaGame({ onGoBack, startingTimer }) {
  // The current ticking timer
  const [currentTimer, setCurrentTimer] = useState(startingTimer);
  
  // The current images and their updated properties
  const [currentImages, setCurrentImages] = useState(initialImages);
  
  // The current letters (randomized whenever starting the game or clicking anywhere)
  const [currentLetters, setCurrentLetters] = useState(initialLetters);
  
  
  // Make the timer tick down to 0
  useEffect(() => {
    if (currentTimer > 0) {
      setTimeout(() => {
        setCurrentTimer(currentTimer - 1);
      }, 1000);
    }
  }, [currentTimer]);
  
  
  // Whenever we click, randomize the letters
  function handleContainerClick() {
    const newLetters = randomizeArray(originalLetters);
    setCurrentLetters(newLetters);
  }
  
  // Whenever we select a card, change its isFlipped property to true
  function handleCardClick(cardIndex) {
    const isImageFlipped = currentImages.find(
      (image) => image.isFlipped
    );
    
    // If a card has already been selected, we do nothing
    if (isImageFlipped) {
      return;
    }
    
    const newImages = currentImages.map((value, imageIndex) => {
      if (cardIndex === imageIndex) {
        return (
          {
            ...value,
            isFlipped: true
          }
        )
      } else {
        return (
          {
            ...value
          }
        )
      }
    });
    
    setCurrentImages(newImages);
  }
  
  // Whenever we click on a letter, check if the selected image matches the letter.
  // If it does, we change flip the isFlipped and isDropped properties (the card has
  // now been dropped, and therefore should not be flipped)
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
          )
        } else {
          return (
            {
              ...value
            }
          )
        }
      });
      
      setCurrentImages(newImages);
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
        <LetterBox key={letter}>
          <DroppedImage src={imageDropped.src} />
        </LetterBox>
      )
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
          <FlipCard isFlipped={image.isFlipped}>
            <CardFront onClick={() => handleCardClick(cardIndex)} />
            <CardBack src={image.src} />
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
  
  
  return (
    <GameContainer onClick={handleContainerClick}>
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