/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import RelatedItems from '../related-items';
import ProductList from '../ProductList';
import AddOutfit from '../addOutfit';
import Comparison from '../comparison';
import Product from '../product';

// import  from '../';

const testCard = {
  id: 1,
  image:
    'https://ngca.net/wp-content/uploads/2020/09/image-coming-soon-placeholder.png',
  category: 'COSTCO CHIC',
  name: 'Costco Shirt',
  price: '$5',
  discountedPrice: null,
  description: 'Cool shirt from Costco',
  features: 'It is what it is',
};

describe('Related-items tests', () => {
  test('Related-items renders correctly', () => {
    const tree = renderer.create(<RelatedItems />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Related-items renders correctly', () => {
    const tree = renderer.create(<Comparison />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Product renders correctly', () => {
    const tree = renderer.create(<Product />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render product', () => {
    const { getbyTestId } = render(<Product/>);
    const star = findByTestId("Star");
    expect(star).not.toBe('undefined');
  });
});
