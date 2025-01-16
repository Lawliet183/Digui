import { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

// Tasks (the things that the players must do)
import tasks from './RuletaTasksDatabase.jsx';

// Components
import ExitConfirmationDialog from './ExitConfirmationDialog.jsx';


// Definimos los nombres de los participantes
const participantsList = ['Participante 1', 'Participante 2', 'Participante 3'];


// RuletaGame component
function RuletaGame({ onExitToMenu }) {
  // Whether the exit confirmation dialog should be shown or not
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // What participant is currently being highlighted
  const [participantActiveIndex, setParticipantActiveIndex] = useState(null);
  
  // Whether the card should be flipped and reveal the task to be done
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  
  // Whether the roulette is currently spinning
  const [isRouletteSpinning, setIsRouletteSpinning] = useState(false);
  
  // What is the currently selected task
  const [selectedTask, setSelectedTask] = useState('');
  
  
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
  
  // When the user wants to spin the roulette
  function handleRouletteSpin() {
    setIsCardFlipped(false);
    setIsRouletteSpinning(true);
    
    const totalIterations = 15 + Math.floor(Math.random() * participantsList.length);
    
    for (let i = 1; i <= totalIterations; i++) {
      setTimeout(() => {
        const currentActiveIndex = (i - 1) % participantsList.length
        setParticipantActiveIndex(currentActiveIndex);
        
        if (i >= totalIterations) {
          const taskIndex = Math.floor((Math.random() * 100) % tasks.length);
          setSelectedTask(tasks[taskIndex]);
          
          setTimeout(() => {
            setIsCardFlipped(true);
            setIsRouletteSpinning(false);
          }, 500);
        }
      }, i * 200);
    }
  }
  
  
  const participants = participantsList.map((name, index) => {
    return (
      <Participant key={index} isActive={index === participantActiveIndex}>{name}</Participant>
    );
  });
  
  
  return (
    <RuletaContainer>
      <HeaderText>Ruleta de la Suerte</HeaderText>
      
      <ParticipantsContainer>
        {participants}
      </ParticipantsContainer>
      
      <DeckContainer>
        <Card isFlipped={isCardFlipped}>
          <CardFront>
            <TextWrapper>Ruleta</TextWrapper>
          </CardFront>
          
          <CardBack>
            <TextWrapper>{selectedTask}</TextWrapper>
          </CardBack>
        </Card>
      </DeckContainer>
      
      <SpinButton
        onClick={handleRouletteSpin}
        style={{ marginTop: '20px' }}
        disabled={isRouletteSpinning}
      >
        {isRouletteSpinning ? 'Girando...' : 'Girar la ruleta'}
      </SpinButton>
      
      <SpinButton onClick={handleConfirmationDialog} style={{ marginTop: '10px' }}>
        Volver al menú principal
      </SpinButton>
      
      {showExitDialog &&
        <ExitConfirmationDialog
          onConfirmExit={handleConfirmExit}
          onCancelExit={handleCancelExit}
        />
      }
    </RuletaContainer>
  );
}


// Contenedor principal con un nuevo fondo de gradiente suave
const RuletaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #d8b4fe, #f3e5f5, #ffe39f); /* Gradiente personalizado */
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

// Header text that goes above the participants
const HeaderText = styled.div`
  font-family: 'Baloo 2';
  font-size: 32px;
  color: #6b21a8;
  margin-bottom: 10px;
`;

// Estilos para el botón de girar
const SpinButton = styled.button`
  padding: 14px 28px;
  font-size: 20px;
  background: linear-gradient(135deg, #d8b4fe, #b39ddb); /* Colores púrpuras */
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

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

// Contenedor de los participantes
const ParticipantsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
  }
`;

// Estilos para cada participante
const Participant = styled.div`
  flex: 1;
  padding: 20px;
  font-size: 18px;
  color: #333;
  text-align: center;
  background-color: ${({ isActive }) => (isActive ? '#ffe39f' : '#fff')};
  border: 3px solid #6b21a8;
  border-radius: 50%; /* Redondeado como fichas de casino */
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  ${({ isActive }) => isActive && `
    transform: scale(1.1);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
  `}

  &:hover {
    transform: scale(1.05);
    background-color: #ffe39f;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 16px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

// Contenedor del mazo de cartas
const DeckContainer = styled.div`
  perspective: 1000px;
  margin-top: 20px;
`;

// Estilos para la carta (el contenedor de ambas caras)
const Card = styled.div`
  width: 150px;
  height: 200px;
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


export default RuletaGame;