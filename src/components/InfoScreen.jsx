import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Images
import star from './../assets/images/star.svg';
import triangle from './../assets/images/triangle.svg';
import informacion from './../assets/images/InfoScreen/informacion.jpg';
import mision from './../assets/images/InfoScreen/mision.jpg';
import vision from './../assets/images/InfoScreen/vision.jpg';

function InfoScreen() {
  const [index, setIndex] = useState(0); // What page number are we on? (aka index)
  
  // All of the pages info in one array of objects
  const info = [
    {
      image: informacion,
      title: '¿Qué es DIGUI?',
      text: 'DIGUI es una marca de juguetes didácticos en la que su diseño está a ' +
        'cargo de una profesional Psicopedagoga, en colaboración con un equipo ' +
        'multidisciplinario de profesionales del área tecnológica.'
    },
    {
      image: mision,
      title: 'Misión de DIGUI',
      text: 'Nuestra misión es fomentar una educación divertida y guiada para niños, ' +
        'ayudando en su crecimiento cognitivo y emocional a través de juguetes ' +
        'diseñados para aprender jugando.'
    },
    {
      image: vision,
      title: 'Visión de DIGUI',
      text: 'La visión de DIGUI es ser una referencia en el mercado de juguetes ' +
        'educativos, desarrollando productos innovadores que apoyen el aprendizaje ' +
        'en los primeros años de vida escolar.'
    }
  ]
  
  // Whenever we click the next button, advance to the next page
  function handleNextButtonClick() {
    if (index < 2) {
      setIndex(index + 1);
    }
  }
  
  function handleDotClick() {
    
  }
  
  return (
    <Container>
      <ImageContainer>
        <Image src={info[index].image}/>
      </ImageContainer>
      
      <TextContainer>
        <Title>{info[index].title}</Title>
        <Text>{info[index].text}</Text>
      </TextContainer>
      
      <PaginationDots>
        <Dot onClick={handleDotClick} />
        <Dot />
        <Dot />
      </PaginationDots>
      
      <NextButton onClick={handleNextButtonClick}>-&gt;</NextButton>
      
    </Container>
  )
}

// Estilos generales con fuentes aplicadas
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #e0f7fa, #f3e5f5); /* Gradiente más suave */
  position: relative;
  overflow: hidden;

  /* Añadimos formas geométricas como estrellas, triángulos y círculos */
  &::before, &::after {
    content: '';
    position: absolute;
    z-index: 0;
  }

  &::before {
    background-image: url(${star});
    width: 100px;
    height: 100px;
    top: 10%;
    left: -50px;
    transform: rotate(15deg);
  }

  &::after {
    background-image: url(${triangle});
    width: 150px;
    height: 150px;
    bottom: -50px;
    right: -50px;
    transform: rotate(-30deg);
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  z-index: 0;
  opacity: 0.4;
  pointer-events: none; /* Desactiva interacciones del ratón */
`;

const ImageContainer = styled.div`
  width: 80vw;
  height: 40vh;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Asegura que la imagen esté sobre las formas */
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextContainer = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1;
`;

const Title = styled.h2`
  font-family: 'Baloo 2', cursive;  /* Fuente Baloo */
  font-size: 30px;  /* Encabezado con +30pt */
  color: #6b21a8;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-family: 'Quicksand', sans-serif;  /* Fuente Quicksand */
  font-size: 16px;  /* Texto de cuerpo con +10pt */
  color: #333;
`;

const PaginationDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Dot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => (props.active ? "#6b21a8" : "#ccc")};
  margin: 0 8px;
  cursor: pointer;
`;

const NextButton = styled.button`
  background-color: #6b21a8;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 50%;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #5a189a;
  }
`;


// Animaciones para imágenes y textos
const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } },
};

export default InfoScreen;