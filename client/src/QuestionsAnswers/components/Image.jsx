import React, { useState } from 'react';
import styled from 'styled-components';
import resizeThumbnail from '../../RatingsReviews/lib/resizeThumbnail';

export default function Image({ url }) {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <StyledImg
        src={resizeThumbnail(url, 100)}
        onClick={() => setClicked(true)}
      />
      {clicked
      && (
      <ModalOverlay>
        <ModalImg src={resizeThumbnail(url, window.innerHeight)} />
        <CloseButton onClick={() => setClicked(false)}>X</CloseButton>
      </ModalOverlay>
      )}
    </>
  );
}

const StyledImg = styled.img`
  height: 100px;
  margin: 0 1px;
  scale: auto;
  border: 1px solid #d9d9d9;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const ModalImg = styled.img`
  border: 1px solid #d9d9d9;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  background-color: rgba(0,0,0,.7);
`;

const CloseButton = styled.button`
  float: right;
  font-size: 20px;
`;