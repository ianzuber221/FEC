/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import Report from '../Report';
import '@testing-library/jest-dom/extend-expect';

let confirmSpy;


beforeAll(() => {
    confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(jest.fn(() => false));
});

afterAll(() => confirmSpy.mockRestore());

it('should match snapshot', async () => {
  const component = renderer.create(
    <Report
      id={5986818}
      type='answer'
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should appear a confirmation message when report is clicked', async () => {
  const { findByText, getByText } = render(
    <Report
      id={5986821}
      type='answer'
    />
  );

  const report = getByText('Report');
  await userEvent.click(report);
  expect(confirmSpy).toBeCalled();
});