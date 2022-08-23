import React from 'react';
import styled from 'styled-components';
import Bar from './Bar';

function Breakdown({ meta, isLoaded, totalRatings, ratingFilter, setRatingFilter }) {
  return (
    <div>
      {!isLoaded && <p>loading . . .</p>}
      {isLoaded && (
        <BreakContainer>
          <div>
            {`${Math.round(100 * (parseInt(meta.recommended.true)
            / parseInt(totalRatings)))
            }% of reviewers recommend this item.`}
          </div>
          <div>
            <Bar star="5" percentage={(meta.ratings['5'] / totalRatings) * 100} setRatingFilter={setRatingFilter} ratingFilter={ratingFilter} />
            <Bar star="4" percentage={(meta.ratings['4'] / totalRatings) * 100} setRatingFilter={setRatingFilter} ratingFilter={ratingFilter} />
            <Bar star="3" percentage={(meta.ratings['3'] / totalRatings) * 100} setRatingFilter={setRatingFilter} ratingFilter={ratingFilter} />
            <Bar star="2" percentage={(meta.ratings['2'] / totalRatings) * 100} setRatingFilter={setRatingFilter} ratingFilter={ratingFilter} />
            <Bar star="1" percentage={(meta.ratings['1'] / totalRatings) * 100} setRatingFilter={setRatingFilter} ratingFilter={ratingFilter} />
          </div>
        </BreakContainer>
      )}
    </div>
  );
}

const BreakContainer = styled.div`
  display: block;
  font-size: small;
  /* font-weight: light; */
  margin-top: 7%;
`;

export default Breakdown;
