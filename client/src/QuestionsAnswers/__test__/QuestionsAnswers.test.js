/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import QuestionsAnswers from '../QuestionsAnswers';
import '@testing-library/jest-dom/extend-expect';
import { CurrentProductProvider } from '../../context';
import { QuestionListProvider } from '../contexts/QuestionListContext';

require('dotenv').config();

it('matches snapshot', async () => {
  const { getAllByText } = await render(
    <CurrentProductProvider>
      <QuestionListProvider>
        <QuestionsAnswers />
      </QuestionListProvider>
    </CurrentProductProvider>
  );

  await waitForElementToBeRemoved(screen.getByText('No Questions Available.'));
  expect(getAllByText('Q:').length > 0).toBe(true);
});