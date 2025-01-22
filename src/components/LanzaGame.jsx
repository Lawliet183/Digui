import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Components
import ExitConfirmationDialog from './ExitConfirmationDialog.jsx';


const originalLetters = [
  'E', 'Ñ', 'T', 'X', 'I', 'M', 'Q',
  'N', 'H', 'L', 'B', 'G', 'U', 'D',
  'K', 'R', 'A', 'O', 'F', 'V', 'Y',
  'C', 'J', 'P', 'Z', 'S', '❤️', 'W',
];


// LanzaGame component
function LanzaGame({ onExitToMenu }) {
  // Whether the exit confirmation dialog should be shown or not
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  
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
  
  
  const letters = originalLetters.map((letter, index) => {
    return (
      <LetterCell key={index}>{letter}</LetterCell>
    );
  });
  
  
  return (
    <LanzaContainer>
      <BackButton onClick={handleConfirmationDialog}>&lt;-</BackButton>
      
      <LetterGrid>
        {letters}
      </LetterGrid>
      
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


export default LanzaGame;