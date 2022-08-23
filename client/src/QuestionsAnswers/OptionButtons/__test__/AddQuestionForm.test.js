/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import AddQuestionForm from '../AddQuestionForm';
import '@testing-library/jest-dom/extend-expect';

require('dotenv').config();

const setModalMock = jest.fn();
afterEach(() => {
  jest.clearAllMocks();
});

it('should modify input value attribute to user input', async () => {
  render(<AddQuestionForm
    show
    setShowModal={()=>{}}
    productName="abc"
    renderQuestions={()=>{}}
    />);

  const input = screen.getByPlaceholderText('Example: jackson11!');
  await userEvent.type(input, 'username123');

  expect(input.value).toBe('username123');
});

it('should invoke setShowModal with false when form is submitted', async () => {
  const { getByTestId } = render(<AddQuestionForm
    show
    setShowModal={setModalMock}
    productName="abc"
    renderQuestions={()=>{}}
    />);

  const questionInput = getByTestId('question-input');
  const usernameInput = getByTestId('username-input');
  const emailInput = getByTestId('email-input');
  await userEvent.type(questionInput, 'new question');
  await userEvent.type(usernameInput, 'new username');
  await userEvent.type(emailInput, 'email@gmail.com');

  const submitButton = getByTestId('form-button-test');
  await userEvent.click(submitButton);

  // check that setShowModal is invoked.
  expect(setModalMock).toHaveBeenCalledWith(false);
});

it('should invoke setShowModal with false when close button is clicked', async () => {
  const { getByTestId } = render(<AddQuestionForm
    show
    setShowModal={setModalMock}
    productName="abc"
    renderQuestions={()=>{}}
    />);

  const closeButton = getByTestId('close-button-test');
  await userEvent.click(closeButton);

  // check that setShowModal is invoked.
  expect(setModalMock).toHaveBeenCalledWith(false);
});
