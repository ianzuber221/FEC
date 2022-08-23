import React from 'react';
import styled from 'styled-components';

export default function UploadedImages({ photos, resetPhotos }) {
  const deleteImage = (e) => {
    e.preventDefault();
    photos.splice(e.target.value, 1);
    resetPhotos(photos);
    document.getElementById('image-input').value = '';
  };

  return (
    <ThumbnailContainer>
      {(!photos || photos.length === 0) && <p data-testid="no-files-selected">No files selected.</p>}
      {photos && photos.map((photo, index) => (
        <FlexCol key={photo.file}>
          <Thumbnail
            className="obj"
            src={photo.file}
          />
          <FlexRow>
            <DeleteButton onClick={deleteImage} value={index} data-testid="delete-button">x</DeleteButton>
          </FlexRow>
        </FlexCol>
      ))}
    </ThumbnailContainer>
  );
}

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  max-width: 100%;
  overflow: auto;
`;

const Thumbnail = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  padding-right: 2px;
`;

const DeleteButton = styled.button`
  /* background-color: white;
  border: 1px solid grey;
  width: 20px;
  height: 20px;
  font-weight: bold; */
  color: #1c1c1c;
  background-color: white;
  width: auto;
  font-weight: light;
  padding: .25em .5em;
  margin-right: 10px;
  border-radius: 3px;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
  position: absolute;
  top: 0;
  z-index: 201;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  padding-right: 10px;
  justify-content: flex-start;
  align-items: baseline;
`;