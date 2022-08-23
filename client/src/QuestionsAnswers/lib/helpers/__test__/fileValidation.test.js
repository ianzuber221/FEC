/**
 * @jest-environment jsdom
 */
import { waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import fileValidation from '../fileValidation';
import '@testing-library/jest-dom/extend-expect';

it('should call when valid image is provided', async () => {
  const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

  const readAsDataURLSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL');
  const success = jest.fn(()=>console.log('called success'));
  const err = jest.fn(() => console.log('called error'));
  const file = new File(["(⌐□_□)"], "http://res.cloudinary.com/dl9zxpaoq/image/upload/v1658255367/cv9ghenayxntg97bh4cp.jpg", { type: "image/png" });


  waitFor(()=> fileValidation(file, success, err));
  await pauseFor(1000);
  expect(readAsDataURLSpy).toHaveBeenCalled();
});