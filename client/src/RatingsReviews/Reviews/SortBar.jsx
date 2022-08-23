import React from 'react';
import styled from 'styled-components';

function SortBar({ setSort, totalRatings, page, reviews }) {
  const sort = (e) => {
    setSort(e.target.value);
  };

  return (
    <StyledSortBar data-testid="sortbar-1">
      {page * 3}
      {' '}
      of
      {' '}
      {totalRatings}
      {' '}
      reviews, sorted by
      <Select data-testid="sortoptions" id="sort" onChange={sort}>
        <option data-testid="relevance" value="relevance">Relevance</option>
        <option data-testid="newest-option" value="newest">Newest</option>
        <option value="helpful">Helpfulness</option>
      </Select>
    </StyledSortBar>
  );
}

const StyledSortBar = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: 16px;
  width: 100%;
  align-items: baseline;
  margin-bottom: 1.5%;
`;

const Select = styled.select`
  margin-left: 1.5%;
  font-weight: bold;
  background: white;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid black;
  align-self: flex-end;
  margin-bottom: .1%;
  &:hover{
    cursor: pointer;
    opacity: 70%;
  }
`;

export default SortBar;
