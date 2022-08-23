import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useState, useContext } from 'react';
import { StyledCard } from './styles/list.styled.js';
import Comparison from './comparison.jsx';
import { useCurrentProductUpdate } from '../context.jsx';
import { ImCancelCircle } from 'react-icons/im';
import Star from '../RatingsReviews/Ratings/Star';
import priceFormat from '../TopBar/lib/priceFormat';

function Product({ formattedCard, outfit, setLocalStorageState }) {
  // States
  const [picIndex, setPicIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const setCurrentProduct = useCurrentProductUpdate();
  // const [formattedCardState, setFormattedCard]= useState(formattedCard);
  const handleRightClick = () => {
    if (picIndex < formattedCard.image.length - 1) {
      setPicIndex((prev) => prev + 1);
    }
  };
  const handleLeftClick = () => {
    if (picIndex > 0) {
      setPicIndex((prev) => prev - 1);
    }
  };

  const handleGlobalStateClick = () => {
    setCurrentProduct(formattedCard.id);
  };

  function handleDeleteOutfit() {
    const currentStorage = JSON.parse(localStorage.getItem('outfits'));
    const newStorage = currentStorage.filter((item) => item.id !== formattedCard.id);
    localStorage.setItem('outfits', JSON.stringify(newStorage));
    setLocalStorageState(newStorage);
  }
  let relatedAction;
  if (outfit) {
    relatedAction = (
      <ImCancelCircle
        className="relatedOutfit"
        onClick={handleDeleteOutfit}
      />
    );
  } else {
    relatedAction = (
      <FaStar className="relatedAction" onClick={() => setOpenModal(true)} />
    );
  }


  return (
    <>
      <StyledCard>
        <div className="cardHeader">
          {relatedAction}
          <img
            src={
              formattedCard.image[picIndex].thumbnail_url ||
              'https://ngca.net/wp-content/uploads/2020/09/image-coming-soon-placeholder.png'
            }
            className="cardImage"
            alt={formattedCard.description}
            onClick={handleGlobalStateClick}
          />
          <button
            className="btn btnLeft"
            type="button"
            onClick={handleLeftClick}
          >
            &#8656;
          </button>
          <button
            className="btn btnRight"
            type="button"
            onClick={handleRightClick}
          >
            &#8658;
          </button>
        </div>
        <div className="cardBody">
          <p className="cardCategory">{formattedCard.category}</p>
          <p className="cardName" onClick={handleGlobalStateClick}>
            <b>
              {formattedCard.name}
            </b>
          </p>
          <p className="cardPrice">{priceFormat(formattedCard.price)}</p>
          <p className="discountedCardPrice">{formattedCard.discountedPrice}</p>
          {/* TODO: Rating needs to be updated to show stars up to 1/4  */}
          <Star average={formattedCard.rating} />
        </div>
      </StyledCard>

      {openModal && (
        <Comparison
          closeModal={setOpenModal}
          currentProduct={formattedCard}
          key="99"
        />
      )}
    </>
  );
}

export default Product;
