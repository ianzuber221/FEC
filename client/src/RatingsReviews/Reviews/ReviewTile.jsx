/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import Star from '../Ratings/Star';
import PhotoList from './PhotoList';

function ReviewTile({ review, index, markHelpful, report }) {
  const onMarkHelpful = (e) => {
    e.preventDefault();
    const rId = review.review_id;
    markHelpful(rId);
  };

  const onReport = (e) => {
    e.preventDefault();
    const r = confirm('are you sure you want to report this review?');
    if (r) {
      report(review.review_id);
    }
  };

  return (
    <TileContainer id={`tile-container-${index}`}>
      <TileTop>
        <Stars>
          <Star average={review.rating} />
        </Stars>
        <div>
          {`${review.reviewer_name}, `}
          {`${format(parseISO(review.date), 'MMMM dd, yyyy')} `}
        </div>
      </TileTop>
      <TileMain>
        <Summary>{review.summary}</Summary>
        <TileDiv>{review.body}</TileDiv>
        {review.recommend
              && (
                <TileDiv><b>I recommend this product &#10003;</b></TileDiv>
              )}
        <TileDiv>
          {review.photos.length > 0 // renders if there are photos
              && (
              <PhotoDiv>
                <PhotoList photos={review.photos} />
              </PhotoDiv>
              )}
          {review.response
              && (
              <Seller>
                <b>Response:</b>
                <br />
                {' '}
                {review.response}
              </Seller>
              )}
        </TileDiv>
        <TileBot>
          <span data-testid="review-helpful">
            Helpful?
          </span>
          <Spanny data-testid={`helpful-button-${index}`} onClick={onMarkHelpful}><u>Yes</u></Spanny>
          <span data-testid={`helpful-count-${index}`}>
            {`(${review.helpfulness})    |  `}
          </span>
          <Spanny onClick={onReport}><u>Report</u></Spanny>
        </TileBot>
      </TileMain>
    </TileContainer>
  );
}

const TileDiv = styled.div`
  width: 100%;
  font-size: 13px;
  margin-top: 3%;
  color: #4a4a4a;
`;

const Summary = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-top: 5%;
`;

const Spanny = styled.span`
  font-size: 12px;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
  margin-left: 2%;
  margin-right: 1%;
`;

const Seller = styled.div`
  width: 90%;
  height: auto;
  padding: 1.5%;
  padding-left: 4%;
  margin-top: 2%;
  margin-bottom: 2%;
  background-color: #eaeaea;
  line-height: 200%;
`;

const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  overflow-x: auto;
`;

const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  max-width: 600px;
  border-bottom: .5px solid #363636;
  padding: 0%;
  margin-top: 2%;
`;

const TileTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
  width: 100%;
  color: #484848;
`;

const TileBot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 12px;
  align-items: center;
  margin-top: 3%;
  margin-bottom: 3%;
  color: #484848;
`;

const TileMain = styled.div`
  display: flex;
  font-size: small;
  flex-direction: column;
  margin-top: -2%;
  max-width: 100%;
`;

const StyledImg = styled.img`
  height: 100px;
  width: auto;
  scale: auto;
  border: 1px solid #d9d9d9;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
  transition: opacity .4s;
`;

const Stars = styled.div`
  font-size: 15px;
`;

export default ReviewTile;
