import React, { useState } from 'react';
import styled from 'styled-components';
import Answer from './Answer';

function AnswerList({ answerList, renderAnswers, Title }) {
  const [collapsed, setCollapsed] = useState(true);
  const filteredAnswerList = collapsed ? answerList.slice(0, 2) : answerList;
  if (Array.isArray(answerList) && answerList.length > 0) {
    return answerList.length > 0 && (
      <DivAnswer>
        <Title>A:</Title>
        <AnswerListDiv>
          {collapsed
          && (
            <div>
              {filteredAnswerList
                .map((answer, index) => (
                  <Answer
                    key={answer.id || answer.answer_id}
                    answer={answer}
                    renderAnswers={renderAnswers}
                    last={index === filteredAnswerList.length - 1}
                  />
                ))}
            </div>
          )}
          {!collapsed
          && (
            <Scroller id="scrollableDiv">
              {filteredAnswerList.map((answer, index) => (
                <Answer
                  key={answer.id || answer.answer_id}
                  answer={answer}
                  renderAnswers={renderAnswers}
                  last={index === filteredAnswerList.length - 1}
                />
              ))}
            </Scroller>
          )}
          {collapsed && answerList.length > 2
          && <CollapseSpan onClick={() => setCollapsed(false)}>LOAD MORE ANSWERS</CollapseSpan>}
          {!collapsed
          && <CollapseSpan onClick={() => setCollapsed(true)}>COLLAPSE ANSWERS</CollapseSpan>}
        </AnswerListDiv>
      </DivAnswer>
    );
  }
  return (
    <DivAnswer>
      <Title />
      <div>No answers.</div>
    </DivAnswer>
  );
}

export default AnswerList;

const CollapseSpan = styled.span`
  font-weight: bold;
  font-size: 11px;
`;

const DivAnswer = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: small;
`;

const Scroller = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  height: 300;
  padding-right: 10px;
  display: 'flex';
  flex-direction: 'column-reverse';
`;

const AnswerListDiv = styled.div`
  width: 95%;
`;
