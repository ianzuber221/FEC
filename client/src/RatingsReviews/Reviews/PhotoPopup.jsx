import React from 'react';
import styled from 'styled-components';

function PhotoPopup({ photoUrl, togglePhotoPop }) {
  const handleClick = (e) => {
    if (e.target.id === 'photopop') {
      togglePhotoPop(e);
    }
  };

  return (
    <StyledForm onClick={handleClick} id="photopop">
      <StyledInner id="photopop-inner" data-testid="photopop">
        <StyledImg src={photoUrl} />
        <StyledButton onClick={togglePhotoPop}>CLOSE</StyledButton>
      </StyledInner>
    </StyledForm>
  );
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const StyledInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: auto;
  height: auto;
  max-width: 60%;
  max-height: 60%;
  padding: 1.5%;
  overflow-y: auto;
  background: #ffffff;
  border: 1px solid black;
  font-size:small;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`;

const StyledButton = styled.button`
  width: auto;
  max-width: 100px;
  font-size: small;
  margin: 2%;
  padding: 0.25em 1em;
  background: white;
  color: black;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const StyledImg = styled.img`
  height: 80%;
  size: auto;
`;

export default PhotoPopup;
