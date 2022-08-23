/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import Helpful from '../Helpful';
import '@testing-library/jest-dom/extend-expect';

require('dotenv').config();

const mock = jest.fn();

it('should call renderComponent when clicked', async () => {
  const { getByText, asFragment } = render(
    <Helpful
      id={543290}
      type='question'
      currentCount={'abc'}
      renderComponent={mock}
    />
  );

  const yes = getByText('Yes');
  await userEvent.click(yes);

  await waitFor(() => expect(mock).toHaveBeenCalled());
});