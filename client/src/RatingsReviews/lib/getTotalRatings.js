function getTotalRatings(r) {
  let sum = 0;
  let totalRatings = 0;
  // const r = response.data.ratings;
  for (const key in r) {
    totalRatings += parseInt(r[key]);
    sum += parseInt(key) * parseInt(r[key]);
  }
  return [sum, totalRatings]; //returns a sum and totalRatings couple
}

export default getTotalRatings;
