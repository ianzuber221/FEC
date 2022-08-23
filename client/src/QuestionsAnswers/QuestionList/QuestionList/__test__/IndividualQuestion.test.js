/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { jest } from '@jest/globals';
import IndividualQuestion from '../IndividualQuestion';
import '@testing-library/jest-dom/extend-expect';
import * as apis from '../../../lib/api/githubAPI';

require('dotenv').config();

const renderMock = jest.fn();

it('should match snapshot', () => {
  const component = renderer.create(
    <IndividualQuestion
      productName="sample"
      question={{
        question_id: 123,
        question_helpfulness: 3,
        question_body: 'new answer',
      }}
      renderQuestions={renderMock}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

it('should show modal upon clicking "add answer"', async () => {
  const { getByText, getByTestId } = render(
    <IndividualQuestion
      productName="sample"
      question={{
        question_id: 123,
        question_helpfulness: 3,
        question_body: 'new answer',
      }}
      renderQuestions={renderMock}
    />
  );

  const addAnswer = getByText('Add Answer');
  await userEvent.click(addAnswer);

  const modal = getByTestId('add-answer-modal');
  expect(modal).toBeInTheDocument();

});

it('should render after form is submitted', async () => {
  render(
    <IndividualQuestion
      productName="sample"
      question={{
        question_id: 543290,
        question_helpfulness: 3,
        question_body: 'new question',
        answers: [],
      }}
      renderQuestions={renderMock}
    />
  );

  const answer = screen.queryByText('Hi this is from the Seller');
  expect(answer).toBeNull();

  const addAnswer = screen.getByText('Add Answer');
  await userEvent.click(addAnswer);

  const modal = screen.getByTestId('add-answer-modal');
  expect(modal).toBeInTheDocument();

  const AnswerInput = screen.getByTestId('answer-input');
  const usernameInput = screen.getByTestId('username-input');
  const emailInput = screen.getByTestId('email-input');
  await userEvent.type(AnswerInput, 'new answer');
  await userEvent.type(usernameInput, 'new username');
  await userEvent.type(emailInput, 'email@gmail.com');

  const submitButton = screen.getByTestId('form-button-test');
  await userEvent.click(submitButton);

  const modal2 = screen.queryByTestId('add-answer-modal');
  expect(modal2).toBeNull();

  const answerText = await screen.findByText('Hi this is from the Seller');
  expect(answerText).toBeInTheDocument();

});
