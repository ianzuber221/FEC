import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import _ from 'underscore';
import { getQuestions, getProductInfo } from './lib/api/githubAPI';
import Search from './SearchBar/Search';
import QuestionList from './QuestionList/QuestionList/QuestionList';
import MoreQuestions from './OptionButtons/MoreQuestions';
import AddQuestion from './OptionButtons/AddQuestion';
import { useCurrentProductContext } from '../context';
import { useQuestionList, useUpdateQuestionList } from './contexts/QuestionListContext';

const QuestionAnswers = forwardRef((props, ref) => {
  const productId = useCurrentProductContext();
  const questionList = useQuestionList();
  const setQuestionList = useUpdateQuestionList();
  const [filteredKeyword, setFilteredKeyword] = useState('');
  const [productInfo, setProductInfo] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const [count, setCount] = useState(200);
  const [page, setPage] = useState(1);
  const count = 10;

  const renderQuestions = (init) => {
    if (init) {
      setPage(1);
      setHasMore(true);
    }
    const targetPage = init ? 1 : page;
    getQuestions(productId, targetPage, count)
      .then((result) => {
        if (result.data.results.length === 0) {
          setHasMore(false);
          return;
        }
        if (targetPage === 1) {
          setQuestionList(sortQuestions(result.data.results));
        } else {
          const newQList = {};
          questionList.concat(result.data.results).forEach((item) => {
            newQList[item.question_id] = item;
          });
          const sorted = sortQuestions(Object.values(newQList));
          setQuestionList(sorted);
        }
      });
  };

  useEffect(() => {
    renderQuestions(true);
    getProductInfo(productId)
      .then((result) => {
        setProductInfo(result.data);
      });
  }, [productId]);

  useEffect(() => {
    renderQuestions(true);
  }, [expanded]);

  return (
    <DivContainer id="question-and-answers" className="main-widget-container" ref={ref}>
      <div className="main-widget-title">QUESTIONS & ANSWERS</div>
      <Search setFilter={setFilteredKeyword} />
      <QuestionList
        renderQuestions={renderQuestions}
        keyword={filteredKeyword}
        productName={productInfo.name}
        expanded={expanded}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
      <ButtonContainer>
        <MoreQuestions
          expanded={expanded}
          setExpanded={setExpanded}
          Button={Button}
        />
        <AddQuestion
          renderQuestions={renderQuestions}
          Button={Button}
          productName={productInfo.name}
          setHasMore={setHasMore}
        />
      </ButtonContainer>
    </DivContainer>
  );
})

export default QuestionAnswers;

const sortQuestions = (questions) => (
  _(questions).chain()
    .sortBy('question_date')
    .reverse()
    .sortBy('question_helpfulness')
    .reverse()
    .value()
);

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  color : #3d3c3c;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border-bottom: 0.5px solid black;
`;

const Button = styled.button`
  padding: 15px;
  border: 1px solid #3d3c3c;
  background-color: white;
  margin-right: 10px;
  font-weight:500px!important;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;
