import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewForm from './AddReview/ReviewForm';

function AddBar({
  reviews, addReview, moreReviews, productId, setPage,
}) {
  const [showForm, setShowForm] = useState(false);
  const onMoreReviews = (e) => {
    e.preventDefault();
    moreReviews();
  };

  const toggleForm = () => {
    showForm
      ? setShowForm(false)
      : setShowForm(true);
  };

  return (
    <AddBarMain data-testid="addbar-1">
      <StyledButton data-testid="morebutton" onClick={onMoreReviews}>MORE REVIEWS</StyledButton>
      <StyledButton data-testid="addbutton" onClick={toggleForm}>ADD A REVIEW +</StyledButton>
      {showForm
        && (
        <ReviewForm
          productId={productId}
          addReview={addReview}
          toggleForm={toggleForm}
          setPage={setPage}
        />
        )}
    </AddBarMain>
  );
}

const AddBarMain = styled.div`
  margin-top: 2%;
  margin-bottom: 2%;
`;

const StyledButton = styled.button`
  width: auto;
  font-size: small;
  padding: 15px;
  border: 1px solid #3d3c3c;
  background-color: white;
  margin-right: 20px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

export default AddBar;
