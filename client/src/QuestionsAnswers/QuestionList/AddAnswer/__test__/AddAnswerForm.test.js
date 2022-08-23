/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import AddAnswerForm from '../AddAnswerForm';
import '@testing-library/jest-dom/extend-expect';

const setModalMock = jest.fn();
const question = {
  question_id: 1,
  question_body: 'this is a test question',
};
const submitHandlerMock = jest.fn();
const productName = 'abc';

afterEach(() => {
  jest.clearAllMocks();
});

it('should modify input value attribute to user\'s input', async () => {
  render(<AddAnswerForm
    show
    setShowModal={setModalMock}
    question={question}
    submitHandler={submitHandlerMock}
    productName={productName}
    />);

  const input = screen.getByPlaceholderText('Example: jack543!');
  await userEvent.type(input, 'username123');

  expect(input.value).toBe('username123');
});

it('should invoke setShowModal with false when form is submitted', async () => {
  const { getByTestId } = render(<AddAnswerForm
    show
    setShowModal={setModalMock}
    question={question}
    submitHandler={submitHandlerMock}
    productName={productName}
    />);

  const AnswerInput = getByTestId('answer-input');
  const usernameInput = getByTestId('username-input');
  const emailInput = getByTestId('email-input');
  await userEvent.type(AnswerInput, 'new answer');
  await userEvent.type(usernameInput, 'new username');
  await userEvent.type(emailInput, 'email@gmail.com');

  const submitButton = getByTestId('form-button-test');
  await userEvent.click(submitButton);

  // check that setShowModal is invoked.
  expect(setModalMock).toHaveBeenCalledWith(false);
});

it('should invoke setShowModal with false when close button is clicked', async () => {
  const { getByTestId } = render(<AddAnswerForm
    show
    setShowModal={setModalMock}
    question={question}
    submitHandler={submitHandlerMock}
    productName={productName}
    />);

  const closeButton = getByTestId('close-button-test');
  await userEvent.click(closeButton);

  // check that setShowModal is invoked.
  expect(setModalMock).toHaveBeenCalledWith(false);
});