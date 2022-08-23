import React from 'react';
import styled from 'styled-components';
import ratingToPercentage from '../lib/ratingToPercentage';

function Star({ average }) {
  return (
    <StarContainer>
      <OuterStar><InnerStar width={ratingToPercentage(average)} /></OuterStar>
    </StarContainer>
  );
}

const StarContainer = styled.div`
  color: black;
  align-items: center;
`;

const OuterStar = styled.div`
  display: inline-block;
  position: relative;
  &:before {
    content: "☆☆☆☆☆";
  }
`;

const InnerStar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: ${(props) => props.width};
  &:before {
    content: "★★★★★";
  }
`;

export default Star;
