import React from 'react';
import styled from 'styled-components';

export default function InvalidError({ emptyFields, invalidMessage}) {
  return (
    <Invalid>
      {emptyFields.length > 0
      && (
        <li>
          You must enter the following:
          <ul>
            {emptyFields.map((field) => <li>{field}</li>)}
          </ul>
        </li>
      )}
      {invalidMessage.map((message) => <li>{message}</li>)}
    </Invalid>
  );
}

const Invalid = styled.ul`
  color: red;
`;

