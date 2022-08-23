import React, { useEffect } from 'react';

function MoreQuestions({ expanded, setExpanded, Button }) {
  const handleClick = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <div>
      {!expanded
      && (
        <Button type="submit" onClick={handleClick} data-testid="more-question-btn">
          MORE ANSWERED QUESTIONS
        </Button>
      )}
      {expanded
      && (
        <Button type="submit" onClick={handleClick} data-testid="more-question-btn">
          COLLAPSE QUESTIONS
        </Button>
      )}
    </div>
  );
}

export default MoreQuestions;
