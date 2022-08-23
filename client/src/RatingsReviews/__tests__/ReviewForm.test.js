import React from 'react';
import {
  render, screen, cleanup, fireEvent, queryByAttribute, waitFor,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import ReviewForm from '../Reviews/AddReview/ReviewForm';

test('renders reviewform correctly', () => {
  const reviewForm = renderer.create(<ReviewForm />);
  expect(typeof reviewForm).toEqual('object');
});

const getById = queryByAttribute.bind(null, 'id');

test('star rating bar does something when clicked', () => {
  const reviewForm = render(<ReviewForm />);
  const fivestar = getById(reviewForm.container, 'star-5');
  const before = fivestar.textContent;
  console.log(before);
  fireEvent.click(fivestar);
  const after = fivestar.textContent;
  console.log(after, 'after');
  expect(before).not.toBe(after);
});

test('star rating bar does something when clicked', () => {
  const reviewForm = render(<ReviewForm />);
  const fivestar = getById(reviewForm.container, 'star-5');
  const fourstar = getById(reviewForm.container, 'star-4');
  fireEvent.click(fivestar); // fivestar should be solid now
  const before = fivestar.textContent;
  console.log(before);
  fireEvent.click(fourstar); // clicking fourstar should make fivestar white.
  const after = fivestar.textContent;
  console.log(after, 'after');
  expect(before).not.toBe(after);
});

test('characteristics ratings does something when clicked', () => {
  const reviewForm = render(<ReviewForm />);
  const charbutton = getById(reviewForm.container, '125031-3');
  const before = charbutton.style.backgroundColor;
  console.log(before);
  fireEvent.click(charbutton);
  const after = charbutton.style.backgroundColor;
  console.log(after, 'after');
  expect(before).not.toBe(after);
});

test('button should change when other button is clicked', () => {
  const reviewForm = render(<ReviewForm />);
  const charbutton = getById(reviewForm.container, '125031-3');
  const charbutton2 = getById(reviewForm.container, '125031-2');
  fireEvent.click(charbutton);
  const before = charbutton.style.backgroundColor;
  fireEvent.click(charbutton2);
  const after = charbutton.style.backgroundColor;
  expect(before).not.toBe(after);
});

test('clicking uploadphoto button should load photoform', () => {
  const reviewForm = render(<ReviewForm />);
  const addphotobutton = getById(reviewForm.container, 'uploadphoto');
  fireEvent.click(addphotobutton);

  const photouploadform = screen.getByTestId('photouploadform');

  expect(photouploadform).toBeInTheDocument();
});

const setMock = jest.fn();
afterEach(() => {
  jest.clearAllMocks();
});

test('should modify input value', async () => {
  const reviewForm = render(<ReviewForm
    addReview={() => {}}
    productId={37311}
    toggleForm={() => {}}
  />);
  const input = screen.getByTestId('name-input');
  await userEvent.type(input, 'name');

  expect(input.value).toBe('name');
});

test('submit form after inputs', async () => {
  const jsdomAlert = window.alert; // remember the jsdom alert
  window.alert = () => {}; // provide an empty implementation for window.alert
  const reviewForm = render(<ReviewForm
    addReview={() => {}}
    productId={37311}
    toggleForm={setMock}
  />);

  const summaryInput = screen.getByTestId('summary-input');
  const nameInput = screen.getByTestId('name-input');
  const emailInput = screen.getByTestId('email-input');
  const bodyInput = screen.getByTestId('body-input');
  const fivestar = getById(reviewForm.container, 'star-5');
  const charbutton = getById(reviewForm.container, '125031-3');
  const charbutton2 = getById(reviewForm.container, '125032-3');
  const charbutton3 = getById(reviewForm.container, '125033-3');
  const charbutton4 = getById(reviewForm.container, '125034-3');
  const submitButton = screen.getByTestId('submit-button');

  await userEvent.type(summaryInput, 'summary hereasdfasf');
  await userEvent.type(nameInput, 'name here');
  await userEvent.type(emailInput, 'em@email.com');
  await userEvent.type(bodyInput, 'body input should be 20 characters or more right nowasf');
  await userEvent.click(fivestar);
  await userEvent.click(charbutton);
  await userEvent.click(charbutton2);
  await userEvent.click(charbutton3);
  await userEvent.click(charbutton4);

  await userEvent.click(submitButton);
  await fireEvent.click(submitButton);

  await waitFor(() => expect(setMock).toHaveBeenCalled());

  window.alert = jsdomAlert;
});
