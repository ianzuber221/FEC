/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import axios from 'axios';
import { useCurrentProductContext } from '../context';
import './OverviewStyles.css';
import ImageGallery from './ImageGallery';
import AddToCart from './AddToCart';
import ProductDetails from './ProductDetails';
import StyleSelector from './StyleSelector';

const Overview = forwardRef(({ ratingsRef }, ref) => {
  // STATE
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState({});
  const [currentStyle, setCurrentStyle] = useState({});
  const [currentSize, setCurrentSize] = useState('');
  const [sizeAlert, setSizeAlert] = useState('');
  const [productReviews, setProductReviews] = useState({});
  const [currentThumbnail, setCurrentThumbnail] = useState([]);
  const [modal, setModal] = useState('');
  const [zoom, setZoom] = useState('');
  const [modalZoom, setModalZoom] = useState('');
  const [range, setRange] = useState([]);

  // API INTERACTION
  const productId = useCurrentProductContext();
  const productUrl = `${process.env.API_URL}/products/${productId}`;
  const productStylesUrl = `${productUrl}/styles`;
  const productReviewsUrl = `${process.env.API_URL}/reviews/meta?product_id=${productId}`;

  const requestConfig1 = {
    method: 'GET',
    url: productUrl,
    headers: {
      Authorization: process.env.AUTH_KEY,
    },
  };

  const requestConfig2 = {
    method: 'GET',
    url: productStylesUrl,
    headers: {
      Authorization: process.env.AUTH_KEY,
    },
  };

  const requestConfig3 = {
    method: 'GET',
    url: productReviewsUrl,
    headers: {
      Authorization: process.env.AUTH_KEY,
    },
  };

  function getProduct() {
    axios(requestConfig1)
      .then((result) => setProduct(result.data))
      .catch((err) => {
        console.log('failed fetching product from API.', err);
      });
  }

  function getStyles() {
    axios(requestConfig2)
      .then((result) => {
        setStyles(result.data.results);
      })
      .catch((err) => {
        console.log('failed fetching product styles from API.', err);
      });
  }

  function getReviews() {
    axios(requestConfig3)
      .then((result) => {
        setProductReviews(result.data);
      })
      .catch((err) => {
        console.log('failed fetching product reviews from API.', err);
      });
  }

  // SET STATE
  useEffect(() => {
    getProduct();
    getStyles();
    getReviews();
  }, [productId]);
  useEffect(() => {
    if (styles.length > 0) {
      setCurrentStyle(styles[0]);
    }
  }, [styles]);
  useEffect(() => {
    if (modal === '') {
      setModal('off');
    }
  });
  useEffect(() => {
    if (zoom === '') {
      setZoom(false);
    }
  });
  useEffect(() => {
    if (modalZoom === '') {
      setModalZoom(false);
    }
  });
  useEffect(() => {
    if (Object.keys(currentStyle).length > 0) {
      const thumbnails = [];
      currentStyle.photos.forEach((photo) => {
        thumbnails.push(photo.thumbnail_url);
      });
    }
  });
  useEffect(() => {
    if (currentThumbnail.length === 0 && Object.keys(currentStyle).length > 0) {
      setCurrentThumbnail([currentStyle.photos[0].thumbnail_url, 0]);
    }
  });
  useEffect(() => {
    if (range.length === 0) {
      setRange([0, 7]);
    }
  });

  // RENDER
  if (Object.keys(currentStyle).length > 0 && Object.keys(productReviews).length > 0 && currentThumbnail.length > 0 && range.length > 0) {
    return (
      <div className="overview" ref={ref}>
        <ImageGallery currentStyle={currentStyle} currentThumbnail={currentThumbnail} setCurrentThumbnail={setCurrentThumbnail} modal={modal} setModal={setModal} zoom={zoom} setZoom={setZoom} modalZoom={modalZoom} setModalZoom={setModalZoom} range={range} setRange={setRange} />
        <div className="right">
          <ProductDetails product={product} currentStyle={currentStyle} productReviews={productReviews} ratingsRef={ratingsRef} />
          <StyleSelector styles={styles} currentStyle={currentStyle} setCurrentStyle={setCurrentStyle} currentThumbnail={currentThumbnail} />
          <AddToCart currentStyle={currentStyle} currentSize={currentSize} setCurrentSize={setCurrentSize} sizeAlert={sizeAlert} setSizeAlert={setSizeAlert} />
        </div>
      </div>
    );
  }
});

export default Overview;
