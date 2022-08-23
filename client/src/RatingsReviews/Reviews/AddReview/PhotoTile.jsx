import React from 'react';
import styled from 'styled-components';

function PhotoTile({ photo, value, onDelete }) {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    console.log(value);
    onDelete(value);
  };
  return (
    <Div>
      <StyledImg src={photo} id={`img-${value}`} />
      <Remove onClick={handleClick}>X</Remove>
    </Div>
  );
}

const Div = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Remove = styled.button`
  font-size: 13px;
  width: 14px;
  height: 14px;
  align-content: center;
  justify-content: center;
  margin: 1%;
  background: white;
  border: .5px solid black;
  padding: 1%;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const StyledImg = styled.img`
  max-height: 48px;
  scale: auto;
  border: 1px solid #d9d9d9;
  margin: 2%;
  margin-left: 0%;
`;

export default PhotoTile;
