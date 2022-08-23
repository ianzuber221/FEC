function priceFormat(string) {
  const arr = string.split('.');
  return `$${arr[0]}`;
}

export default priceFormat;
