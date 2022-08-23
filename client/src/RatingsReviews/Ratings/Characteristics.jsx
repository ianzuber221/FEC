import React from 'react';
import styled from 'styled-components';
import CharBar from './CharBar';

function Characteristics({ meta, isLoaded }) {
  return (
    <CharContainer>
      {!isLoaded && <p>l o a d i n g . . .</p>}
      {isLoaded && (
        <div>
          {meta.characteristics.Fit
          && (
          <CharBar
            rating={meta.characteristics.Fit.value}
            char="Fit"
            chars={['small', 'perfect', 'large']}
          />
          )}
          {meta.characteristics.Length
          && (
          <CharBar
            rating={meta.characteristics.Length.value}
            char="Length"
            chars={['short', 'perfect', 'long']}
          />
          )}
          {meta.characteristics.Comfort
          && (
          <CharBar
            rating={meta.characteristics.Comfort.value}
            char="Comfort"
            chars={['poor', 'ok', 'perfect']}
          />
          )}
          {meta.characteristics.Quality
          && (
          <CharBar
            rating={meta.characteristics.Quality.value}
            char="Quality"
            chars={['poor', 'expected', 'perfect']}
          />
          )}
          {meta.characteristics.Size
          && (
          <CharBar
            rating={meta.characteristics.Size.value}
            char="Size"
            chars={['small', 'perfect', 'large']}
          />
          )}
          {meta.characteristics.Width
          && (
          <CharBar
            rating={meta.characteristics.Width.value}
            char="Width"
            chars={['short', 'perfect', 'wide']}
          />
          )}
        </div>
      )}
    </CharContainer>
  );
}

const CharContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  font-size: small;
`;

export default Characteristics;
