import React from 'react';
import { useRef } from 'react';
import Product from './product';
import { StyledList } from './styles/list.styled';

function ProductList({
  relatedProductStyles,
  relatedProduct_ids,
  relatedProductReviews,
}) {
  // Combine states using obj to organize by product ID
  const cardFormatter = (reviews, ids, styles) => {
    const formattedCards = [];
    for (let i = 0; i < ids.length; i++) {
      const reviewTotal = reviews[i].results.reduce(
        (total, item) => total + parseInt(item.rating, 10),
        0
      );
      const reviewAvg = reviewTotal / (reviews[i].results.length - 1);
      const formattedCard = {
        id: styles[i].product_id || null,
        image: styles[i].results[0].photos || null,
        category: ids[i].category || null,
        name: ids[i].name || null,
        price: styles[i].results[0].original_price || null,
        discountedPrice: styles[i].results[0].sale_price || null,
        rating: reviewAvg,
        description: ids[i].description || null,
        features: ids[i].features || null,
      };
      formattedCards.push(
        <Product
          formattedCard={formattedCard}
          id={formattedCard.id}
          key={formattedCard.id}
        />
      );
    }
    return formattedCards;
  };

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
        break;
      default:
        console.log('error');
    }
    sliderHider();
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
    product = cardFormatter(
      relatedProductReviews,
      relatedProduct_ids,
      relatedProductStyles
    );
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
      <div id="relatedList" ref={scrollRef} onScroll={sliderHider}>
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

export default ProductList;
