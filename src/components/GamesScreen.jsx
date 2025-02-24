import styled, { keyframes } from 'styled-components';

// Images
import ABCPiensaIcon from './../assets/images/MainMenuScreen/ABCPiensaIcon.svg';
import DominoIcon from './../assets/images/MainMenuScreen/DominoIcon.png';
import LanzaIcon from './../assets/images/MainMenuScreen/LanzaIcon.png';
import RuletaIcon from './../assets/images/MainMenuScreen/RuletaIcon.png';
import WordDecoderIcon from './../assets/images/MainMenuScreen/WordDecoderIcon.png';


// GamesScreen component
function GamesScreen({ onGameSelected }) {
  let desiredGame;
  
  function handleABCPiensaSelected() {
    desiredGame = 'abc-piensa-difficulty-menu';
    onGameSelected(desiredGame)
  }
  
  function handleDominoSelected() {
    desiredGame = 'domino';
    onGameSelected(desiredGame);
  }
  
  function handleLanzaSelected() {
    desiredGame = 'lanza-y-diviertete';
    onGameSelected(desiredGame);
  }
  
  function handleRuletaSelected() {
    desiredGame = 'ruleta';
    onGameSelected(desiredGame);
  }
  
  function handleWordDecoderSelected() {
    desiredGame = 'word-decoder';
    onGameSelected(desiredGame);
  }
  
  return (
    <GameContent>
      <GameGrid>
        <GameCard onClick={handleABCPiensaSelected}>
          <GameImage src={ABCPiensaIcon} alt='Icono de ABC Piensa' />
          <GameTitle>ABC Piensa!</GameTitle>
        </GameCard>

        <GameCard onClick={handleDominoSelected}>
          <GameImage src={DominoIcon} alt='Icono de Domino' />
          <GameTitle>Dominó</GameTitle>
        </GameCard>

        <GameCard onClick={handleLanzaSelected}>
          <GameImage src={LanzaIcon} alt='Icono de Lanza y Diviértete' />
          <GameTitle>¡Lanza y Diviértete!</GameTitle>
        </GameCard>

        <GameCard onClick={handleRuletaSelected}>
          <GameImage src={RuletaIcon} alt='Icono de Ruleta de la Suerte' />
          <GameTitle>Ruleta de la Suerte</GameTitle>
        </GameCard>

        <GameCard onClick={handleWordDecoderSelected}>
          <GameImage src={WordDecoderIcon} alt='Icono de Decodificador de Palabras' />
          <GameTitle>Decodificador de Palabras</GameTitle>
        </GameCard>
      </GameGrid>
    </GameContent>
  );
}


// Animación de fade-in para las tarjetas del juego
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px); /* Pequeño desplazamiento desde abajo */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Aparece en la posición final */
  }
`;

// Contenido del juego con espacio para las barras superior e inferior
const GameContent = styled.div`
  flex: 1;
  padding: 80px 20px 90px;
  overflow-x: auto; /* Habilitamos el desplazamiento horizontal */
  display: flex; /* Perhaps this could be changed... */
  align-items: center;
  scroll-snap-type: x mandatory; /* Añadimos scroll-snap para la experiencia de deslizamiento */
  -webkit-overflow-scrolling: touch; /* Mejora la experiencia en móviles */
  
  @media (max-width: 768px) and (orientation: portrait) {
    flex-direction: column; /* Cambiamos a layout vertical */
    overflow-y: auto; /* Habilitamos el scroll vertical */
    overflow-x: hidden;
    scroll-snap-type: y mandatory; /* El scroll ahora se ajusta verticalmente */
    height: auto;
  }
`;

// Estilos para GameGrid, GameCard, etc.
const GameGrid = styled.div`
  display: flex; /* Ahora será un contenedor flexible horizontal */
  
  /* Changed from 30px to 2vw */
  gap: 2vw; /* Espacio entre tarjetas mayor en pantallas grandes */
  
  justify-items: center;
  align-items: center;
  scroll-snap-align: start; /* Cada tarjeta se ajusta al inicio del scroll */

  @media (max-width: 768px) and (orientation: portrait) {
    flex-direction: column; /* En pantallas delgadas, cambiamos a layout vertical */
    gap: 20px; /* Ajustamos el espacio entre los juegos en vertical */
  }
`;

const GameCard = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #fff;
  border-radius: 20px; /* Aumentamos el border-radius */
  padding: 20px; /* Ajustamos el padding */
  
  /* Changed width from 235px to 16%, and height from 235px to 32vh */
  width: 16%;
  height: 32vh;
  
  /* Changed width and height from 250px to 235px */
  /* width: 235px; */ /* Ajustamos el ancho */
  /* height: 235px; */ /* Hacemos la tarjeta cuadrada */
  
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada */
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  scroll-snap-align: start; /* Ajustar al comienzo del scroll */

  &:hover {
    transform: translateY(-15px) scale(1.08); /* Aumentamos el hover effect */
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25); /* Más sombra en hover */
  }

  &:active {
    transform: scale(0.98);
  }

  /* Added width equal to 235px */
  @media (max-width: 768px) and (orientation: portrait) {
    width: 235px;
    max-width: 100%; /* En pantallas verticales, ocupará todo el ancho */
    height: auto; /* Permitimos que el contenido ajuste la altura */
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%; /* Hacemos que la imagen ocupe toda la tarjeta cuadrada */
  border-radius: 15px; /* Ajustamos el border-radius */
  object-fit: cover;
  margin-bottom: 10px; /* Reducimos el margen inferior */

  @media (max-width: 768px) {
    height: 180px; /* Ajusta la altura de las imágenes para pantallas medianas */
  }

  @media (max-width: 576px) {
    height: 150px; /* Imágenes más pequeñas para pantallas entre 576px y 768px */
  }

  @media (max-width: 480px) {
    height: 140px; /* Imágenes más pequeñas en pantallas pequeñas */
  }
`;

const GameTitle = styled.h3`
  font-family: 'Baloo 2', cursive;
  font-size: 22px; /* Aumentamos el tamaño de la fuente */
  color: #6b21a8;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px; /* Ajusta el tamaño de la fuente para pantallas medianas */
  }

  @media (max-width: 576px) {
    font-size: 16px; /* Ajusta el tamaño de la fuente para pantallas entre 576px y 768px */
  }

  @media (max-width: 480px) {
    font-size: 14px; /* Ajusta el tamaño de la fuente para pantallas pequeñas */
  }
`;


export default GamesScreen;