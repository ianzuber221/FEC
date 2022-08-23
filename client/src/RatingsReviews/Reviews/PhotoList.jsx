import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoPopup from './PhotoPopup';
import resizeThumbnail from '../lib/resizeThumbnail';

function PhotoList({ photos }) {
  const [openPhotoPop, setOpenPhotoPop] = useState(false);
  const [photo, setPhoto] = useState('');

  const togglePhotoPop = (e) => {
    if (!openPhotoPop) {
      setOpenPhotoPop(true);
      setPhoto(e.target.id);
    } else {
      setOpenPhotoPop(false);
    }
  };

  return (
    <PhotoDiv>
      {photos.map((photo, index) => (
        <StyledImg
          data-testid={`photo-${index}`}
          key={`${photo.url}-${index}`}
          id={photo.url}
          src={resizeThumbnail(photo.url, 100)}
          onClick={togglePhotoPop}
        />
      ))}
      {(openPhotoPop)
            && (
            <PhotoPopup
              togglePhotoPop={togglePhotoPop}
              photoUrl={photo}
            />
            )}
    </PhotoDiv>
  );
}

const StyledImg = styled.img`
  height: 100px;
  width: auto;
  scale: auto;
  border: 1px solid #d9d9d9;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
  transition: opacity .4s;
`;

const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  overflow-x: auto;
`;

export default PhotoList;
