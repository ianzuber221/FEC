/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import styled from 'styled-components';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import AddQuestion from '../AddQuestion';
import '@testing-library/jest-dom/extend-expect';

const mockRenderQuestions = jest.fn();
const Button = styled.div``;

it('should show a button', () => {
  render(<AddQuestion renderQuestions={mockRenderQuestions} Button={Button} productName='abc' />);

  const button = screen.getByTestId('add-question-btn');
  expect(button).toBeInTheDocument();
});


// on click of the button it should set the showmodal to true
it('should show form when button is clicked', async () => {
  const { queryByTestId, getByTestId} = render(<AddQuestion renderQuestions={mockRenderQuestions} Button={Button} productName='abc' />);

  const button = getByTestId('add-question-btn');
  // check that the form does not exist
  const form = queryByTestId('add-question-form');
  expect(form).toBeNull();
  userEvent.click(button);
  await waitFor(() => {
    expect(screen.queryByTestId('add-question-form')).toBeInTheDocument();
  });
});