import React from 'react';
import styled from 'styled-components';

function FormInput({ attribute, changeHandler }) {
  return (
    <Label>
      <div style={{ 'fontWeight': 'bold' }}>
        {attribute.label}
        {attribute.required && <sup>*</sup>}
      </div>
      {attribute.type === 'textarea'
      && (
        <Textarea
          {...attribute}
        />
      )}
      {attribute.type !== 'textarea'
      && (
        <Input
          {...attribute}
        />
      )}
    </Label>
  );
}

export default FormInput;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  font-weigt: bold;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
`;

const Input = styled.input`
  width: 50%;
  margin: 5px 0;
`;
