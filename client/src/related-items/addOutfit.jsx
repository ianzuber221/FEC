import React from 'react';
import { StyledCard } from './styles/list.styled.js';
import { GrCoatCheck } from 'react-icons/gr';

function AddOutfit({ handleAddOutfit }) {
  return (
    <StyledCard>
      <div id="addOutfitContainer" onClick={handleAddOutfit} >
        <GrCoatCheck />
        <div>Add to Outfit</div>
      </div>
    </StyledCard>
  );
}

export default AddOutfit;
