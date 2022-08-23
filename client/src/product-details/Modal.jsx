/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable arrow-body-style */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useState } from 'react';

function Modal({
  mainImage, galleryList, setModal, modalZoom, setModalZoom, range, handlePrevClick, handleNextClick,
}) {
  const [mouse, setMouse] = useState([0, 0]);

  const handleImageGalleryModalClose = (event) => {
    setModalZoom(false);
    setModal('off');
  };

  const handleModalClick = (event) => {
    setModalZoom((modalZoom) => !modalZoom);
  };

  const handleModalMove = (event) => {
    setMouse([event.pageX, event.pageY]);
  };

  if (galleryList.length > 7) {
    if (range[0] === 0) {
      return (
        <div className="imageGalleryModal">
          <div className="closeImageGalleryModal">
            <button type="button" onClick={handleImageGalleryModalClose}>X</button>
          </div>
          <div className="thumbnailView">
            {galleryList.slice(range[0], range[1])}
            <div className="imageGalleryNext" onClick={handleNextClick}>&#9002;</div>
          </div>
          <div className="mainImageContainerModal" onClick={handleModalClick} onMouseMove={handleModalMove} style={{ transform: modalZoom ? 'scale(2.5)' : 'scale(1)', transformOrigin: modalZoom ? `${mouse[0]}px ${mouse[1]}px` : 'center' }}>
            {mainImage}
          </div>
        </div>
      );
    } else if (range[1] === galleryList.length - 1) {
      return (
        <div className="imageGalleryModal">
          <div className="closeImageGalleryModal">
            <button type="button" onClick={handleImageGalleryModalClose}>X</button>
          </div>
          <div className="thumbnailView">
            <div className="imageGalleryPrev" onClick={handlePrevClick}>&#9001;</div>
            {galleryList.slice(range[0], range[1])}
          </div>
          <div className="mainImageContainerModal" onClick={handleModalClick} onMouseMove={handleModalMove} style={{ transform: modalZoom ? 'scale(2.5)' : 'scale(1)', transformOrigin: modalZoom ? `${mouse[0]}px ${mouse[1]}px` : 'center' }}>
            {mainImage}
          </div>
        </div>
      );
    } else {
      return (
        <div className="imageGalleryModal">
          <div className="closeImageGalleryModal" onClick={handleImageGalleryModalClose}>
            <button type="button">X</button>
          </div>
          <div className="thumbnailView">
            <div className="imageGalleryPrev" onClick={handlePrevClick}>&#9001;</div>
            {galleryList.slice(range[0], range[1])}
            <div className="imageGalleryNext" onClick={handleNextClick}>&#9002;</div>
          </div>
          <div className="mainImageContainerModal" onClick={handleModalClick} onMouseMove={handleModalMove} style={{ transform: modalZoom ? 'scale(2.5)' : 'scale(1)', transformOrigin: modalZoom ? `${mouse[0]}px ${mouse[1]}px` : 'center' }}>
            {mainImage}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="imageGalleryModal">
        <div className="closeImageGalleryModal">
          <button type="button" onClick={handleImageGalleryModalClose}>X</button>
        </div>
        <div className="thumbnailView">
          {galleryList}
        </div>
        <div className="mainImageContainerModal" onClick={handleModalClick} onMouseMove={handleModalMove} style={{ transform: modalZoom ? 'scale(2.5)' : 'scale(1)', transformOrigin: modalZoom ? `${mouse[0]}px ${mouse[1]}px` : 'center' }}>
          {mainImage}
        </div>
      </div>
    );
  }
}

export default Modal;
