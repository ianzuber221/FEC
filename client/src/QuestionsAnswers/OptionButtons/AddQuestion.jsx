import React, { useState } from 'react';
import AddQuestionForm from './AddQuestionForm';

function AddQuestion({ renderQuestions, Button, productName }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="add-question-btn">
      <Button type="submit" onClick={() => setShowModal(true)} data-testid='add-question-btn'>
        ADD A QUESTION +
      </Button>
      <AddQuestionForm
        renderQuestions={renderQuestions}
        productName={productName}
        show={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default AddQuestion;
