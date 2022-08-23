import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { parseISO, compareAsc } from 'date-fns';
import Ratings from './Ratings/Ratings';
import Reviews from './Reviews/Reviews';
import getTotalRatings from './lib/getTotalRatings';
import { useCurrentProductContext } from '../context';

const RatingsReviews = forwardRef((props, ref) => {
  const [meta, setMeta] = useState({});
  const [totalRatings, setTotalRatings] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredByRating, setFilteredByRating] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const [average, setAverage] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [sorted, setSorted] = useState(false);
  const [sortCount, setSortCount] = useState(0);

  const productId = useCurrentProductContext();

  const getReviews = () => {
    axios.get(`${process.env.API_URL}/reviews?product_id=${productId}&count=500`, {
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    })
      .then((response) => {
        // console.log('got reviews.')
        setReviews(response.data.results);
      })
      .then(() => {
        if (sorted) {
          sort(sortOption);
        }
      })
      .catch((err) => console.log('error fetching reviews', err));
  };

  const getRatings = () => {
    axios.get(`${process.env.API_URL}/reviews/meta?product_id=${productId}`, {
      headers: {
        Authorization: process.env.AUTH_KEY,
      },
    })
      .then((response) => {
        // console.log('got ratings.')
        const sum = getTotalRatings(response.data.ratings)[0];
        const totalRatings = getTotalRatings(response.data.ratings)[1];
        setMeta(response.data);
        setAverage((sum / totalRatings).toFixed(1));
        setRatings(response.data.ratings);
        setTotalRatings(totalRatings);
        setIsLoaded(true);
      })
      .catch((err) => console.log('error fetching ratings', err));
  };

  // useEffect(() => {
  //   getReviews();
  //   getRatings();
  // }, []);

  useEffect(() => {
    getRatings();
    getReviews();
  }, [productId]);

  const setRatingsFilter = (rating) => {
    const index = ratingFilter.indexOf(rating);
    if (index === -1) {
      setRatingFilter((a) => [...a, rating]);
    } else {
      const temp = ratingFilter;
      temp.splice(index, 1);
      setRatingFilter(() => [...temp]);
    }
  };

  const getByRating = () => {
    // set temp as current list of reviews,
    // filter temp to fit ratings filter,
    // set state reviews to be temp.
    const temp = reviews;
    const arr = ratingFilter;
    const filteredReviews = temp.filter((review) => {
      // if review.rating is found in array, return that review.
      const index = arr.indexOf(`${review.rating}`);
      if (index !== -1) {
        return review;
      }
    });
    setFiltered(filteredReviews);
  };

  useEffect(() => {
    if (ratingFilter.length > 0) { // once ratingfilter updates, is longer than 0
      getByRating();
      setFilteredByRating(true);
    } else if (isLoaded) { // if its not longer than 0, empty array, just get regular reviews.
      getReviews();
      setFilteredByRating(false);
      setFiltered([]);
    }
  }, [ratingFilter]);

  const sort = (sortMethod) => {
    // setSorted(false);
    const temp = reviews;
    let list = document.getElementById('reviewlist1');
    list.scrollTo(0, 0);
    setPage(1);
    if (sortMethod === 'helpful') {
      temp.sort((a, b) => b.helpfulness - a.helpfulness);
      setSortedReviews(() => temp);
      setSortOption(sortMethod);
      setSortCount(sortCount + 1); // trigger effect
      setSorted(true);
    }
    if (sortMethod === 'newest') {
      temp.sort((a, b) => compareAsc(parseISO(b.date), parseISO(a.date)));
      setSortedReviews(() => temp);
      setSortOption(sortMethod);
      setSortCount(sortCount + 1); // trigger effect
      setSorted(true);
    }
    if (sortMethod === 'relevance') { // relevance, just reset sort and get og reviews
      setSorted(false);
      setSortedReviews([]);
      getReviews();
    }
  };

  useEffect(() => {
    // listen to sortoption, if sortoption changes, reset page to 1.
    setPage(1);
  }, [sortOption]);

  useEffect(() => {
    if (sorted) {
      setReviews[sortedReviews];
    }
  }, [sortCount]);

  const moreReviews = () => {
    setPage(page + 1);
  };

  const scrollMore = () => { // only works when its not filtered by rating.
    // if (!filteredByRating) {
    setPage(page + 1);
    // }
  };

  const onFormSubmit = () => {
    let list = document.getElementById('reviewlist1');
    list.scrollTo(0, 0);
    setPage(1);
    sort('newest');
    setSorted(true);
    setReviews(sortedReviews);
  };

  return (
    <StyledMain id="ratings-reviews" className="main-widget-container" ref={ref}>
      <StyledTitle id="inner-title">
        <div className="main-widget-title">
          RATINGS & REVIEWS
        </div>
      </StyledTitle>
      <StyledInner id="inner-main">
        <Ratings
          meta={meta}
          isLoaded={isLoaded}
          average={average}
          totalRatings={totalRatings}
          setRatingFilter={setRatingsFilter} // diff name from hook
          setSortOption={setSortOption}
          ratingFilter={ratingFilter}
        />
        {(filteredByRating) && (
          <Reviews
            productId={productId}
            totalRatings={totalRatings}
            reviews={filtered}
            moreReviews={moreReviews}
            setSort={sort}
            getReviews={getReviews}
            scrollMore={scrollMore}
            page={page}
            isLoaded={isLoaded}
            setPage={onFormSubmit}
          />
        )}
        {(!filteredByRating) && (
          <Reviews
            productId={productId}
            totalRatings={totalRatings}
            reviews={reviews}
            moreReviews={moreReviews}
            setSort={sort}
            getReviews={getReviews}
            scrollMore={scrollMore}
            page={page}
            isLoaded={isLoaded}
            setPage={onFormSubmit}
          />
        )}
      </StyledInner>
    </StyledMain>
  );
});

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  min-width: 500px;
  color: #1c1c1c;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  border-bottom: .5px solid black;
`;
const StyledInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  width: 100%;
  padding-top: 1%;
  height: 100%
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 1%;

`;

export default RatingsReviews;
