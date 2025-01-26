import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Categories of prompts
import { categories } from './LanzaCategoriesDatabase.jsx';

// Components
import ExitConfirmationDialog from './ExitConfirmationDialog.jsx';


const originalLetters = [
  'E', 'Ñ', 'T', 'X', 'I', 'M', 'Q',
  'N', 'H', 'L', 'B', 'G', 'U', 'D',
  'K', 'R', 'A', 'O', 'F', 'V', 'Y',
  'C', 'J', 'P', 'Z', 'S', '❤️', 'W',
];

const categoriesList = Object.keys(categories);


// LanzaGame component
function LanzaGame({ onExitToMenu }) {
  /* State variables */
  // Whether the exit confirmation dialog should be shown or not
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // Whether the card should be flipped and reveal the thing to be answered
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  // The currently selected prompt to be answered
  // const [selectedPrompt, setSelectedPrompt] = useState('');
  
  // The answer the user has typed in for the currently selected prompt
  const [userAnswer, setUserAnswer] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  
  
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
  
  // When the user "lanza", or otherwise selects a new prompt for play
  function handleLanzarClick() {
    const categoryIndex = Math.floor((Math.random() * 100) % categoriesList.length);
    const letterIndex = Math.floor((Math.random() * 100) % originalLetters.length);
    
    setSelectedCategory(categoriesList[categoryIndex]);
    setSelectedLetter(originalLetters[letterIndex]);
    setIsCardFlipped(true);
  }
  
  // Whenever the user changes the text in the input box
  function handleTextChanged(event) {
    const inputText = event.target.value;
    setUserAnswer(inputText.toLowerCase());
  }
  
  // When the user submits the answer to the currently selected prompt
  function handleVerifyAnswer() {
    const doesLetterMatch = (userAnswer[0] === selectedLetter.toLowerCase());
    
    const wordsArray = categories[selectedCategory];
    const isAnswerValid = (wordsArray.find((word) => word === userAnswer)) ? true : false;
    if (doesLetterMatch && isAnswerValid) {
      alert('Correcto!');
      
      setIsCardFlipped(false);
      setSelectedCategory('');
      setSelectedLetter('');
      setUserAnswer('');
    } else {
      alert('Incorrecto!');
    }
  }
  
  
  const letters = originalLetters.map((letter, index) => {
    return (
      <LetterCell key={index} isActive={letter === selectedLetter}>{letter}</LetterCell>
    );
  });
  
  
  
  const prompt = `${selectedCategory} que empiece con la letra ${selectedLetter}`;
  
  
  return (
    <LanzaContainer>
      <BackButton onClick={handleConfirmationDialog}>&lt;-</BackButton>
      
      <DeckContainer>
        <Card isFlipped={isCardFlipped}>
          <CardFront>
            <TextWrapper>¡Lanza y Diviértete!</TextWrapper>
          </CardFront>

          <CardBack>
            <TextWrapper>{prompt}</TextWrapper>
          </CardBack>
        </Card>
      </DeckContainer>
      
      <LetterGrid>
        {letters}
      </LetterGrid>
      
      <LanzarButton disabled={isCardFlipped} onClick={handleLanzarClick}>Lanzar</LanzarButton>
      
      <AnswerBox>
        <InputBox
          key={isCardFlipped}
          disabled={!isCardFlipped}
          onChange={handleTextChanged}
        />
      </AnswerBox>
      
      <AnswerButton
        disabled={!isCardFlipped}
        onClick={handleVerifyAnswer}
      >
        Verificar respuesta
      </AnswerButton>
      
      {showExitDialog &&
        <ExitConfirmationDialog
          onConfirmExit={handleConfirmExit}
          onCancelExit={handleCancelExit}
        />
      }
    </LanzaContainer>
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

// Animation for the back button
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

// Main container
const LanzaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:rgb(205, 218, 242);
  padding: 10px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  
  animation: ${fadeInGeneral} 1s ease forwards;
`;

// The grid where all of the letters and wildcard are
const LetterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1em;
  border-radius: 10px;
  border: 2px solid black;
  padding: 20px;
  max-width: 800px;
  width: 50%;
  
  @media (max-width: 700px) {
    width: 80%;
  }
    
  @media (max-height: 500px) {
    grid-gap: 0.5em
  }
  
  @media (orientation: portrait) {
    grid-gap: 0.5em;
    width: 80%;
  }
`;

// Each of the individual cells within the letter grid
const LetterCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
  font-size: 24px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px;
  background-color: ${({ isActive }) => (isActive ? '#ffe39f' : '#fff')};
  
  ${({ isActive }) => isActive && `
    transform: scale(1.1);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
  `}
  
  @media (orientation: portrait) or (max-height: 500px) {
    font-size: 20px;
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

// Contenedor del mazo de cartas
const DeckContainer = styled.div`
  perspective: 1000px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// Estilos para la carta (el contenedor de ambas caras)
const Card = styled.div`
  /* Reverse the width and height so that the card is horizontal */
  width: 200px;
  height: 150px;
  
  background-color: transparent;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
  ${({ isFlipped }) => isFlipped && css`
    transform: rotateY(180deg);
  `}
`;

// Estilos para cada cara de la carta
const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

// Cara frontal de la carta (antes de voltear)
const CardFront = styled(CardFace)`
  background-color: #6b21a8;
`;

// Cara trasera de la carta (cuando se voltea)
const CardBack = styled(CardFace)`
  background-color: #ffe39f;
  color: #333;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
`;

// Contenedor para el texto de la carta
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Button for "lanzar" (or playing the game)
const LanzarButton = styled.button`
  padding: 14px 28px;
  font-size: 20px;
  background: linear-gradient(135deg, #d8b4fe, #b39ddb); /* Colores púrpuras */
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #b39ddb;
    transform: scale(1.08);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #9575cd;
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 12px 24px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

// For answering to the selected prompt
const AnswerBox = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  border: 2px solid #6b21a8;
  border-radius: 8px;
  background-color: white;
  color: #6b21a8;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #d8b4fe;
  }

  @media (max-width: 768px) {
    height: 35px;
    font-size: 20px;
  }
`;

// Button for verifying the answer
const AnswerButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #d8b4fe;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #b983f3;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;


export default LanzaGame;