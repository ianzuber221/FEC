/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-console */
import React, { useState } from 'react';
import styled from 'styled-components';

// class StarRatingBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selected: false,
//     };
//     this.handleHover = this.handleHover.bind(this);
//     this.handleClick = this.handleClick.bind(this);
//   }
function StarRatingBar({ setRating }) {
  const [selected, setSelected] = useState(false);
  const [rating, setThisRating] = useState('');
  const handleHover = (e) => {
    if (!selected) {
      const r = e.target.id.slice(-1);
      for (let i = 1; i <= 5; i++) {
        const x = `star-${i}`;
        const y = document.getElementById(x);
        if (i <= parseInt(r)) {
          y.textContent = '★';
        } else {
          y.textContent = '☆';
        }
      }
    }
  };

  const handleClick = (e) => {
    const r = e.target.id.slice(-1);
    for (let i = 1; i <= 5; i++) {
      const x = `star-${i}`;
      const y = document.getElementById(x);
      if (i <= parseInt(r)) {
        y.textContent = '★';
      } else {
        y.textContent = '☆';
      }
    }
    setThisRating(r);
    setSelected(true);
    setRating(r);
  };

  return (
    <StarContainer>
      <Star id="star-1" onMouseOver={handleHover} onClick={handleClick}>☆</Star>
      <Star id="star-2" onMouseOver={handleHover} onClick={handleClick}>☆</Star>
      <Star id="star-3" onMouseOver={handleHover} onClick={handleClick}>☆</Star>
      <Star id="star-4" onMouseOver={handleHover} onClick={handleClick}>☆</Star>
      <div data-testid="fivestar"><Star id="star-5" onMouseOver={handleHover} onClick={handleClick}>☆</Star></div>
    </StarContainer>
  );
}

const StarContainer = styled.div`
  font-size: x-large;
  font-style: light;
  margin-top: 1%;
  margin-bottom: 2%;
  display: flex;
  flex-direction: row;
`;

const Star = styled.div`
  opacity:90%;
  &:hover{
    opacity: 80%;
    cursor: pointer;
  }
`;

export default StarRatingBar;
