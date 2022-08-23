import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { postQuestion } from '../lib/api/githubAPI';
import { useCurrentProductContext } from '../../context';

function AddQuestionForm({ show, setShowModal, productName, renderQuestions }) {
  if (!show) return null;
  const productId = useCurrentProductContext();
  const [formValue, setFormValue] = useState({ body: '', name: '', email: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const questionInput = (
    <>
      <FormInput
        attribute={{
          id: 'question-input',
          'data-testid': 'question-input',
          label: 'Your Question',
          type: 'textarea',
          name: 'body',
          value: formValue.body || '',
          placeholder: '',
          required: true,
          maxLength: 1000,
          onChange,
          onInvalid: (e) => e.target.setCustomValidity('Question is required'),
          onInput: (e) => e.target.setCustomValidity(''),
        }}
      />
      *For privacy reasons, do not use your full name or email address
    </>
  );

  const usernameInput = (
    <>
      <FormInput
        attribute={{
          id: 'username-input',
          'data-testid': 'username-input',
          label: 'What is your nickname',
          type: 'username',
          name: 'name',
          value: formValue.name || '',
          placeholder: 'Example: jackson11!',
          required: true,
          maxLength: 60,
          onChange,
          onInvalid: (e) => e.target.setCustomValidity('Username is required'),
          onInput: (e) => e.target.setCustomValidity(''),
        }}
      />
      *For authentication reasons, you will not be emailed
    </>
  );

  const emailInput = (
    <FormInput
      attribute={{
        id: 'email-input',
        'data-testid': 'email-input',
        label: 'Your email',
        type: 'email',
        name: 'email',
        value: formValue.email || '',
        placeholder: 'Example: jack@email.com',
        required: true,
        maxLength: 60,
        onChange,
        onInvalid: (e) => e.target.setCustomValidity('Valid email is required'),
        onInput: (e) => e.target.setCustomValidity(''),
      }}
    />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    postQuestion(productId, formValue)
      .then(() => {
        renderQuestions(true);
      });
    setShowModal(false);
    const list = document.getElementById('question-scroller');
    list.scrollTo(0, 0);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setFormValue({ body: '', name: '', email: '' });
    setShowModal(false);
  };

  return (
    <Modal>
      <PopupForm id={`${productId}-popup`} data-testid='add-question-form' onSubmit={handleSubmit}>
        <Header>
          <Title>
            Ask Your Question
            <XButton onClick={handleClose}>X</XButton>
          </Title>
          <Subtitle>{'About the ' + productName}</Subtitle>
        </Header>
        {questionInput}
        {usernameInput}
        {emailInput}
        <FormButton
          handleClose={handleClose}
        />
      </PopupForm>
    </Modal>
  );
}

export default AddQuestionForm;

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
  font-size: 15px;
  background-color: white;
  width: auto;
  font-weight: light;
  padding: .25em .5em;
  border-radius: 3px;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;