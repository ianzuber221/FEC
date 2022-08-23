import React from 'react';
import styled from 'styled-components';

export default function FormButton({ handleSubmit = () => {}, handleClose }) {
  return (
    <DivButton className="form-buttons">
      <StyledButton type="submit" onClick={handleSubmit} data-testid="form-button-test">
        Submit
      </StyledButton>
      <StyledButton onClick={handleClose} data-testid="close-button-test">
        Close
      </StyledButton>
    </DivButton>
  );
}

const StyledButton = styled.button`
  width: auto;
  max-width: 100px;
  font-size: small;
  margin: 1%;
  margin-right: 3%;
  padding: 0.25em 1em;
  border-radius: 3px;
  background: white;
  color: black;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const DivButton = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
