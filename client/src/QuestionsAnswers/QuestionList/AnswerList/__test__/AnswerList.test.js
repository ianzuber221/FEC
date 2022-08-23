/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import styled from 'styled-components';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import AnswerList from '../AnswerList';
import '@testing-library/jest-dom/extend-expect';

const renderMock = jest.fn();

const answerList = [
  {
    id: 123,
    answerer_name: 'test',
    date: new Date('December 17, 1995 03:24:00'),
    photos: [],
    body: 'new answer',
  },
  {
    id: 124,
    answerer_name: 'test',
    date: new Date('December 17, 1995 03:24:00'),
    photos: [],
    body: 'new answer',
  },
  {
    id: 125,
    answerer_name: 'test',
    date: new Date('December 17, 1995 03:24:00'),
    photos: [],
    body: 'new answer',
  },
];

const Title = styled.div`
`;

it('should match snapshot', () => {
  const component = renderer.create(
    <AnswerList
      answerList={answerList}
      renderAnswers={renderMock}
      Title={Title}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('when clicked "LOAD MORE ANSWERS", text should change to "COLLAPSE ANSWERS"', async () => {
  const { getByText } = render(
    <AnswerList
    answerList={answerList}
    renderAnswers={renderMock}
    Title={Title}
    />
  );

  const load = getByText('LOAD MORE ANSWERS');
  expect(load).toBeInTheDocument();
  await userEvent.click(load);
  expect(getByText('COLLAPSE ANSWERS')).toBeInTheDocument();
})