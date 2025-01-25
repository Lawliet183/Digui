import { useAuth0 } from '@auth0/auth0-react';
import styled, { keyframes } from 'styled-components';

// Images
import profilePicture from './../assets/images/ProfileScreen/profile-picture.png';


// ProfileScreen component
function ProfileScreen() {
  // Used for logging out the user
  const { logout } = useAuth0();
  
  
  // When the user logs out, return to the root page (/Digui)
  function handleLogout() {
    logout({
      logoutParams: {
        returnTo: window.location.origin + '/Digui',
      }
    });
  };
  
  
  return (
    <SettingsContainer>
      <AvatarContainer>
        <img
          src={profilePicture}
          alt="Avatar"
          style={{ width: '100%', borderRadius: '50%' }}
        />
      </AvatarContainer>
      
      <Username>Liam</Username>
        
      <SettingsList>
        <SettingsItem>
          <span>Nombre</span>
          <span>No Disponible</span>
        </SettingsItem>
        
        <SettingsItem>
          <span>Apellido(s)</span>
          <span>No Disponible</span>
        </SettingsItem>
        
        <SettingsItem>
          <span>Correo</span>
          <span>No Disponible</span>
        </SettingsItem>
      </SettingsList>
      
      <ChangeChildButton>Cambiar niño</ChangeChildButton>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
    </SettingsContainer>
  );
}


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

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background-color: #f3e5f5;
  
  /* Changed from 100px to 10px for the top and 30 px for the bottom */
  padding-top: 10px; /* Aumentar el espacio para la barra superior */
  padding-bottom: 30px; /* Aumentar el espacio para la barra inferior */
  
  /* Added padding to the left and right for portrait screens */
  padding-left: 20px;
  padding-right: 20px;
  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Hacer scroll si el contenido es demasiado grande */
`;

const LogoutButton = styled.button`
  background-color: #ff5c5c;
  color: white;
  padding: 15px;
  border-radius: 15px;
  margin-top: 20px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e04a4a;
  }
  
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ChangeChildButton = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 12px;
  border-radius: 15px;
  margin-top: 20px;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a189a;
  }
  
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const AvatarContainer = styled.div`
  margin: 20px 0;
  width: 160px;
  height: 160px;
  background-color: #e0b3ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Username = styled.h2`
  font-family: 'Baloo 2', cursive;
  color: #6b21a8;
  font-size: 26px;
  margin-bottom: 15px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SettingsList = styled.div`
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SettingsItem = styled.div`
  background-color: #6b21a8;
  color: white;
  padding: 20px;
  border-radius: 15px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  transition: transform 0.3s ease;
  width: 90%;

  &:hover {
    transform: translateY(-5px);
  }
`;


export default ProfileScreen;