import React from 'react';
import styled from 'styled-components';
import Breakdown from './Breakdown';
import Characteristics from './Characteristics';
import Summary from './Summary';

function Ratings({ meta, average, totalRatings, isLoaded, setRatingFilter, ratingFilter }) {
  return (
    <RatingsContainer id="ratings-main">
      <Summary
        meta={meta}
        average={average}
        totalRatings={totalRatings}
        isLoaded={isLoaded}
      />
      <Breakdown
        meta={meta}
        isLoaded={isLoaded}
        totalRatings={totalRatings}
        setRatingFilter={setRatingFilter}
        ratingFilter={ratingFilter}
      />
      <Characteristics
        meta={meta}
        isLoaded={isLoaded}
      />
    </RatingsContainer>
  );
}

const RatingsContainer = styled.div`
  display:flex;
  flex-direction: column;
  padding: 1%;
  margin-top: -1%;
  width: 40%;
`;

export default Ratings;
