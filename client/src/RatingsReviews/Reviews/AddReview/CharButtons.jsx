import React, { useState } from 'react';
import styled from 'styled-components';

function CharButtons({ char, setChar }) {
  const [rating, setRating] = useState('');
  const handleClick = (e) => {
    const x = document.getElementById(e.target.id);
    if (rating !== '') {
      const y = document.getElementById(`${char}-${rating}`);
      y.style.backgroundColor = 'white';
      y.style.opacity = '100%';
    }
    x.style.backgroundColor = 'grey';
    x.style.opacity = '50%';
    setRating(e.target.value);
    setChar(char, e.target.value);
  };

  return (
    <div>
      <StyledButton id={`${char}-1`} onClick={handleClick} value="1">1</StyledButton>
      <StyledButton id={`${char}-2`} onClick={handleClick} value="2">2</StyledButton>
      <StyledButton id={`${char}-3`} onClick={handleClick} value="3">3</StyledButton>
      <StyledButton id={`${char}-4`} onClick={handleClick} value="4">4</StyledButton>
      <StyledButton id={`${char}-5`} onClick={handleClick} value="5">5</StyledButton>
    </div>
  );
}

const StyledButton = styled.button`
  width: 50px;
  height: 25px;
  font-size: small;
  margin: 0;
  padding: 0.25em 1em;
  border-radius: 3px;
  background: white;
  color: black;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    background-color: #d9d9d9;
    opacity: 60%;
  }
`;

export default CharButtons;
