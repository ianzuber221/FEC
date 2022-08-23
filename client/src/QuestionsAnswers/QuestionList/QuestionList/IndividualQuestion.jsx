import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { getAnswers, postAnswer } from '../../lib/api/githubAPI';
import getImageUrl from '../../lib/api/cloudinaryAPI';
import Helpful from '../../components/Helpful';
import Report from '../../components/Report';
import AddAnswerForm from '../AddAnswer/AddAnswerForm';
import AnswerList from '../AnswerList/AnswerList';

function IndividualQuestion({ productName, question, renderQuestions, keyword }) {
  const [showModal, setShowModal] = useState(false);
  const [answerList, setAnswerList] = useState(sortAnswers(question.answers));
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(100);
  const [helpfulCount, setHelpfulCount] = useState(question.question_helpfulness);

  const renderAnswers = () => {
    getAnswers(question.question_id, page, count)
      .then((result) => {
        if (result.data.results.length === 0) {
          return;
        }
        setAnswerList(sortAnswers(result.data.results));
      });
  };

  const addAnswer = (formValues) => {
    if (formValues.photos) {
      const photoUrlPromise = formValues.photos.map((photo) => getImageUrl(photo.file))
      Promise.all(photoUrlPromise)
        .then((result) => {
          formValues.photos = result;
          postAnswer(question.question_id, formValues)
            .then(() => {
              renderAnswers();
            });
        });
    } else {
      postAnswer(question.question_id, formValues)
        .then(() => {
          renderAnswers();
        });
    }
  };

  useEffect(() => {
    if (answerList.length >= count) {
      setCount(count * 2);
    }
  }, [answerList]);

  return (
    <DivContainer show={question.question_body.match(new RegExp(keyword, 'i'))}>
      <DivQuestion>
        <QContainer>
          <Title>Q:</Title>
          <BoldBody>{question.question_body}</BoldBody>
        </QContainer>
        <OptionsDiv>
          <Helpful
            id={question.question_id}
            type="question"
            currentCount={helpfulCount}
            setHelpfulCount={setHelpfulCount}
            renderComponent={renderQuestions}
            tabIndex="0"
          />
          <PaddedSpan>{' | '}</PaddedSpan>
          <Report
            id={question.question_id}
            type="question"
          />
          <PaddedSpan>{' | '}</PaddedSpan>
          <ClickableU onClick={() => setShowModal(true)} onKeyDown={() => setShowModal(true)} role="button" tabIndex="-1">
            Add Answer
          </ClickableU>
        </OptionsDiv>
      </DivQuestion>
      <AnswerList
        answerList={answerList}
        renderAnswers={renderAnswers}
        Title={Title}
      />
      <AddAnswerForm
        question={question}
        submitHandler={addAnswer}
        productName={productName}
        show={showModal}
        setShowModal={setShowModal}
      />
    </DivContainer>
  );
}

export default IndividualQuestion;

const sortAnswers = (answers) => (
  _(answers).chain()
    .sortBy('helpfulness')
    .sortBy((answer) => answer.answerer_name.toLowerCase() === 'seller')
    .reverse()
    .value()
);

const DivContainer = styled.div`
  display: ${props => props.show ? 'block' : 'none'}
`;

const DivQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding-right: 10px;
`;

const Title = styled.span`
  width: 30px;
  font-weight: bold;
`;

const QContainer = styled.div`
  display: flex;
  width: 60%;
`;

const BoldBody = styled.b`
  width: 100%;
`;

const OptionsDiv = styled.div`
  font-size: 11px;
  font-weight: 300;
  color: #77787a;
  display: flex;
  max-width: 40%;
  align-items: center;
`;

const PaddedSpan = styled.div`
  padding: 0 10px;
  font-size: 15px;
`;

const ClickableU = styled.u`
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;