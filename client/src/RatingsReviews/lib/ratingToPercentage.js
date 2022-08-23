function ratingToPercentage(rating) {
  const percentage = (rating / 5) * 100;
  const rounded = `${(Math.round(percentage / 10) * 10)}%`;
  return rounded;
}

export default ratingToPercentage;
