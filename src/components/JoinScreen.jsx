import { useAuth0 } from '@auth0/auth0-react';
import styled, { keyframes } from 'styled-components';

// Images
import logo from './../assets/images/JoinScreen/logo digui.svg';


// JoinScreen component
function JoinScreen({ onLogin }) {
  // Used for logging in
  const { loginWithRedirect } = useAuth0();
  
  
  // When the user wants to join, we redirect them to a sign up screen
  async function handleLogin() {
    await loginWithRedirect({
      appState: {
        returnTo: "/Digui/login-success",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };
  
  
  return (
    <Background>
      <GeometricShape shape="circle" color="#B3E5FC" size="150px" top="10%" left="5%" />
      <GeometricShape shape="square" color="#FFCDD2" size="120px" bottom="10%" right="10%" />
      <GeometricShape shape="circle" color="#C5CAE9" size="180px" bottom="20%" left="15%" />
      
      <Container>
        <TextContainer>
          <LargeText>Bienvenido a DIGUI</LargeText>
          <SubText>
            La plataforma educativa diseñada para niños, donde aprender y jugar se unen.
          </SubText>
        </TextContainer>
        
        <LoginBox>
          <Logo src={logo} alt='Logo de DIGUI' />
          <Button onClick={handleLogin}>¡Únete a nosotros!</Button>
        </LoginBox>
      </Container>
    </Background>
  );
}


// Animaciones para deslizar hacia la derecha
const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Animación de flotación para las formas geométricas
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Contenedor principal que divide la pantalla en dos
const Background = styled.div`
  display: flex;
  flex: 1;  /* Ocupa el espacio restante en el flexbox principal */
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3e5f5;
  padding: 0 60px;
  position: relative;
  overflow: hidden;
`;

// Formas geométricas en colores pastel
const GeometricShape = styled.div`
  position: absolute;
  background: ${(props) => props.color};
  border-radius: ${(props) => (props.shape === 'circle' ? '50%' : '0')};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  animation: ${float} 5s ease-in-out infinite;
`;

// Contenedor principal con flexbox para alinear el texto y el formulario
const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  justify-content: space-between;
  align-items: center;
  z-index: 1; /* El texto debe estar detrás del cajón del login */
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding-right: 50px;
  padding-left: 100px;
  animation: ${slideInRight} 1s ease-out;
  z-index: 1; /* Aseguramos que el texto esté detrás del cajón de login */

  @media (max-width: 768px) {
    padding-right: 0;
    padding-left: 0;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const LargeText = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 48px;
  color: #6b21a8;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SubText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #333;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Caja de login/registro
const LoginBox = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 50px;
  max-width: 400px;
  z-index: 2; /* Aseguramos que el cajón del login esté sobre el texto */

  @media (max-width: 768px) {
    width: 90%;
    margin-right: 0;
    padding: 20px;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

// Mejorando el estilo del botón de "Iniciar sesión"
const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 15px;
  background-color: #6b21a8;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #5a189a;
    box-shadow: 0px 4px 15px rgba(107, 33, 168, 0.6);
  }

  &:active {
    background-color: #4b158a;
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 16px;
  }
`;


export default JoinScreen;