import React, { useState } from 'react';
import styled from 'styled-components';
import { updateHelpful } from '../lib/api/githubAPI';

function Helpful({ id, type, currentCount, setHelpfulCount }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) {
      return;
    }
    updateHelpful(type, id)
      .then(() => {
        setClicked(true);
        setHelpfulCount(currentCount + 1);
      });
  };

  return (
    <HelpfulDiv className="helpful">
      <PaddedSpan>
        Helpful?
      </PaddedSpan>
      <PaddedU
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex="-1"
      >
        Yes
      </PaddedU>
      <span>
        {`(${currentCount})`}
      </span>
    </HelpfulDiv>
  );
}

export default Helpful;

const PaddedSpan = styled.span`
  padding-right: 7px;
`;

const PaddedU = styled.u`
  padding-right: 3px;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const HelpfulDiv = styled.div`
  display: flex;
  align-items: center;
`;