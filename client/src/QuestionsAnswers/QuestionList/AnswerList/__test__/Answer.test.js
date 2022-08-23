/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { jest } from '@jest/globals';
import Answer from '../Answer';
import '@testing-library/jest-dom/extend-expect';

const renderMock = jest.fn();

it('should match snapshot', () => {
  const component = renderer.create(
    <Answer
      answer={{
        id: 123,
        answerer_name: 'test',
        date: new Date('December 17, 1995 03:24:00'),
        photos: [],
        body: 'new answer',
      }}
      renderAnswers={renderMock}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});