import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  render() {
    return (this.props.reviews.length > 0) ? (
      <div>
        {this.props.reviews.map((review, index) => (
          <ReviewTile
            review={review}
            key={index}
            markHelpful={this.props.markHelpful}
            report={this.props.report}
          />
        ))}
      </div>
    ) : (
      <div>
        There are no reviews currently.
      </div>
    );
  }
}

export default ReviewList;
