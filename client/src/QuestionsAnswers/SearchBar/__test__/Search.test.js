/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import Search from '../Search';
import '@testing-library/jest-dom/extend-expect';

const mockSetFilter = jest.fn(() => {});

it('should show search bar form with placeholder', () => {
  render(<Search setFilter={()=> {}}/>);
  const input = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
  expect(input).toBeInTheDocument();
});

it('should modify input value attribute to user input', async () => {
  render(<Search setFilter={mockSetFilter} />);
  const input = screen.getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
  await userEvent.type(input, 'a');

  expect(input.value).toBe('a');
});