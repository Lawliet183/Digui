import styled from 'styled-components';

// Images
import profilePicture from './../assets/images/ProfileScreen/profile-picture.png';


// ProfileScreen component
function ProfileScreen() {
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
      <LogoutButton>Cerrar sesión</LogoutButton>
    </SettingsContainer>
  )
}


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
`;

const Username = styled.h2`
  font-family: 'Baloo 2', cursive;
  color: #6b21a8;
  font-size: 26px;
  margin-bottom: 15px;
  text-align: center;
`;

const SettingsList = styled.div`
  width: 100%;
  max-width: 400px;
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

/*const SmallLabel = styled.p`
  font-size: 14px;
  color: #b8a9d2;
`;*/

const FixedTopBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BottomNavBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;


export default ProfileScreen;