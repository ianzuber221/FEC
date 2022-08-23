/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from '@testing-library/react';
import { jest } from '@jest/globals';
import QuestionList from '../QuestionList';
import '@testing-library/jest-dom/extend-expect';
import { QuestionListProvider } from '../../../contexts/QuestionListContext';

const renderQuestionMock = jest.fn();

it('should match snapshot', async () => {
  const { asFragment } = await render(
    <QuestionListProvider>
      <QuestionList
        renderQuestions={renderQuestionMock}
        keyword="sample"
        productName="sample"
        expanded
      />
    </QuestionListProvider>
  );

  // await waitForElementToBeRemoved(screen.getByText('No Questions Available.'));

  expect(asFragment()).toMatchSnapshot();
});

// it('should render after form is submitted', async () => {
//   const { getByTestId } = render (
//     <QuestionListProvider>
//       <QuestionList
//         productName="sample"
//         question={{
//           question_id: 543290,
//           question_helpfulness: 3,
//           question_body: 'new question',
//           answers: [],
//         }}
//         renderQuestions={renderMock}
//       />
//     </QuestionListProvider>
//   );


// });
