import React, { useState } from 'react';
import styled from 'styled-components';

function Search({ setFilter }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length >= 3) {
      setFilter(e.target.value);
    } else {
      setFilter('');
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputIcons>
        <SearchInput
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          onChange={handleChange}
          value={searchTerm}
        />
        {/* <Icon icon={faMagnifyingGlass} /> */}
        <Icon src="public/icons/icons8-search-50.png" />
      </InputIcons>
    </Form>
  );
}

export default Search;

const Form = styled.form`
  margin: 10px 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  ::placeholder {
    color: #3d3c3c;
    font-weight: bold;
    margin-left: 10px;
  }
`;

const Icon = styled.img`
  padding: 15px;
  position: absolute;
  height: 3vh;
`;

const InputIcons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
