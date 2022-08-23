/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import ImageInput from '../ImageInput';
import '@testing-library/jest-dom/extend-expect';

const formValue = {
  body: 'abc',
  name: 'username',
  email: 'random@gmail.com',
  photos: [],
};

const setFormValueMock = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

it('should show \'No files selected\' when no image is uploaded', () => {
  const { getByTestId } = render(
    <ImageInput
      formValue={formValue}
      setFormValue={setFormValueMock}
    />
  );
  const p = getByTestId('no-files-selected');
  expect(p).toBeInTheDocument();
});

it('should show image', () => {
  formValue.photos = [{file: "http://res.cloudinary.com/dl9zxpaoq/image/upload/v1658255367/cv9ghenayxntg97bh4cp.jpg"}];

  const { getByRole } = render(
    <ImageInput
      formValue={formValue}
      setFormValue={setFormValueMock}
    />
  );
  const img = getByRole('img');
  expect(img).toBeInTheDocument();

});

it('should delete image from formValue when clicked \'x\'', async () => {
  const { getByTestId } = render(
    <ImageInput
      formValue={formValue}
      setFormValue={setFormValueMock}
    />
  );

  expect(formValue.photos.length).toBe(1);
  const deleteButton = getByTestId('delete-button');
  await userEvent.click(deleteButton);
  expect(formValue.photos.length).toBe(0);
  // await waitFor(() => {
  //   queryByText('No files selected.').toBeInTheDocument();
  //   screen.debug();
  // });

});

jest.spyOn(global, 'FileReader').mockImplementation(function () {
  this.readAsDataURL = jest.fn();
});


// it('should call fileReader.', async () => {
//   const { getByTestId, getByText } = render(
//     <ImageInput
//       formValue={formValue}
//       setFormValue={setFormValueMock}
//     />
//   );

//   jest.spyOn(global, 'FileReader').mockImplementation(() => {
//     this.readAsDataURL = jest.fn();
//   });

//   const uploader = getByTestId("image-input");
//   await waitFor(() =>
//     fireEvent.change(uploader, {
//       target: { files: [file] },
//     })
//   );

//   let reader = FileReader.mock.instances[0];
//   expect(reader.readAsDataURL).toHaveBeenCalled();
//   expect(reader.onload).toBe(expect.any(Function));

//   // expect(wrapper.find('#preview').prop('src')).toBeNull();

//   // reader.onload({ target: { result: 'foo' } });

//   // expect(wrapper.find('#preview').prop('src')).toBe('foo');

//   // const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
//   // const file = new File(["(⌐□_□)"], "http://res.cloudinary.com/dl9zxpaoq/image/upload/v1658255367/cv9ghenayxntg97bh4cp.jpg", { type: "image/png" });

//   // const readAsDataURLSpy = jest.spyOn(FileReader.prototype, 'readAsDataURL');

//   // // await pauseFor(1000);
//   // expect(readAsDataURLSpy).toHaveBeenCalled();
//   // await waitFor(() => expect(setFormValueMock).toHaveBeenCalled());
//   // expect(FileReader).toHaveBeenCalled();

// })