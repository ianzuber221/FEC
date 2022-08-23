import React from 'react';
import styled from 'styled-components';
import Char from './Char';
import ratingToPercentage from '../lib/ratingToPercentage';

function CharBar({ rating, char, chars }) {
  return (
    <BarContainer>
      <CharName>
        {char}
        :
        {' '}
      </CharName>
      <OuterBar>
        <InnerBar width={ratingToPercentage(rating)} />
      </OuterBar>
      <CharList>
        {chars.map((c) => <Char char={c} key={c} />)}
      </CharList>
    </BarContainer>
  );
}

const BarContainer = styled.div`
  font-size: small;
  margin-top: 3%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const OuterBar = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 12px;
  background-color: #d9d9d9;
`;

const InnerBar = styled.div`
  position: absolute;
  top: 45%;
  left: ${(props) => props.width};
  white-space: nowrap;
  overflow: hidden;
  width: auto;
  height: 24px;
  font-size: 15px;
  transform: translate(-50%, -50%);
  &:before {
    content: "▼";
  }
`;

const CharList = styled.div`
  font-size: x-small;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #626262;
`;

const CharName = styled.div`
  font-weight: 400;
  color: #626262;
`;

export default CharBar;
