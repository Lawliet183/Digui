import styled from 'styled-components';


// TopBar component
function TopBar({ title }) {
  return (
    <TopBarContainer>
      <Title>{title}</Title>
    </TopBarContainer>
  );
}


const TopBarContainer = styled.div`
  background-color: #6b21a8;
  padding: 10px;
  text-align: center;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
`;

const Title = styled.h1`
  font-size: 26px; /* Tamaño de fuente ligeramente más grande */
  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;


export default TopBar;