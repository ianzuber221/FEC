import React, { useState } from 'react';
import styled from 'styled-components';
import { updateReport } from '../lib/api/githubAPI';

function Report({ id, type }) {
  const [reported, setReported] = useState(false);
  const handleClick = () => {
    if (reported) {
      return;
    }
    const executed = confirm("Are you sure you want to report this?");
    if (executed) {
      updateReport(type, id)
        .then(() => {
          setReported(true);
        });
    }
  };

  return (
    <ClickableU onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex="-1">
      {reported ? 'Reported' : 'Report'}
    </ClickableU>
  );
}

export default Report;

const ClickableU = styled.u`
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;