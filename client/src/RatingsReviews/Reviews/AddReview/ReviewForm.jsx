import React, { useState } from 'react';
import styled from 'styled-components';
import CharButtons from './CharButtons';
import StarRatingBar from './StarRatingBar';
import PhotoForm from './PhotoForm';
import validateEmail from '../../lib/validateEmail';
import axios from 'axios';

function ReviewForm({
  productId, addReview, toggleForm, setPage,
}) {
  const [rating, setRating] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [characteristics, setCharacteristics] = useState({});
  const [showPhotoform, setShowPhotoform] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [photosArray, addToArray] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const setChar = (char, rating) => {
    const temp = characteristics;
    temp[char] = parseInt(rating);
    setCharacteristics(temp);
  };

  const closeForm = () => {
    toggleForm();
  };

  const onAddReview = (e) => {
    e.preventDefault();
    const reviewBody = {
      product_id: parseInt(productId),
      rating: parseInt(rating),
      summary,
      body,
      name,
      email,
      recommend,
      characteristics,
      photos: photoUrls,
    };
    if (!reviewBody.rating) {
      alert('please enter rating');
    } else if (reviewBody.body.length < 5) {
      alert('body must be at least 20 characters');
    } else if (!reviewBody.email) {
      alert('please enter email');
    } else if (!validateEmail(reviewBody.email)) {
      alert('Please enter a valid email');
      const x = document.getElementById('review-email');
      x.focus();
    } else if (!reviewBody.characteristics) {
      alert('please enter characteristics');
    } else if (!reviewBody.name) {
      alert('please enter nickname');
    } else {
      setPage(1);
      addReview(reviewBody);
      toggleForm();
    }
  };

  const handleChange = (e) => {
    // e.preventDefault();
    const { name } = e.target;
    const val = e.target.value;
    if (name === 'rating') setRating(val);
    if (name === 'summary') setSummary(val);
    if (name === 'body') setBody(val);
    if (name === 'name') setName(val);
    if (name === 'email') setEmail(val);
  };

  const toggleRecommend = (e) => {
    e.preventDefault();
    !recommend
      ? setRecommend(true)
      : setRecommend(false);
  };

  const togglePhotoForm = () => {
    !showPhotoform
      ? setShowPhotoform(true)
      : setShowPhotoform(false);
  };

  const addPhoto = (photo) => {
    if (photoUrls.length >= 5) {
      alert('you have reached the maximum number of photos');
    } else {
      const temp = [...photos, photo];
      setPhotos(temp);
    }
  };

  const addUrl = (url) => {
    const index = photoUrls.indexOf(url);
    if (index === -1) {
      if (photoUrls.length >= 5) {
        alert('you have reached the maximum number of photos');
      } else {
        const tempUrls = [...photoUrls, url];
        setPhotoUrls(tempUrls);
      }
    } else {
      const temp = photoUrls;
      temp.splice(index, 1);
      setPhotoUrls(temp);
    }
  };

  const handleBgClick = (e) => {
    if (e.target.id === 'addreview-bg') {
      toggleForm();
    }
  };

  return (
    <StyledForm onClick={handleBgClick} id="addreview-bg" data-testid="addreviewform">
      <StyledInner id="addreview-inner">
        <InnerTop>
          <div>Write a Review.</div>
          <StyledClose onClick={closeForm}>X</StyledClose>
        </InnerTop>
        <StyledCat>
          <div>
            Your Rating
            <sup>*</sup>
            <StarRatingBar setRating={setRating} />
          </div>
        </StyledCat>
        <StyledCat>
          <div>
            Review Headline
            <sup>*</sup>
          </div>
          <StyledTextArea data-testid="summary-input" placeholder="Example: Best purchase ever!" name="summary" onChange={handleChange} />
        </StyledCat>
        <StyledCat>
          <div>
            Comments
            <sup>*</sup>
          </div>
          <StyledTextArea data-testid="body-input" placeholder="Example: why did you like the product or not?" name="body" onChange={handleChange} />
        </StyledCat>
        <StyledCat>
          <div>
            Recommend
            <sup>*</sup>
          </div>
          <div>
            <StyledButton onClick={toggleRecommend}>YES</StyledButton>
            {(recommend) && (<small><em>thanks for your recommendation !</em></small>)}
          </div>

        </StyledCat>
        <StyledCat>
          Fit:
          <CharButtons char="125031" setChar={setChar} />
          Length:
          <CharButtons char="125032" setChar={setChar} />
          Comfort:
          <CharButtons char="125033" setChar={setChar} />
          Quality:
          <CharButtons char="125034" setChar={setChar} />
        </StyledCat>
        <StyledCat>
          <div>Nickname</div>
          <StyledInput data-testid="name-input" placeholder="Example: snoibly123" name="name" onChange={handleChange} />
        </StyledCat>
        <p><em>For privacy reasons, do not use your full name or email address</em></p>
        <StyledCat>
          <div>Email*</div>
          <StyledInput data-testid="email-input" id="review-email" placeholder="Example: snoibly@snois.com" name="email" onChange={handleChange} />
        </StyledCat>
        <p><em>For authentication reasons, you will not be emailed.</em></p>
        <StyledCat>
          <div>Photos</div>
          {(!showPhotoform) && <StyledButton id="uploadphoto" onClick={togglePhotoForm}>upload</StyledButton>}
          {showPhotoform
            && (
            <PhotoForm
              photos={photos}
              addPhoto={addPhoto}
              addUrl={addUrl}
              setPhotoUrls={setPhotoUrls}
              photosArray={photosArray}
              addToArray={addToArray}
            />
            )}
        </StyledCat>
        <InnerBot>
          <StyledButton data-testid="submit-button" onClick={onAddReview}>SUBMIT</StyledButton>
          <StyledButton onClick={closeForm}>BACK</StyledButton>
        </InnerBot>

      </StyledInner>
    </StyledForm>
  );
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const StyledInner = styled.div`
  display: flex;
  z-index: 200;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  width: 400px;
  height: 80%;
  padding: 1.5%;
  overflow-y: auto;
  background: white;
  border: 1px solid black;
  font-size:small;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
`;

const InnerTop = styled.div`
  display: flex;
  z-index: 200;
  flex-direction: row;
  justify-content: space-between;
  font-size: large;
  font-weight: bold;
  width: 100% ;
  border-bottom: .5px solid black;
  padding-bottom: 1%;
  margin-bottom: 2%;
`;

const StyledCat = styled.div`
  font-weight: bold;
  z-index: 200;
  font-size: small;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin-top: 1%;
  width: 100%;
`;
const InnerBot = styled.div`
  z-index: 200;
  font-weight: bold;
  font-size: regular;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  margin-top: 4%;
  width: 95%;
  padding: 2%;
  border-top: .5px solid black;
`;

const StyledInput = styled.input`
  width: 200px;
  z-index: 200;
`;

const StyledTextArea = styled.textarea`
  width: 390px;
  height: 60px;
  resize: none;
  font-family: inherit;
  z-index: 200;
`;
const StyledClose = styled.button`
  color: #1c1c1c;
  z-index: 200;
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
const StyledButton = styled.button`
  width: auto;
  z-index: 200;
  max-width: 100px;
  font-size: small;
  margin: 1%;
  margin-right: 3%;
  padding: 0.25em 1em;
  border-radius: 3px;
  background: white;
  color: black;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
    opacity: 60%;
  }
`;

export default ReviewForm;
