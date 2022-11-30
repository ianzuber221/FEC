/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { Promise } from 'bluebird';
import ProductList from './productList';
import OutfitList from './outfitList';
import { useCurrentProductContext } from '../context';
import { RelatedItemsStyleContainer } from './styles/list.styled';

export const currentProductDataContext = React.createContext();
const RelatedItems = forwardRef((props, ref) => {
  const [relatedProductStyles, setRelatedProductStyles] = useState();
  const [relatedProduct_ids, setRelatedProduct_ids] = useState();
  const [relatedProductReviews, setRelatedProductReviews] = useState();
  const currentProduct = useCurrentProductContext();
  const [currentProductData, setCurrentProductData] = useState();
  const [currentProductStyles, setCurrentProductStyles] = useState();
  const [currentProductReviews, setCurrentProductReviews] = useState();
  const getStylesArr = (ids) => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const config = {
        method: 'get',
        url: `${process.env.API_URL}/products/${ids[i]}/styles`,
        headers: {
          Authorization: process.env.AUTH_KEY, 
        },
      };
      promises.push(axios(config));
    }
    return Promise.all(promises)
      .then((prodObjArr) => {
        const unformattedObjArr = prodObjArr.map((prod) => prod.data);
        unformattedObjArr.map((unformattedObj) => {
          const styleArr = unformattedObj.results;
          unformattedObj.results = styleArr.filter(
            (style) => style['default?'] === true
          );
          if (unformattedObj.results.length === 0) {
            unformattedObj.results = [styleArr[0]];
          }
          return unformattedObj;
        });
        return unformattedObjArr;
      })
      .catch((err) => console.log('Error:', err));
  };

  // eslint-disable-next-line camelcase
  const get_idsArr = (ids) => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const config = {
        method: 'get',
        url: `${process.env.API_URL}/products/${ids[i]}`,
        headers: {
          Authorization: process.env.AUTH_KEY, 
        },
      };
      promises.push(axios(config));
    }
    return Promise.all(promises)
      .then((prodObjArr) => {
        return prodObjArr.map((product) => product.data);
      })
      .catch((err) => console.log('Error:', err));
  };

  const getReviewsArr = (ids) => {
    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      const config = {
        method: 'get',
        url: `${process.env.API_URL}/reviews`,
        params: {
          product_id: ids[i],
          sort: 'relevant',
        },
        headers: {
          Authorization: process.env.AUTH_KEY,
        },
      };
      promises.push(axios(config));
    }
    return Promise.all(promises)
      .then((prodObjArr) => {
        return prodObjArr.map((product) => product.data);
      })
      .catch((err) => console.log('Error:', err));
  };
  const setOverviewDataState = (id) => {
    const configId = {
      method: 'get',
      url: `${process.env.API_URL}/products/${id}`,
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    };
    const configStyle = {
      method: 'get',
      url: `${process.env.API_URL}/products/${id}/styles`,
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    };
    const configReview = {
      method: 'get',
      url: `${process.env.API_URL}/reviews`,
      params: {
        product_id: id,
        sort: 'relevant',
      },
      headers: {
        Authorization: process.env.AUTH_KEY, // TODO: Get rid of this when env is set up!!
      },
    };

    axios
      .all([axios(configStyle), axios(configReview), axios(configId)])
      .then(
        axios.spread((...responses) => {
          responses[0].data.results = responses[0].data.results.filter((style) => style['default?'] === true);
          setCurrentProductStyles(responses[0].data);
          setCurrentProductReviews(responses[1].data);
          setCurrentProductData(responses[2].data);
        }),
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductIds = () => {
    const config = {
      method: 'get',
      url: `${process.env.API_URL}/products/${currentProduct}/related`,
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    };
    axios(config)
      .then((response) => {
        return Promise.all([
          getStylesArr(response.data),
          get_idsArr(response.data),
          getReviewsArr(response.data),
        ]);
      })
      .then((promiseArr) => {
        setRelatedProductStyles(promiseArr[0]);
        setRelatedProduct_ids(promiseArr[1]);
        setRelatedProductReviews(promiseArr[2]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => getProductIds(), [currentProduct]);
  useEffect(() => setOverviewDataState(currentProduct), [currentProduct]);

  return (
    <currentProductDataContext.Provider value={currentProductData}>
      <RelatedItemsStyleContainer ref={ref} className="main-widget-container">
        <div className="main-widget-title">RELATED ITEMS</div>
        <ProductList
          relatedProductStyles={relatedProductStyles}
          relatedProduct_ids={relatedProduct_ids}
          relatedProductReviews={relatedProductReviews}
        />
        <div className="main-widget-title">YOUR OUTFITS</div>
        <OutfitList
          relatedProductStyles={currentProductStyles}
          relatedProduct_ids={currentProductData}
          relatedProductReviews={currentProductReviews}
        />
      </RelatedItemsStyleContainer>
    </currentProductDataContext.Provider>
  );
});
export default RelatedItems;
