import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReviewTile from './ReviewTile';

function ReviewList({
  reviews, markHelpful, report, scrollMore, page, isLoaded,
}) {
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight + 0.75 > scrollHeight) {
        scrollMore();
      }
    }
  };

  return (

    <StyledList
      onScroll={onScroll}
      ref={listInnerRef}
      data-testid="reviewlist"
      id="reviewlist1"
    >
      {!isLoaded && <h4 data-testid="reviewlistload">loading reviewtiles</h4>}
      {isLoaded
      && (
      <div data-testid="reviewtiles">
        {reviews.slice(0, page * 3).map((review, index) => (
          <ReviewTile
            review={review}
            key={review.review_id}
            index={index}
            markHelpful={markHelpful}
            report={report}
          />
        ))}
      </div>
      )}
    </StyledList>
  );
}

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

export default ReviewList;
