import React, { useState, useRef, useEffect } from 'react';
import Product from './product';
import { StyledList } from './styles/list.styled';
import AddOutfit from './addOutfit';

function OutfitList({
  relatedProductStyles,
  relatedProduct_ids,
  relatedProductReviews,
}) {
  // State
  const [localStorageState, setLocalStorageState] = useState();
  useEffect(() => {}, [localStorageState]);

  // console.log(relatedProductStyles,relatedProduct_ids,relatedProductReviews);
  // Combine states using obj to organize by product ID
  const cardFormatter = (reviews, ids, styles) => {
    //Clean this up, revise so that it reflects the current overview card
    const formattedCards = [];
    const reviewTotal = reviews.results.reduce(
      (total, item) => total + parseInt(item.rating, 10),
      0
    );
    const reviewAvg = reviewTotal / (reviews.results.length - 1);
    const formattedCard = {
      id: styles.product_id || null,
      image: styles.results[0].photos || null,
      category: ids.category || null,
      name: ids.name || null,
      price: styles.results[0].original_price || null,
      discountedPrice: styles.results[0].sale_price || null,
      rating: reviewAvg,
      description: ids.description || null,
      features: ids.features || null,
    };
    return formattedCard;
  };

  // Local storage manipulation

  function handleAddOutfit() {
    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify([]));
    }
    let currentStorage = JSON.parse(localStorage.getItem('outfits'));
    for (let i = 0; i < currentStorage.length; i++) {
      if (relatedProductStyles.product_id === currentStorage[i].id) {
        return null;
      }
    }
    const overviewObj = cardFormatter(
      relatedProductReviews,
      relatedProduct_ids,
      relatedProductStyles
    );
    currentStorage.push(overviewObj);
    localStorage.setItem('outfits', JSON.stringify(currentStorage));
    setLocalStorageState(currentStorage);
  }

  function renderOutfitList() {
    let currentStorage;
    if (localStorage.getItem('outfits')) {
      currentStorage = JSON.parse(localStorage.getItem('outfits'));
    } else {
      return <div>Choose an Outfit</div>;
    }
    return currentStorage.map((cardObj) => {
      return (
        <Product
          formattedCard={cardObj}
          outfit={true}
          setLocalStorageState={setLocalStorageState}
          key={cardObj.id}
        />
      );
    });
  }

  const scrollRef = useRef();
  const leftSliderRef = useRef();
  const rightSliderRef = useRef();

  const scroller = (e, direction) => {
    e.preventDefault();
    switch (direction) {
      case 'left':
        scrollRef.current.scrollBy(-500, 0);
        break;
      case 'right':
        scrollRef.current.scrollBy(500, 0);
    }
    sliderHider();
    // ref.current.scrollBy(100, 0);
  };
  const sliderHider = (e) => {
    if (e.target.scrollLeft === 0) {
      leftSliderRef.current.innerText = ' ';
    } else {
      leftSliderRef.current.innerHTML = '&#9001';
    }
    if (e.target.scrollLeft >= e.target.scrollWidth - e.target.clientWidth) {
      rightSliderRef.current.innerText = ' ';
    } else {
      rightSliderRef.current.innerHTML = ' &#9002';
    }
  };
  let product;
  if (
    !!relatedProductReviews &&
    !!relatedProduct_ids &&
    !!relatedProductStyles
  ) {
    product = renderOutfitList();
  } else {
    product = null;
  }

  return (
    <StyledList className="list-container">
      <button
        type="button"
        className="slider leftSlider"
        ref={leftSliderRef}
        onClick={(e) => scroller(e, 'left')}
      ></button>
      <AddOutfit handleAddOutfit={handleAddOutfit} />
      <div id="outfitList" ref={scrollRef} onScroll={sliderHider}>
        {product}
      </div>
      <button
        type="button"
        className="slider rightSlider"
        onClick={(e) => scroller(e, 'right')}
        ref={rightSliderRef}
      >
        &#9002;
      </button>
    </StyledList>
  );
}

export default OutfitList;
