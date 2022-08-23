import React from 'react';
import styled from 'styled-components';
import Star from './Star';

function Summary({ average, totalRatings, isLoaded }) {
  return (
    <div>
      {!isLoaded && <h4>loading. . .</h4>}
      {(isLoaded)
        && (
        <div>
          <StyledSummary>
            <BigRating data-testid="averagerating">{`${average}`}</BigRating>
            <StarDiv><Star average={average} /></StarDiv>
          </StyledSummary>
          <div>
            <em>{`out of ${totalRatings} reviews`}</em>
          </div>
        </div>
        )}
    </div>
  );
}

const BigRating = styled.div`
  font-size: 50px !important;
  font-weight: bold;
  margin-right: 5%;
  margin-top:-5%;
  align-self: flex-start;
`;

const StyledSummary = styled.div`
  display: flex;
  height: auto;
  flex-direction: row;
  justify-content: flex-start;
  width: auto;
`;

const StarDiv = styled.div`
  font-size: 20px !important;
  align-items: center;
  height:100%;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;

`

export default Summary;
