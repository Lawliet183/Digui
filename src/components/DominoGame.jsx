import { useState, useEffect } from 'react';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

// Images
import DominoImageDatabase from './DominoImageDatabase.jsx';

// Components
import ExitConfirmationDialog from './ExitConfirmationDialog.jsx';
import DominoTile from './DominoTile.jsx';
import DominoGameOverDialog from './DominoGameOverDialog.jsx';


// Starting timer in seconds
const startingTimer = 60;

// A copy of all of the tiles
const originalTiles = DominoImageDatabase.slice();


function initializePlayerTiles(initialTiles) {
  const copyArray = initialTiles.slice();
  
  let playerTiles = [];
  for (let i = 0; i < 7; i++) {
    playerTiles.push(copyArray[i]);
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
  /* State variables */
  // Whether the exit confirmation dialog should be shown or not
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // The current ticking timer
  const [currentTimer, setCurrentTimer] = useState(startingTimer);
  
  // The current tiles in the tile bank
  const [currentTiles, setCurrentTiles] = useState(randomizeArray(originalTiles));
  
  // The current tiles that each player currently holds
  const [player1CurrentTiles, setPlayer1CurrentTiles] = useState([]);
  const [player2CurrentTiles, setPlayer2CurrentTiles] = useState([]);
  
  // The player that's currently playing
  const [currentPlayer, setCurrentPlayer] = useState(1);
  
  // The tiles that are currently placed in the board
  const [currentBoard, setCurrentBoard] = useState([]);
  
  
  const player1HasTiles = (player1CurrentTiles.length > 0) ? true : false;
  const player2HasTiles = (player2CurrentTiles.length > 0) ? true : false;
  
  // The game ends if one of the player has no tiles, or if the time ran out
  const isGameOver = !player1HasTiles || !player2HasTiles || currentTimer <= 0;
  
  // Make the timer tick down to 0
  useEffect(() => {
    if (currentTimer > 0 && !isGameOver) {
      const intervalID = setInterval(() => {
        setCurrentTimer(currentTimer - 1);
      }, 1000);

      return () => clearInterval(intervalID);
    }
  }, [currentTimer, isGameOver]);
  
  // Give the players their corresponding tiles
  useEffect(() => {
    const newTiles = currentTiles.slice();
    
    // If the tile bank is full, we distribute 7 tiles to each player
    if (newTiles.length >= 28) {
      setPlayer1CurrentTiles(initializePlayerTiles(newTiles));
      setPlayer2CurrentTiles(initializePlayerTiles(newTiles));

      setCurrentTiles(newTiles);
    }
  }, []);
  
  
  // Initialize the game whenever the user wants to play again
  function initializeGame() {
    setShowExitDialog(false);
    setCurrentTimer(startingTimer);
    
    const newTiles = randomizeArray(originalTiles).slice();
    
    setPlayer1CurrentTiles(initializePlayerTiles(newTiles));
    setPlayer2CurrentTiles(initializePlayerTiles(newTiles));
    setCurrentTiles(newTiles);
    setCurrentPlayer(1);
    setCurrentBoard([]);
  }
  
  function isBoardLeftEndMatch(leftEnd, tile) {
    return (
      leftEnd.leftNumber === tile.rightNumber ||
      leftEnd.leftShape === tile.rightShape ||
      leftEnd.leftColor === tile.rightColor
    );
  }
  
  function isBoardRightEndMatch(rightEnd, tile) {
    return (
      rightEnd.rightNumber === tile.leftNumber ||
      rightEnd.rightShape === tile.leftShape ||
      rightEnd.rightColor === tile.leftColor
    );
  }
  
  // Check if the tile that the player wants to place is a valid move
  function isMoveValid(tile) {
    // If the board is empty, we can place a tile
    if (currentBoard.length <= 0) {
      return true;
    }
    
    const leftEnd = currentBoard[0];
    const rightEnd = currentBoard[currentBoard.length - 1];
    
    return (
      isBoardLeftEndMatch(leftEnd, tile) ||
      isBoardRightEndMatch(rightEnd, tile)
    );
  }
  
  // Place a tile on the board
  function placeTileOnBoard(tile) {
    // If the board is empty, we just place the tile
    if (currentBoard.length <= 0) {
      setCurrentBoard([tile]);
    } else {
      const leftEnd = currentBoard[0];
      const rightEnd = currentBoard[currentBoard.length - 1];
      
      const leftEndMatch = isBoardLeftEndMatch(leftEnd, tile);
      
      const rightEndMatch = isBoardRightEndMatch(rightEnd, tile);
      
      // If there's a match on the left end, we prepend the tile;
      // Otherwise, if the match is on the right end, we append the tile
      if (leftEndMatch) {
        setCurrentBoard([tile, ...currentBoard]);
      } else if (rightEndMatch) {
        setCurrentBoard([...currentBoard, tile]);
      }
    }
  }
  
  // Draw a tile from the tile bank
  function drawTile() {
    // If the tile bank is empty, return nothing (null)
    if (currentTiles.length <= 0) {
      return null;
    }
    
    const newTile = currentTiles[0];
    const remainingTiles = currentTiles.slice(1);
    
    // Place the drawn tile in the player's hand
    if (currentPlayer === 1) {
      setPlayer1CurrentTiles([...player1CurrentTiles, newTile]);
    } else {
      setPlayer2CurrentTiles([...player2CurrentTiles, newTile]);
    }
    
    setCurrentTiles(remainingTiles);
    
    return newTile;
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
  
  // When the user wants to play again
  function handleRetryGame() {
    initializeGame();
  }
  
  // When the user clicks on a tile, check if its a valid tile and place it in the board
  function handleTileClick(tile, playerNumber) {
    if (currentPlayer === playerNumber && isMoveValid(tile)) {
      placeTileOnBoard(tile);
      
      // Remove the tile that was selected from the player's hand
      if (currentPlayer === 1) {
        const newPlayerTiles = player1CurrentTiles.filter((prevTile) => prevTile !== tile);
        setPlayer1CurrentTiles(newPlayerTiles);
      } else {
        const newPlayerTiles = player2CurrentTiles.filter((prevTile) => prevTile !== tile);
        setPlayer2CurrentTiles(newPlayerTiles);
      }
      
      // Pass the turn to the next player
      const nextPlayer = (currentPlayer === 1) ? 2 : 1;
      setCurrentPlayer(nextPlayer);
    }
  }
  
  // Cuando el jugador roba ficha o pasa el turno
  function handleEndTurn() {
    let currentPlayerTiles;
    if (currentPlayer === 1) {
      currentPlayerTiles = player1CurrentTiles;
    } else {
      currentPlayerTiles = player2CurrentTiles;
    }
    
    // Check if the current player's tiles could be placed
    const hasValidMove = currentPlayerTiles.some(isMoveValid);
    
    // If the player can't place any tile, we draw a new tile
    if (!hasValidMove) {
      const newTile = drawTile();
      
      // If the tile bank is empty, or if the newly drawn tile cannot be placed, pass the turn
      if (!newTile || !isMoveValid(newTile)) {
        const nextPlayer = (currentPlayer === 1) ? 2 : 1;
        setCurrentPlayer(nextPlayer);
      }
    }
  }
  
  
  // Calculating the currently displayed timer and formatting it
  const minutes = Math.floor(currentTimer / 60);

  const moduloTimer = currentTimer % 60;
  const seconds = (moduloTimer > 9) ? moduloTimer : '0' + moduloTimer;

  const formattedTimer = minutes + ':' + seconds;
  
  
  // The player tiles converted to domino tiles
  const player1Tiles = player1CurrentTiles.map((tile, index) => {
    return (
      <DominoTile
        key={index}
        tile={tile.src}
        onSelected={() => handleTileClick(tile, 1)}
        isFlipped={currentPlayer !== 1}
      />
    )
  });
  
  const player2Tiles = player2CurrentTiles.map((tile, index) => {
    return (
      <DominoTile
        key={index}
        tile={tile.src}
        onSelected={() => handleTileClick(tile, 2)}
        isFlipped={currentPlayer !== 2}
      />
    )
  });
  
  // The board converted to domino tiles
  const board = currentBoard.map((tile, index) => {
    return (
      <DominoTile key={index} tile={tile.src} />
    )
  });
  
  // Make the timer blink if the players are running out of time
  const isTimerBlinking = (currentTimer <= 15) ? true : false;
  
  
  // The player who has 0 tiles is the winner
  let winner;
  if (!player1HasTiles) {
    winner = 1;
  } else if (!player2HasTiles) {
    winner = 2;
  } else {
    winner = null;
  }
  
  
  let content;
  if (isGameOver) {
    content = 
      <DominoGameOverDialog
        winner={winner}
        onConfirmationDialog={handleConfirmationDialog}
        onRetry={handleRetryGame}
      />
  } else {
    content =
      <>
        <StyledBoard>
          {board}
        </StyledBoard>

        <StyledButton onClick={handleEndTurn}>Robar ficha / Pasar Turno</StyledButton>

        <PlayerArea>
          <PlayerRow active={currentPlayer === 1}>
            <Title active={currentPlayer === 1}>Jugador 1</Title>
            <PlayerTiles>
              {player1Tiles}
            </PlayerTiles>
          </PlayerRow>

          <PlayerRow active={currentPlayer === 2}>
            <Title active={currentPlayer === 2}>Jugador 2</Title>
            <PlayerTiles>
              {player2Tiles}
            </PlayerTiles>
          </PlayerRow>
        </PlayerArea>
      </>
  }
  
  
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
          
          <Timer isBlinking={isTimerBlinking}>Tiempo restante: {formattedTimer}</Timer>
        </Header>
        
        {showExitDialog &&
          <ExitConfirmationDialog
            onConfirmExit={handleConfirmExit}
            onCancelExit={handleCancelExit}
          />
        }
        
        {content}
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
  0% {
    transform: scale(1);
    box-shadow: 0 0 6px rgba(255, 0, 0, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(255, 0, 0, 1);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 6px rgba(255, 0, 0, 0.5);
  }
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
  ${({ isBlinking }) => isBlinking && css`
    animation: ${pulse} 1s infinite;
    color: red;
  `}
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
  /* Removing flex-wrap since it makes the tiles go weirdly */
  /* flex-wrap: wrap; */
  
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #36276b;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  /* Changed width from 70% to 100% */
  width: 100%;
  
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

// const RotateScreenMessage = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 24px;
//   font-family: 'Poppins', sans-serif;
//   color: #6b21a8;
//   height: 100vh;
//   width: 100vw;
//   text-align: center;
// `;


export default DominoGame