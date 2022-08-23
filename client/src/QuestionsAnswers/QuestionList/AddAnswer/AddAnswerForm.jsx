import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import ImageInput from './ImageInput';

function AddAnswerForm({ show, setShowModal, question, submitHandler, productName }) {
  if (!show) return null;
  const questionId = question.question_id;
  const questionBody = question.question_body;
  const [formValue, setFormValue] = useState({ body: '', name: '', email: '' });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const answerInput = (
    <FormInput
      attribute={{
        label: 'Your Answer',
        'data-testid': 'answer-input',
        type: 'textarea',
        name: 'body',
        value: formValue.body,
        placeholder: '',
        maxLength: 1000,
        required: true,
        onChange: inputChangeHandler,
        onInvalid: (e) => e.target.setCustomValidity('Answer is required'),
        onInput: (e) => e.target.setCustomValidity(''),
      }}
    />
  );

  const usernameInput = (
    <>
      <FormInput
        attribute={{
          label: 'What is your nickname',
          'data-testid': 'username-input',
          type: 'text',
          name: 'name',
          value: formValue.name,
          placeholder: 'Example: jack543!',
          maxLength: 60,
          required: true,
          onChange: inputChangeHandler,
          onInvalid: (e) => e.target.setCustomValidity('Username is required'),
          onInput: (e) => e.target.setCustomValidity(''),
        }}
      />
      *For privacy reasons, do not use your full name or email address
    </>
  );

  const emailInput = (
    <>
      <FormInput
        attribute={{
          label: 'Your email',
          'data-testid': 'email-input',
          type: 'email',
          name: 'email',
          value: formValue.email,
          placeholder: 'Example: jack@email.com',
          maxLength: 60,
          required: true,
          onChange: inputChangeHandler,
          onInvalid: (e) => e.target.setCustomValidity('Valid email is required'),
          onInput: (e) => e.target.setCustomValidity(''),
        }}
      />
      *For authentication reasons, you will not be emailed
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler(formValue);
    setShowModal(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setFormValue({ body: '', name: '', email: '' });
    setShowModal(false);
  };

  return (
    <Modal data-testid="add-answer-modal">
      <PopupForm id={`${questionId}-popup`} onSubmit={handleSubmit}>
        <Header>
          <Title>
            Submit your Answer
            <XButton onClick={handleClose}>X</XButton>
          </Title>
          <Subtitle size="15px">{`${productName}:`}</Subtitle>
          <Subtitle>{questionBody}</Subtitle>
        </Header>
        {answerInput}
        {usernameInput}
        {emailInput}
        <ImageInput
          formValue={formValue}
          setFormValue={setFormValue}
        />
        <FormButton
          handleClose={handleClose}
        />
      </PopupForm>
    </Modal>
  );
}

export default AddAnswerForm;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 200;
  background-color: rgba(0,0,0,.7);
  overflow: auto;
`;

const PopupForm = styled.form`
  position: relative;
  max-width: 51.0714285714rem;
  width: 400px;
  max-height: 80%;
  margin: 5vh auto;
  padding: 1.5%;
  /* padding: 1.7142857143rem 1.1428571429rem; */
  background-color: #fff;
  border-radius: .2857142857rem;
  font-size: small;
  overflow: auto;
`;

const Header = styled.div`
  padding-bottom: 10px;
`;

const Title = styled.div`
  /* font-size: 1.5rem;
  padding: 10px 0; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: large;
  font-weight: bold;
  width: 100% ;
  border-bottom: .5px solid black;
  padding-bottom: 1%;
  margin-bottom: 2%;
`;

const Subtitle = styled.div`
  font-size: 1.1rem;
  padding: 2px 0;
  font-size: ${(props) => props.size};
`;

const XButton = styled.button`
  color: #1c1c1c;
  font-size: 13px;
  background-color: white;
  width: auto;
  font-weight: light;
  border-radius: 3px;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;
