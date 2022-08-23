/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from '@testing-library/react';
import styled from 'styled-components';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import MoreQuestions from '../MoreQuestions';
import '@testing-library/jest-dom/extend-expect';

const setExpandedMock = jest.fn();
const Button = styled.button`
`;

it('should invoke setExpanded with true when button is clicked', async () => {
  const { getByTestId } = render(<MoreQuestions
    expanded={false}
    setExpanded={setExpandedMock}
    Button={Button}
    />);

  const button = getByTestId('more-question-btn');
  await userEvent.click(button);

  expect(setExpandedMock).toHaveBeenCalledWith(true);
});
