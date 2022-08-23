/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewList from './ReviewList';
import AddBar from './AddBar';
import SortBar from './SortBar';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      markedHelpful: [],
    };
    this.addReview = this.addReview.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.report = this.report.bind(this);
    this.refresh = this.refresh.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
    this.scrollMore = this.scrollMore.bind(this);
  }

  addReview(reviewBody) {
    return axios.post(`${process.env.API_URL}/reviews`, reviewBody, {
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    })
      .then((response) => {
        console.log('success adding review', response);
        alert('thank you for your submission');
        this.props.getReviews();
      })
      .catch((err) => console.log('error adding review', err));
  }

  refresh() {
    window.location.reload();
  }

  moreReviews() {
    let { page } = this.state;
    page++;
    this.setState({ page });
  }

  scrollMore() { // only works when its not filtered by rating.
    if (!this.state.filteredByRating && page > 1) {
      let { page } = this.state;
      page += 1;
      this.setState({ page });
    }
  }

  report(reviewId) {
    axios.put(`${process.env.API_URL}/reviews/${reviewId}/report`, { review_id: reviewId }, {
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    })
      .then(() => {
        this.setState({ reviewed: true });
        console.log('success reporting review');
        this.props.getReviews();
      })
      .catch((err) => console.log('error reporting review', err));
  }

  markHelpful(reviewId) {
    if (true) {
    //if (this.state.markedHelpful.indexOf(reviewId) === -1) {
      axios.put(`${process.env.API_URL}/reviews/${reviewId}/helpful`, { review_id: reviewId }, {
        headers: {
          Authorization: process.env.AUTH_KEY,
        },
      })
        .then(() => {
          const { markedHelpful } = this.state;
          markedHelpful.push(reviewId);
          this.setState({ markedHelpful });
          this.props.getReviews();
        })
        .catch((err) => console.log('error marking helpful', err));
    } else {
      alert('you have already marked this review as helpful');
    }
  }

  render() {
    return (
      <ReviewsContainer data-testid="reviews-1">
        <SortBar
          reviews={this.props.reviews}
          setSort={this.props.setSort}
          totalRatings={this.props.totalRatings}
          page={this.props.page}
        />
        <ReviewList
          reviews={this.props.reviews}
          markHelpful={this.markHelpful}
          report={this.report}
          scrollMore={this.props.scrollMore}
          page={this.props.page}
          isLoaded={this.props.isLoaded}
        />
        <AddBar
          reviews={this.props.reviews}
          addReview={this.addReview}
          moreReviews={this.props.moreReviews}
          productId={this.props.productId}
          setPage={this.props.setPage}
        />
      </ReviewsContainer>
    );
  }
}

const reviewBody = { // sample review data with image, and seller response
  review_id: 1275524,
  helpfulness: 20,
  date: '2022-07-17T00:00:00.000Z',
  rating: 5,
  summary: 'sample summary here',
  body: 'sample body. lots of text go here. at leeast 60 characters',
  recommend: true,
  reviewer_name: 'iu',
  photos: [{ id: 1, url: 'https://res.cloudinary.com/joehan/image/upload/v1658093409/c07wxsxe4wiu5ionvqtv.png' }],
  response: 'Thank you for your review! we are please to hear that you enjoyed the item.',
};

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
  min-width: 350px;
  padding: 1%;
  margin-left: 5%;
  height: 90%;
`;

export default Reviews;
