import React, { useState, useContext } from 'react';

const QuestionListContext = React.createContext();
const UpdateQuestionListContext = React.createContext();

export function useQuestionList() {
  return useContext(QuestionListContext);
}

export function useUpdateQuestionList() {
  return useContext(UpdateQuestionListContext);
}

export function QuestionListProvider({ children }) {
  const [questionList, setQuestionList] = useState([]);

  function updateQuestionList(newQuestionList) {
    setQuestionList(newQuestionList);
  }

  return (
    <QuestionListContext.Provider value={questionList}>
      <UpdateQuestionListContext.Provider value={updateQuestionList}>
        { children }
      </UpdateQuestionListContext.Provider>
    </QuestionListContext.Provider>
  );
}
