import { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// Components
import ExitConfirmationDialog from './ExitConfirmationDialog.jsx';
import DominoImageDatabase from './DominoImageDatabase.jsx';
import DominoTile from './DominoTile.jsx';


// Starting timer in seconds
const startingTimer = 60;

  // const test = [
  //   [
  //     {
        
  //     },
  //     {
        
  //     }
  //   ],
    
  //   [
  //     {
        
  //     },
  //     {
        
  //     }
  //   ]
  // ]

const originalTiles = DominoImageDatabase.slice();

const initialTiles = randomizeArray(originalTiles);

const initialPlayer1Tiles = initializePlayerTiles();

const initialPlayer2Tiles = initializePlayerTiles();


function initializePlayerTiles() {
  let playerTiles = [];
  for (let i = 0; i < 7; i++) {
    playerTiles.push(initialTiles[i]);
  }

  initialTiles.splice(0, 7);
  return playerTiles;
}

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


// DominoGame component
function DominoGame({ onExitToMenu }) {
  // Whether the exit confirmation dialog should be shown or not
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // The current ticking timer
  const [currentTimer, setCurrentTimer] = useState(startingTimer);
  
  // The current tiles in the tile bank
  const [currentTiles, setCurrentTiles] = useState(initialTiles);
  
  const [player1CurrentTiles, setPlayer1CurrentTiles] = useState(initialPlayer1Tiles);
  const [player2CurrentTiles, setPlayer2CurrentTiles] = useState(initialPlayer2Tiles);
  
  
  const isGameWon = false;
  
  // Make the timer tick down to 0
  useEffect(() => {
    if (currentTimer > 0 && !isGameWon) {
      const intervalID = setInterval(() => {
        setCurrentTimer(currentTimer - 1);
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [currentTimer, isGameWon]);
  
  
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
  
  
  // Calculating the currently displayed timer and formatting it
  const minutes = Math.floor(currentTimer / 60);

  const moduloTimer = currentTimer % 60;
  const seconds = (moduloTimer > 9) ? moduloTimer : '0' + moduloTimer;

  const formattedTimer = minutes + ':' + seconds;
  
  const player1Tiles = player1CurrentTiles.map((value, index) => {
    return (
      <DominoTile key={index} tile={value.src} />
    )
  });
  
  
  return (
    <>
      <GlobalStyle />
      
      <LeftDecorativeSide>
        <Circle color="#FF6F61" />
        <Square color="#A2D984" />
        <Triangle color="#FDFD96" />
      </LeftDecorativeSide>
      
      <RightDecorativeSide>
        <Square color="#A783D9" />
        <Triangle color="#87CEEB" />
        <Circle color="#F4C2C2" />
      </RightDecorativeSide>
      
      <Container>
        <Header>
          <ExitButton onClick={handleConfirmationDialog}>&lt;-</ExitButton>
          
          <Timer>Tiempo restante: {formattedTimer}</Timer>
        </Header>
        
        {showExitDialog &&
          <ExitConfirmationDialog
            onConfirmExit={handleConfirmExit}
            onCancelExit={handleCancelExit}
          />
        }
        
        <StyledBoard>
          
        </StyledBoard>
        
        <StyledButton>Robar ficha</StyledButton>
        
        <PlayerArea>
          <PlayerRow>
            <Title>Jugador 1</Title>
            <PlayerTiles>
              {player1Tiles}
            </PlayerTiles>
          </PlayerRow>
          
          <PlayerRow>
            <Title>Jugador 2</Title>
            <PlayerTiles>
              {/* {player2CurrentTiles} */}
            </PlayerTiles>
          </PlayerRow>
        </PlayerArea>
      </Container>
    </>
  );
}


// GlobalStyle para resetear márgenes, importar fuentes y mejorar el diseño
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Poppins:wght@700&family=Quicksand:wght@400&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Quicksand', sans-serif;
    background-color: #f7f7f7;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 6px rgba(255, 0, 0, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 12px rgba(255, 0, 0, 1); }
  100% { transform: scale(1); box-shadow: 0 0 6px rgba(255, 0, 0, 0.5); }
`;

const DecorativeSide = styled.div`
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const LeftDecorativeSide = styled(DecorativeSide)`
  left: 0;
  background-color: #d292bc;
  border-radius: 0 15px 15px 0;
`;

const RightDecorativeSide = styled(DecorativeSide)`
  right: 0;
  background-color: #d292bc;
  border-radius: 15px 0 0 15px;
`;

const Shape = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color || "#f9d423"};
  animation: ${float} 3s ease-in-out infinite;
  margin: 10px 0;
`;

const Circle = styled(Shape)`
  border-radius: 50%;
`;

const Square = styled(Shape)`
  border-radius: 8%;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid ${(props) => props.color || "#f9d423"};
  animation: ${float} 3s ease-in-out infinite;
  margin: 10px 0;
`;

const Timer = styled.div`
  font-size: 14px;
  font-weight: bold;
  ${({ isBlinking }) =>
    isBlinking &&
    css`
      animation: ${pulse} 1s infinite;
      color: red;
    `}
`;

const HighlightedSide = styled.div`
  border: 2px solid #ff6f61;
  border-radius: 6px;
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ active }) => (active ? "#fff" : "#6b21a8")};
  text-align: center;
`;

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f4f8;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #6b21a8;
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
  font-family: 'Baloo 2', cursive;
`;

const ExitButton = styled.button`
  font-size: 18px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff6f61;
  }
`;

const StyledBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #36276b;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
  flex-grow: 1;
  max-height: 40%;
  margin: 15px 0;
`;

const PlayerArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PlayerRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  background-color: ${({ active }) => (active ? "#6b21a8" : "#dce6f2")};
  color: ${({ active }) => (active ? "white" : "#6b21a8")};
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
`;

const PlayerTiles = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: white;
  background-color: #d292bc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6b21a8;
  }

  margin-bottom: 10px;
`;

const RotateScreenMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  color: #6b21a8;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;


export default DominoGame