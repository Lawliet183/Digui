import styled, { keyframes } from 'styled-components';

// Images
import emptyStar from './../assets/images/ABCPiensaWinnerScreen/EmptyStar.svg';
import fullStar from './../assets/images/ABCPiensaWinnerScreen/FullStar.svg';


// ABCPiensaWinnerScreen component
function ABCPiensaWinnerScreen({ onRetry, onExitToMenu, finishTimer }) {
  const confettiColors = ['#ff5252', '#ffb74d', '#4caf50', '#40c4ff', '#ab47bc', '#ffd700'];
  
  
  const score = Math.floor((finishTimer / 60) * 100);
  
  function getStars() {
    if (score >= 80) {
      return 3;
    } else if (score >= 50) {
      return 2;
    } else {
      return 1;
    }
  }
  
  const stars = getStars();
  
  // Generate all of the confetti squares
  let confetti = [];
  for (let i = 0; i < 150; i++) {
    const index = Math.floor(Math.random() * confettiColors.length);
    
    confetti.push(
      <Confetti
        key={i}
        x={Math.random() * 100}
        y={Math.random() * 100}
        color={confettiColors[index]}
      />
    );
  }
  
  return (
    <WinnerContainer>
      <Shape shape="circle" size={150} top={10} left={10} duration={6} />
      <Shape shape="square" size={100} top={50} left={80} duration={8} />
      <Shape shape="circle" size={200} top={30} left={30} duration={10} />
      <Shape shape="square" size={120} top={70} left={20} duration={5} />
      
      <MotivationalBox>
        <p>¡Eres increíble!</p>
        <p>No te rindas, sigue esforzándote cada día.</p>
        <p>¡Cada intento te acerca más a la meta!</p>
        <p>¡La práctica te hará un maestro!</p>
      </MotivationalBox>
      
      <ContentBox>
        <Title>¡Ganaste!</Title>
        <Score>Puntos: {score}</Score>
        
        <StarsContainer>
          <Star src={fullStar} delay={1.0} alt='Estrella llena' />
          <Star
            src={(stars >= 2) ? fullStar : emptyStar}
            delay={1.8}
            alt={(stars >= 2) ? 'Estrella llena' : 'Estrella vacía'}
          />
          <Star
            src={(stars >= 3) ? fullStar : emptyStar}
            delay={2.6}
            alt={(stars >= 3) ? 'Estrella llena' : 'Estrella vacía'}
          />
        </StarsContainer>
        
        <Button onClick={onRetry}>Jugar de nuevo</Button>
        <Button onClick={onExitToMenu}>Salir al menú</Button>
      </ContentBox>
      
      <ConfettiContainer>
        {confetti}
      </ConfettiContainer>
    </WinnerContainer>
  );
}


// Animaciones
const fadeInFromCenter = keyframes`
  0% {
    transform: translate(-50%, -50%);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const buttonClick = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const pop = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const ConfettiFall = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

// Contenedores y estilos
const WinnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #d292bc, #ffffff); /* Fondo claro con gradiente */
  overflow: hidden;
  color: #1d1d1b;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentBox = styled.div`
  background: linear-gradient(135deg, #ffffff, #f3e5f5);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 90%;
  width: 400px;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeInFromCenter} 1s ease forwards;
  opacity: 0;
  transform: translate(50%, 50%);

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const MotivationalBox = styled.div`
  width: 300px;
  padding: 20px;
  margin-right: 20px;
  text-align: left;
  font-family: 'Baloo 2', cursive; /* Fuente Baloo 2 */
  font-size: 28px; /* Tamaño más grande */
  color: #6b21a8;
  animation: ${fadeInFromCenter} 1s ease forwards;
  opacity: 0;
  transform: translate(-50%, 50%);

  @media (max-width: 768px) {
    width: 90%;
    margin: 0;
    text-align: center;
    font-size: 24px;
  }
`;

const Title = styled.h2`
  font-family: 'Baloo 2', cursive; /* Aplicamos la fuente Baloo 2 */
  font-size: 50px;
  color: #36276b; /* Color del título en morado oscuro */
  margin-bottom: 20px;
  animation: ${pop} 0.8s ease, ${bounce} 2s ease infinite;

  @media (orientation: portrait) {
    font-size: 40px;
  }
`;

const Score = styled.div`
  font-family: 'Baloo 2', cursive; /* Aplicamos la fuente Baloo 2 */
  font-size: 40px;
  color: #6b21a8;
  margin-bottom: 20px;
  animation: ${pop} 1s ease;

  @media (orientation: portrait) {
    font-size: 28px;
  }
`;

// Estilos para las estrellas
const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Star = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 10px;
  animation: ${pop} 0.5s ease forwards, ${bounce} 1.5s ease-in-out infinite;
  opacity: 0;
  animation-delay: ${(props) => props.delay}s;
`;

// Botones
const Button = styled.button`
  background-color: #894192; /* Pantone 258C */
  color: white;
  padding: 12px 25px;
  font-size: 22px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  animation: ${pop} 1.2s ease;

  &:hover {
    background-color: #36276b; /* Pantone 273C */
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    animation: ${buttonClick} 0.2s ease;
  }
`;

const ConfettiContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  animation: ${ConfettiFall} 3s ease-in-out infinite;
`;

// Geometric shapes floating animation
const Shape = styled.div`
  position: absolute;
  background-color: #6b21a8; /* Morado principal */
  opacity: 0.2;
  border-radius: ${(props) => (props.shape === 'circle' ? '50%' : '0%')};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: ${floatAnimation} ${(props) => props.duration}s ease-in-out infinite;
`;


export default ABCPiensaWinnerScreen;