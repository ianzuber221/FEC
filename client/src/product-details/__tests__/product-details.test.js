/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Overview from '../Overview';
import ProductDetails from '../ProductDetails';
import Modal from '../Modal';
import AddToCart from '../AddToCart';
import ImageGallery from '../ImageGallery';
import StyleSelector from '../StyleSelector';
import checkmark from '../assets/checkmark.png';

describe('render tests', () => {
  test('Overview renders correctly', () => {
    const tree = renderer
      .create(<Overview productId="37315" ratingsRef={{}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ProductDetails renders correctly 1', () => {
    const tree = renderer
      .create(<ProductDetails product={{}} currentStyle={{}} productReviews={{ ratings: ['example'] }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('ProductDetails renders correctly 2', () => {
    const tree = renderer
      .create(<ProductDetails product={{}} currentStyle={{}} productReviews={{ ratings: [] }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('ProductDetails renders correctly 3', () => {
    const tree = renderer
      .create(<ProductDetails product={{}} currentStyle={{ sales_price: '5' }} productReviews={{ ratings: ['example'] }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('ProductDetails renders correctly 4', () => {
    const tree = renderer
      .create(<ProductDetails product={{}} currentStyle={{ sales_price: '5' }} productReviews={{ ratings: [] }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Modal renders correctly 1', () => {
    const tree = renderer
      .create(<Modal mainImage={<div></div>} galleryList={[<div></div>]} setModal={console.log()} modalZoom="" setModalZoom={console.log()} range={[0, 7]} handlePrevClick={console.log()} handleNextClick={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Modal renders correctly 2', () => {
    const tree = renderer
      .create(<Modal mainImage={<div></div>} galleryList={[<div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>]} setModal={console.log()} modalZoom="" setModalZoom={console.log()} range={[0, 7]} handlePrevClick={console.log()} handleNextClick={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Modal renders correctly 3', () => {
    const tree = renderer
      .create(<Modal mainImage={<div></div>} galleryList={[<div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>]} setModal={console.log()} modalZoom="" setModalZoom={console.log()} range={[1, 8]} handlePrevClick={console.log()} handleNextClick={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Modal renders correctly 4', () => {
    const tree = renderer
      .create(<Modal mainImage={<div></div>} galleryList={[<div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>]} setModal={console.log()} modalZoom="" setModalZoom={console.log()} range={[1, 7]} handlePrevClick={console.log()} handleNextClick={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Modal renders correctly 5', () => {
    const tree = renderer
      .create(<Modal mainImage={<div></div>} galleryList={[<div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>, <div></div>]} setModal={console.log()} modalZoom setModalZoom={console.log()} range={[1, 6]} handlePrevClick={console.log()} handleNextClick={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('StyleSelector renders correctly 1', () => {
    const tree = renderer
      .create(<StyleSelector styles={[]} currentStyle={{}} setCurrentStyle={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('StyleSelector renders correctly 2', () => {
    const tree = renderer
      .create(<StyleSelector styles={[{ photos: [{ thumbnail_url: checkmark }], name: 'exampleName', style_id: '1' }]} currentStyle={{ photos: [{ thumbnail_url: checkmark }], name: 'exampleName', style_id: '1' }} setCurrentStyle={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('StyleSelector renders correctly 3', () => {
    const tree = renderer
      .create(<StyleSelector styles={[{ photos: [{ thumbnail_url: checkmark }], name: 'exampleName', style_id: '1' }]} currentStyle={{ photos: [{ photos: [{ thumbnail_url: checkmark }], name: 'exampleName', style_id: '1' }], name: 'exampleName', style_id: '1' }} setCurrentStyle={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('AddToCart renders correctly 1', () => {
    const tree = renderer
      .create(<AddToCart currentStyle={{ skus: [] }} currentSize="" setCurrentSize={console.log()} currentAmount="" setCurrentAmount={console.log()} sizeAlert="" setSizeAlert={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('AddToCart renders correctly 2', () => {
    const tree = renderer
      .create(<AddToCart currentStyle={{ skus: [{ size: 'M', quantity: '5' }] }} currentSize="" setCurrentSize={console.log()} currentAmount="" setCurrentAmount={console.log()} sizeAlert="" setSizeAlert={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('AddToCart renders correctly 3', () => {
    const tree = renderer
      .create(<AddToCart currentStyle={{ skus: [{ size: 'M', quantity: '5' }] }} currentSize="M" setCurrentSize={console.log()} currentAmount="" setCurrentAmount={console.log} sizeAlert="" setSizeAlert={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('AddToCart renders correctly 4', () => {
    const tree = renderer
      .create(<AddToCart currentStyle={{ skus: [{ size: 'M', quantity: '16' }] }} currentSize="M" setCurrentSize={console.log()} currentAmount="" setCurrentAmount={console.log} sizeAlert="" setSizeAlert={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ImageGallery renders correctly 1', () => {
    const tree = renderer
      .create(<ImageGallery currentStyle={{ photos: [{ url: './assets/checkmark.png' }] }} currentThumbnail={['./assets/checkmark.png', '0']} setCurrentThumbnail={console.log()} modal="" setModal={console.log()} zoom="" setZoom={console.log()} modalZoom="" setModalZoom={console.log()} range={[0, 7]} setRange={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('ImageGallery renders correctly 2', () => {
    const tree = renderer
      .create(<ImageGallery currentStyle={{ photos: [{ url: './assets/checkmark.png' }] }} currentThumbnail={['./assets/checkmark.png', '0']} setCurrentThumbnail={console.log()} modal="on" setModal={console.log()} zoom="" setZoom={console.log()} modalZoom="" setModalZoom={console.log()} range={[0, 7]} setRange={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('ImageGallery renders correctly 3', () => {
    const tree = renderer
      .create(<ImageGallery currentStyle={{ photos: [{ url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }] }} currentThumbnail={['./assets/checkmark.png', '0']} setCurrentThumbnail={console.log()} modal="" setModal={console.log()} zoom="" setZoom={console.log()} modalZoom="" setModalZoom={console.log()} range={[0, 7]} setRange={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('ImageGallery renders correctly 4', () => {
    const tree = renderer
      .create(<ImageGallery currentStyle={{ photos: [{ url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }] }} currentThumbnail={['./assets/checkmark.png', '0']} setCurrentThumbnail={console.log()} modal="" setModal={console.log()} zoom="" setZoom={console.log()} modalZoom="" setModalZoom={console.log()} range={[1, 8]} setRange={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('ImageGallery renders correctly 5', () => {
    const tree = renderer
      .create(<ImageGallery currentStyle={{ photos: [{ url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }, { url: './assets/checkmark.png' }] }} currentThumbnail={['./assets/checkmark.png', '0']} setCurrentThumbnail={console.log()} modal="" setModal={console.log()} zoom setZoom={console.log()} modalZoom="" setModalZoom={console.log()} range={[1, 7]} setRange={console.log()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('format test', () => {
  it('should have a type of object', () => {
    const component = <Overview />;
    expect(typeof component).toEqual('object');
  });
  it('should have a type of object', () => {
    const component = <ProductDetails />;
    expect(typeof component).toEqual('object');
  });
  it('should have a type of object', () => {
    const component = <ImageGallery />;
    expect(typeof component).toEqual('object');
  });
  it('should have a type of object', () => {
    const component = <Modal />;
    expect(typeof component).toEqual('object');
  });
  it('should have a type of object', () => {
    const component = <StyleSelector />;
    expect(typeof component).toEqual('object');
  });
  it('should have a type of object', () => {
    const component = <AddToCart />;
    expect(typeof component).toEqual('object');
  });
});
