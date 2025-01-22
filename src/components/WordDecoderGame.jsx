import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// List of words to be used
import wordList from './WordDecoderWordsListDatabase.jsx';

// Components
import ExitConfirmationDialog from './ExitConfirmationDialog.jsx';


// Starting timer in seconds
const startingTimer = 60;

// Mapa de símbolos y sus letras correspondientes
const symbolToLetterMap = {
  '🔴': 'A', '🟢': 'B', '🔵': 'C', '🔺': 'D', '🔻': 'E',
  '🔼': 'F', '🟥': 'G', '🟩': 'H', '🟦': 'I', '➕': 'J',
  '✚': 'K', '★': 'L', '◆': 'M', '🔶': 'N', '🔷': 'Ñ',
  '⏺': 'O', '🟢⏺': 'P', '⏹️': 'Q', '❤': 'R', '💚': 'S',
  '💙': 'T', '🔽': 'U', '🟢🔼': 'V', '⏫': 'W', '⬆': 'X',
  '❇️': 'Y', '🔳': 'Z',
};

// Tabla de símbolos con letras para referencia
const symbolTable = [
  ['A', '🔴'], ['B', '🟢'], ['C', '🔵'], ['D', '🔺'], ['E', '🔻'],
  ['F', '🔼'], ['G', '🟥'], ['H', '🟩'], ['I', '🟦'], ['J', '➕'],
  ['K', '✚'], ['L', '★'], ['M', '◆'], ['N', '🔶'], ['Ñ', '🔷'],
  ['O', '⏺'], ['P', '🟢⏺'], ['Q', '⏹️'], ['R', '❤'], ['S', '💚'],
  ['T', '💙'], ['U', '🔽'], ['V', '🟢🔼'], ['W', '⏫'], ['X', '⬆'],
  ['Y', '❇️'], ['Z', '🔳']
];


// Select a new word randomly from the words list
function selectNewWord() {
  const index = Math.floor((Math.random() * 100) % wordList.length);
  return wordList[index];
}


// WordDecoderGame component
function WordDecoderGame({ onExitToMenu }) {
  // Whether the exit confirmation dialog should be shown or not
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // The current ticking timer
  const [currentTimer, setCurrentTimer] = useState(startingTimer);
  
  // The currently selected word
  const [currentlyEncryptedWord, setCurrentlyEncryptedWord] = useState(selectNewWord());
  
  // The answer the user has typed in for the currently encrypted word
  const [userAnswer, setUserAnswer] = useState('');
  
  // The current score the user has
  const [userScore, setUserScore] = useState(0);
  
  
  const isGameOver = (currentTimer <= 0) ? true : false;
  
  // Make the timer tick down to 0
  useEffect(() => {
    if (currentTimer > 0) {
      const intervalID = setInterval(() => {
        setCurrentTimer(currentTimer - 1);
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [currentTimer]);
  
  // If the game is over (because the time ran out), then inform the user about it
  // and exit to the main menu
  useEffect(() => {
    if (isGameOver) {
      alert('¡Se acabó el tiempo!');
      onExitToMenu();
    }
  }, [isGameOver]);
  
  
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
  
  // Whenever the user changes the text in the input box
  function handleTextChanged(event) {
    const inputText = event.target.value;
    setUserAnswer(inputText.toUpperCase());
  }
  
  // When the user submits the answer to the currently encrypted word
  function handleVerifyAnswer() {
    // Decode the word into an array of individual letters...
    const decodedWordArray = currentlyEncryptedWord.map((symbol) => {
      return (
        symbolToLetterMap[symbol]
      );
    });
    
    // ...And join them into a single word
    const decodedWord = decodedWordArray.join('');
    
    // If the answer is correct, we give the user 90 points, select a new encrypted word,
    // and clear the user's answer;
    // Otherwise, tell the user to try again
    if (userAnswer === decodedWord) {
      alert('¡Correcto! Has ganado 90 puntos.');
      
      setUserScore(userScore + 90);
      setCurrentlyEncryptedWord(selectNewWord());
      setUserAnswer('');
    } else {
      alert('Intenta de nuevo.');
    }
  }
  
  
  const symbols = symbolTable.map(([letter, symbol], index) => {
    return (
      <SymbolCell key={index}>
        <div>{letter}</div>
        <div>{symbol}</div>
      </SymbolCell>
    );
  });
  
  const encryptedLetters = currentlyEncryptedWord.map((symbol, index) => {
    return (
      <EncryptedLetter key={index}>{symbol}</EncryptedLetter>
    );
  });
  
  // Calculating the currently displayed timer and formatting it
  const minutes = Math.floor(currentTimer / 60);

  const moduloTimer = currentTimer % 60;
  const seconds = (moduloTimer > 9) ? moduloTimer : '0' + moduloTimer;

  const formattedTimer = minutes + ':' + seconds;
  
  
  return (
    <GameContainer>
      <ExitButton onClick={handleConfirmationDialog}>&lt;-</ExitButton>
      
      <TimerContainer>Tiempo restante: {formattedTimer}</TimerContainer>
      
      <Title>Decodifica la Palabra</Title>
      
      <SymbolTableContainer>
        {symbols}
      </SymbolTableContainer>
      
      <EncryptedWordContainer>
        {encryptedLetters}
      </EncryptedWordContainer>
      
      <AnswerBox>
        <InputBox key={userScore} onChange={handleTextChanged} />
      </AnswerBox>
      
      <AnswerButton onClick={handleVerifyAnswer}>Verificar</AnswerButton>
      
      <ScoreContainer>Puntos: {userScore}</ScoreContainer>
      
      {showExitDialog &&
        <ExitConfirmationDialog
          onConfirmExit={handleConfirmExit}
          onCancelExit={handleCancelExit}
        />
      }
    </GameContainer>
  )
}


// Animación de entrada suave
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Contenedor principal del juego
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6b21a8, #d8b4fe);
  font-family: 'Quicksand', sans-serif;
  animation: ${fadeIn} 0.8s ease-out;
  padding: 20px;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Botón para salir al menú
const ExitButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #d8b4fe;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b983f3;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

// Contenedor del temporizador
const TimerContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 18px;
  color: white;
  font-family: 'Baloo 2', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Título del juego
const Title = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 28px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

// Contenedor para la tabla de símbolos
const SymbolTableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  
  @media (max-height: 610px) {
    grid-template-columns: repeat(7, 1fr);
  }
    
  @media (max-height: 540px) {
    grid-template-columns: repeat(9, 1fr);
  }
  
  /* Changed the media condition to trigger on portrait, not max width */
  @media (orientation: portrait) {
    grid-template-columns: repeat(5, 1fr);
    gap: 3px;
    padding: 8px;
  }
`;

// Celda de la tabla de símbolos
const SymbolCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 6px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  color: #6b21a8;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
  }
`;

// Contenedor para los símbolos codificados (palabra codificada)
// Changed from SymbolContainer to EncryptedWordContainer
const EncryptedWordContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

// Cada símbolo individual (letras de la palabra codificada)
// Changed from Symbol to EncryptedLetter
const EncryptedLetter = styled.div`
  font-size: 30px;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #6b21a8;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 6px;
  }
`;

// Caja de texto donde el jugador coloca la palabra decodificada
const AnswerBox = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  /* Removing gap, it's unnecessary now */
  
  /* gap: 8px; */
  /* @media (max-width: 768px) { */
  /*   gap: 6px; */
  /* } */
`;

// Input para ingresar la letra decodificada (palabra sin codificar)
// Changed from InputLetter to InputBox
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

// Botón para verificar la respuesta
// Changed from Button to AnswerButton
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

const ScoreContainer = styled.div`
  margin-top: 15px;
  font-size: 18px;
  color: white;
  font-family: 'Baloo 2', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;


export default WordDecoderGame;