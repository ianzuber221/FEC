import React from 'react';
import {
  render, screen, cleanup, fireEvent, waitFor, waitForElementToBeRemoved
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import RatingsReviews from '../RatingsReviews';
import { CurrentProductProvider } from '../../context';
import userEvent from '@testing-library/user-event';

require('dotenv').config();

test('should properly render out entire widget', () => {
  render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>
  );

  const addbutton = screen.getByTestId('addbutton');
  expect(typeof addbutton).toEqual('object');
});

test('should get average rating upon load', async () => {
  render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>
  );
  const totalratings = await screen.findByTestId('averagerating');
  //console.log(totalratings.textContent, 'is the freaking text content');
  expect(totalratings.textContent).not.toBe('undefined');
});

test('matches snapshot', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>
  );
  // WAIT until element that has placeholder text to be removed
  await waitForElementToBeRemoved(screen.getByText('loading. . .'));

  expect(asFragment()).toMatchSnapshot(); // take snapshot
});


test('properly loads reviews', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>
  );
  // WAIT until element that has placeholder text to be removed
  await waitForElementToBeRemoved(screen.getByText('loading reviewtiles'));
  const reviewtiles = screen.getByTestId('reviewtiles');
  expect(typeof reviewtiles).toEqual('object'); // take snapshot
});

// test('properly adds more reviews', async () => {
//   const { asFragment } = await render(
//     <CurrentProductProvider>
//       <RatingsReviews />
//     </CurrentProductProvider>
//   );
//   await waitForElementToBeRemoved(screen.getByText('loading reviewtiles'))
//   const reviewlist = await screen.findByTestId('reviewlist');
//   let before = reviewlist.textContent;
//   await console.log(reviewlist.textContent);
//   const morebutton = screen.getByTestId('morebutton');
//   await fireEvent.click(morebutton);
//   let after = reviewlist.textContent;
//   console.log(after);
//   expect(before).not.toBe(after); // compare
// });

test('properly pops up add review form', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>
  );
  await waitForElementToBeRemoved(screen.getByText('loading reviewtiles'));
  const addbutton = screen.getByTestId('addbutton');
  fireEvent.click(addbutton);
  const addreviewform = screen.getByTestId('addreviewform');

  expect(typeof addreviewform).toEqual('object'); //form should exist in dom when addbutton is clicked.
})

test('shoul;d uh', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>
  );
  await waitForElementToBeRemoved(screen.getByText('loading reviewtiles'));
})

test('shoul;d uh simulate select', async () => {
  const { asFragment } = await render(
    <CurrentProductProvider>
      <RatingsReviews />
    </CurrentProductProvider>
  );
  //const firstRender = asFragment();
  let newest = screen.findByTestId('newest-option');
  await userEvent.selectOptions(screen.getByTestId('sortoptions'), screen.getByTestId('newest-option'));
  expect(screen.getByTestId('newest-option').selected).toBeTruthy();
})