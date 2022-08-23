import React from 'react';
import {
  render, screen, cleanup, fireEvent, waitFor,
  waitForElementToBeRemoved, queryByAttribute, findByText,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import RatingsReviews from '../RatingsReviews';
import Reviews from '../Reviews/Reviews';
import { CurrentProductProvider } from '../../context';

require('dotenv').config();

const getById = queryByAttribute.bind(null, 'id');

test('should load all subcomponents on reviews side', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>,
  );
  // WAIT until element that has placeholder text to be removed
  await waitForElementToBeRemoved(screen.getByText('loading. . .'));
  const addbar = screen.getByTestId('addbar-1');
  const reviews = screen.getByTestId('reviews-1');
  const sortbar = screen.getByTestId('sortbar-1');

  expect(addbar).toBeInTheDocument();
  expect(reviews).toBeInTheDocument();
  expect(sortbar).toBeInTheDocument();
});

test('properly marks a review as helpful', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>,
  );
  // WAIT until element that has placeholder text to be removed
  await waitForElementToBeRemoved(screen.getByText('loading reviewtiles'));
  const helpfulButton = await screen.findByTestId('helpful-button-0'); // findall will wait til it is found
  const helpfulCount = await screen.findByTestId('helpful-count-0');
  const reviewlist = await screen.findByTestId('reviewlist');
  const before = reviewlist.textContent;
  let after;
  await waitFor(async () => {
    fireEvent.click(helpfulButton);
    after = await screen.findByTestId('reviewlist');
  });

  expect(before).not.toBe(after);
});

test('testing if photopop shows', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>,
  );
  // WAIT until element that has placeholder text to be removed
  await waitForElementToBeRemoved(screen.getByText('loading reviewtiles'));

  const photo = await screen.findByTestId('photo-0-0');
  fireEvent.click(photo);
  const photopop = screen.getByTestId('photopop');
  expect(photopop).toBeInTheDocument();
});

const setMock = jest.fn();
afterEach(() => {
  jest.clearAllMocks();
});

test('reviews component render', async () => {
  const reviews = await render(<Reviews
    productId={37311}
    totalRatings={5}
    reviews={[], []}
    moreReviews={setMock}
    setSort={() => {}}
    getReviews={()=>{}}
    scrollMore={() => {}}
    page={1}
    isLoaded={true}
  />);
  const reviewtiles = await screen.findByTestId('reviewtiles')
  expect(reviewtiles).toBeInTheDocument;
});

test('add button functioning', async () => {
  const reviews = await render(<Reviews
    productId={37311}
    totalRatings={5}
    reviews={[], []}
    moreReviews={setMock}
    setSort={() => {}}
    getReviews={()=>{}}
    scrollMore={() => {}}
    page={1}
    isLoaded={true}
  />);
  const morebutton = await screen.findByTestId('morebutton');
  expect(morebutton).toBeInTheDocument;
  await userEvent.click(morebutton);
  await waitFor(() => expect(setMock).toHaveBeenCalled());
});