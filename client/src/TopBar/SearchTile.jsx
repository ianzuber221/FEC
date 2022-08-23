import React from 'react';
import styled from 'styled-components';
import { useCurrentProductUpdate } from '../context';
import priceFormat from './lib/priceFormat';

function SearchTile({ product, toggleSearch }) {
  const setCurrentProduct = useCurrentProductUpdate();

  const handleClick = () => {
    setCurrentProduct(product.id);
    toggleSearch();
  };

  return (
    <StyledDiv onClick={handleClick}>
      <div>{product.name}</div>
      <div>{priceFormat(product.default_price)}</div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
z-index: 200;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: small;
  font-weight: medium;
  font-
  width: 80%;
  padding: 2%;
  margin: 1%;
  color: #2b2b2b;
  border: .5px solid #d9d9d9;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;

export default SearchTile;
