import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PhotoUpload from './PhotoUpload';

function PhotoForm({ addPhoto, setPhotoUrls, photosArray, addToArray }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  // const [photosArray, addToArray] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const url = 'https://api.cloudinary.com/v1_1/joehan/image/upload';

  const onUpload = () => {
    if (photosArray.length > 0) {
      setShowSpinner(true);
      const uploadPromise = photosArray.map((file) => uploadPhoto(file));
      Promise.all(uploadPromise)
        .then((result) => {
          setPhotoUrls(result);
        })
        .then(() => {
          setShowSpinner(false);
          setUploaded(true);
        })
        .catch((err) => console.log('error uploading photos', err));
    }
  };

  const uploadPhoto = (file) => {
    setShowSpinner(true);
    const fd = new FormData();
    fd.append('upload_preset', 'upload1');
    fd.append('file', file);
    const config = {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    };
    return axios.post(url, fd, config)
      .then((res) => res.data.url)
      .catch((err) => console.log('error uploading photo', err));
  };

  const onDelete = (index) => {
    photosArray.splice(index, 1);
    addToArray(photosArray);
  };

  useEffect(() => {
    if (photosArray.length === 0) {
      const x = document.getElementById('photoselect');
      x.value = '';
    }
  });

  return (
    <StyledDiv>
      {(!uploaded) && (
        <PhotoUpload
          onFileSelect={(file) => {
            setSelectedPhoto(file);
          }}
          setUploaded={setUploaded}
          addPhoto={addPhoto}
          addToArray={addToArray}
          photosArray={photosArray}
          onDelete={onDelete}
        />
      )}
      {(photosArray.length > 0 && !uploaded)
      && (<StyledButton onClick={onUpload}>upload photo</StyledButton>)}
      {(showSpinner) && (<div><Spinner id="spinner" src="public/icons/spinner.gif" /></div>)}
      {(uploaded) && (<div>photos have been uploaded.</div>)}
    </StyledDiv>
  );
}

const Spinner = styled.img`
  size: auto;
  max-height: 60px;
  background-color: transparent;
`;

const StyledButton = styled.button`
  width: auto;
  max-width: 180px;
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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2%;
  margin-left: 2%;
  width: 80%;
`;

export default PhotoForm;
