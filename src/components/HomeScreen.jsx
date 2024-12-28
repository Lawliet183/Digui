import styled, { keyframes } from 'styled-components';


function HomeScreen() {
  // An array of objects containing all of the news
  const newsList = [
    {
      headline: 'Actualización de juegos',
      description: `¡Nuevo juego disponible! 'Ruleta de la Suerte' ha sido añadido ` +
      `para que los niños disfruten.`
    },
    {
      headline: 'Nueva sección de educación',
      description: 'Ahora puedes acceder a lecciones interactivas en la sección de educación.'
    },
    {
      headline: 'Mejoras en la interfaz',
      description: 'La aplicación ahora cuenta con una navegación más rápida y ' +
        'una interfaz más amigable.'
    },
    {
      headline: 'Desarrollo de Digui',
      description: 'Estamos trabajando en mejorar la experiencia de usuario e ' +
        'integrando nuevas funcionalidades.'
    },
    {
      headline: 'Nuevos juegos en camino',
      description: 'Se están desarrollando varios minijuegos educativos que estarán ' +
        'disponibles pronto.'
    },
  ]
  
  const currentNews = newsList.map((value, index) => {
    return (
      <NewsItem key={index}>
        <NewsHeadline>{value.headline}</NewsHeadline>
        <NewsDescription>{value.description}</NewsDescription>
      </NewsItem>
    );
  });
  
  
  return (
    <ScrollableContent>
      <WelcomeMessage>¡Bienvenido a Digui!</WelcomeMessage>
      
      <QuickAccessContainer>
        <QuickAccessButton>Juegos</QuickAccessButton>
        <QuickAccessButton>Educación</QuickAccessButton>
      </QuickAccessContainer>
      
      <ImportantNews bgColor="#ffecb3">
        Descubre todas las novedades en nuestra plataforma.
      </ImportantNews>
      
      <ImportantNews bgColor="#b3e5fc">
        Interactúa con juegos educativos diseñados para niños.
      </ImportantNews>
      
      <NewsSection>
        <NewsTitle>Últimas Noticias</NewsTitle>
        {currentNews}
      </NewsSection>
    </ScrollableContent>
  )
}


// Animación de fade-in para las noticias
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animación de desplazamiento para efectos de paralaje
const parallaxScroll = keyframes`
  0% {
    background-position: center top;
  }
  100% {
    background-position: center bottom;
  }
`;

// Contenedor principal para la pantalla de inicio
/*
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3e5f5;
`;
*/

// Contenedor del contenido entre TopBar y BottomNavBar, centrado y desplazable
const ScrollableContent = styled.div`
  flex: 1;
  padding-top: 80px; /* Altura de la barra superior */
  padding-bottom: 80px; /* Altura de la barra inferior */
  overflow-y: auto;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; /* Centrar el texto */
  background: linear-gradient(180deg, #e3f2fd 0%, #f3e5f5 100%);
  background-size: cover;
  animation: ${parallaxScroll} 10s ease-in-out infinite alternate;
`;

// Sección que cambia de color en función del scroll
// It doesn't..., this is just a div similar to NewsItem
// Changing the name from DynamicSection to ImportantNews
// (What should it even be called?!)
const ImportantNews = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  margin-bottom: 30px;
  background-color: ${props => props.bgColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  transition: background-color 0.5s ease;
`;

// Mensaje de bienvenida
const WelcomeMessage = styled.h1`
  font-family: 'Baloo 2', cursive;
  color: #6b21a8;
  font-size: 36px;
  margin-bottom: 20px;
`;

// Botones de acceso rápido, centrados
// This is the CONTAINER for the buttons, guh
const QuickAccessContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; /* Añadido un gap entre los botones */
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px; /* Espacio debajo de los botones */
`;

// Botones de acceso rápido
const QuickAccessButton = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9f5dc4;
  }
`;

// Sección de noticias o actualizaciones, centrada
const NewsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const NewsTitle = styled.h2`
  font-family: 'Baloo 2', cursive;
  color: #6b21a8;
  font-size: 28px;
  margin-bottom: 20px;
`;

// Contenedor de cada noticia
const NewsItem = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const NewsHeadline = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #333;
  margin: 0 0 5px;
`;

const NewsDescription = styled.p`
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  color: #555;
  margin: 0;
`;


export default HomeScreen;