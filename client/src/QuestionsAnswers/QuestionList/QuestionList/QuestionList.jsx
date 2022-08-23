import React, { useRef } from 'react';
import styled from 'styled-components';
import IndividualQuestion from './IndividualQuestion';
import { useQuestionList } from '../../contexts/QuestionListContext';

function QuestionList({ renderQuestions, keyword, productName, expanded, page, setPage, hasMore }) {
  const questions = useQuestionList();
  const listInnerRef = useRef();

  if (questions.length === 0) {
    return (
      <NoDataDiv id="question-list">
        No Questions Available.
      </NoDataDiv>
    );
  }

  // let filteredQuestions = questions
  //   .filter((question) => (
  //     question.question_body.match(new RegExp(keyword, 'i'))
  //   ));

  const onScroll = async () => {
    if (listInnerRef.current) {
      const { offsetHeight, scrollTop, scrollHeight } = listInnerRef.current;
      if (scrollTop + offsetHeight + 10 >= scrollHeight) {
        if (hasMore) {
          setPage(page + 1);
          renderQuestions();
        }
      }
    }
  };

  return (
    <div id="question-list">
      {expanded
      && (
        <Scroller onScroll={onScroll} ref={listInnerRef} id="question-scroller">
          {questions
            .map((question) => (
              <IndividualQuestion
                key={question.question_id}
                question={question}
                renderQuestions={renderQuestions}
                productName={productName}
                keyword={keyword}
              />
            ))}
        </Scroller>
      )}
      {!expanded
      && (
        <div>
          {questions
            .slice(0, 2)
            .map((question) => (
              <IndividualQuestion
                key={question.question_id}
                question={question}
                renderQuestions={renderQuestions}
                productName={productName}
                keyword={keyword}
              />
            ))}
        </div>
      )}

    </div>
  );
}

export default QuestionList;

const Scroller = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 70vh;
`;

const NoDataDiv = styled.div`
  padding: 10px 0;
  font-size: 18px;
`;
