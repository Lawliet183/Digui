import styled from 'styled-components';
import { FaHome, FaBook, FaGamepad, FaBell, FaCog } from 'react-icons/fa';


// BottomNavBar component
function BottomNavBar({ onSectionChange }) {
  const buttonSize = 24;
  
  let desiredSection;
  
  // Whenever the user clicks on a button, we inform the parent component to change
  // to that specific section
  function handleHomeSelected() {
    desiredSection = 'home';
    onSectionChange(desiredSection)
  }
  
  function handleEducationSelected() {
    desiredSection = 'education';
    onSectionChange(desiredSection)
  }
  
  function handleGamesSelected() {
    desiredSection = 'games';
    onSectionChange(desiredSection)
  }
  
  function handleNotificationsSelected() {
    desiredSection = 'notifications';
    onSectionChange(desiredSection)
  }
  
  function handleProfileSelected() {
    desiredSection = 'profile';
    onSectionChange(desiredSection)
  }
  
  
  return (
    <NavBarContainer>
      <NavButton onClick={handleHomeSelected}>
        <FaHome size={buttonSize} />
        <ButtonLabel>Inicio</ButtonLabel>
      </NavButton>
      
      <NavButton onClick={handleEducationSelected}>
        <FaBook size={buttonSize} />
        <ButtonLabel>Educación</ButtonLabel>
      </NavButton>
      
      <NavButton onClick={handleGamesSelected}>
        <FaGamepad size={buttonSize} />
        <ButtonLabel>Juegos</ButtonLabel>
      </NavButton>
      
      <NavButton onClick={handleNotificationsSelected}>
        <FaBell size={buttonSize} />
        <ButtonLabel>Notificaciones</ButtonLabel>
      </NavButton>
      
      <NavButton onClick={handleProfileSelected}>
        <FaCog size={buttonSize} />
        <ButtonLabel>Perfil</ButtonLabel>
      </NavButton>
    </NavBarContainer>
  )
}


const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #6b21a8;
  padding: 15px 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonLabel = styled.span`
  font-size: 13px;
  margin-top: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;


export default BottomNavBar;