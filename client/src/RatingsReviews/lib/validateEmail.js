function validateEmail(string) {
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  if (regex.test(string)) {
    return true;
  }
  return false;
}

export default validateEmail;
