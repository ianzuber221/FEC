import React, { useState } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import Helpful from '../../components/Helpful';
import Report from '../../components/Report';
import Image from '../../components/Image';

function Answer({ answer, renderAnswers, last }) {
  const [helpfulCount, setHelpfulCount] = useState(answer.helpfulness)
  const answerInfo = (
    <span>
      {answer.answerer_name.toLowerCase() === 'seller' ? <span>by <b>Seller</b></span> : <span>by {answer.answerer_name} </span>}
      {', '}
      {format(new Date(answer.date), 'MMMM d, yyyy')}
    </span>
  );
  const images = answer.photos.length > 0 && (
    <PhotoDiv>
      {answer.photos.map((photo, index) => (
        <Image
          key={index}
          url={typeof photo === 'object' ? photo.url : photo}
        />
      ))}
    </PhotoDiv>
  );
  const helpful = (
    <Helpful id={answer.answer_id || answer.id}
      type="answer"
      currentCount={helpfulCount}
      setHelpfulCount={setHelpfulCount}
    />
  );
  const report = (
    <span>
      <Report
        id={answer.answer_id || answer.id}
        type="answer"
      />
    </span>
  );

  return (
    <AnswerDiv className="answer" last={last}>
      <div className="answer-text">{answer.body}</div>
      {images}
      <OptionsDiv>
        {answerInfo}
        <PaddedSpan>{' | '}</PaddedSpan>
        {helpful}
        <PaddedSpan>{' | '}</PaddedSpan>
        {report}
      </OptionsDiv>
    </AnswerDiv>
  );
}

export default Answer;

const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  overflow-x: auto;
  margin: 5px 0;
`

const PaddedSpan = styled.div`
  padding: 0 10px;
  font-size: 15px;
`;

const OptionsDiv = styled.div`
  font-size: 11px;
  font-weight: 300;
  color: #77787a;
  display: flex;
  max-width: 40%;
  padding: 10px 0;
  align-items: center;
`;

const AnswerDiv = styled.div`
  padding-bottom: ${props => props.last ? 0 : '5px'};
  border-bottom: ${props => props.last ? 'none' : '0.5px solid grey;'};
  margin-bottom: ${props => props.last ? 0 : '15px'};
`;