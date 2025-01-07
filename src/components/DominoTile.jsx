import styled from 'styled-components';


// DominoTile component
function DominoTile({ tile }) {
  return (
    <TileContainer>
      <TileImage src={tile} />
    </TileContainer>
  );
}


// Styled Components
const TileContainer = styled.div`
  /* Removing margin, gaps are too big otherwise */
  /* margin: 10px; */
  cursor: pointer;
`;

const TileImage = styled.img`
  width: 90px;
  height: 40px;
  border-radius: 10px;
`;

const FlippedTile = styled.div`
  display: flex;
  width: 90px;
  height: 40px;
  background-color: #894192;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;


export default DominoTile;