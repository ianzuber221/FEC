import axios from 'axios';

export function getProductInfo(productId) {
  const requestConfig = {
    method: 'GET',
    url: `${process.env.API_URL}/products/${productId}`,
    headers: {
      Authorization: process.env.AUTH_KEY,
    },
  };

  return axios(requestConfig)
    .catch((err) => {
      console.log('failed fetching product info.', err);
    });
}

export function getQuestions(productId, page = 1, count = 200) {
  const requestConfig = {
    method: 'GET',
    url: `${process.env.API_URL}/qa/questions`,
    params: {
      product_id: productId,
      count,
      page,
    },
    headers: {
      Authorization: process.env.AUTH_KEY,
    },
  };
  return axios(requestConfig)
    .catch((err) => {
      console.log('failed fetching all questions from API.', err);
    });
}

export function postQuestion(productId, { body, name, email }) {
  const requestConfig = {
    method: 'POST',
    url: `${process.env.API_URL}/qa/questions`,
    data: {
      body,
      name,
      email,
      product_id: Number(productId),
    },
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  };

  return axios(requestConfig)
    .catch((err) => {
      console.log('error posting question', err);
    });
}

export function getAnswers(questionId, page = 1, count = 200) {
  const requestConfig = {
    method: 'GET',
    url: `${process.env.API_URL}/qa/questions/${questionId}/answers`,
    params: {
      page,
      count,
    },
    headers: {
      Authorization: process.env.AUTH_KEY,
    },
  };
  return axios(requestConfig)
    .catch((err) => {
      console.log('failed to get answers', err);
    });
}

export function postAnswer(questionId, { body, name, email, photos }) {
  const requestConfig = {
    method: 'POST',
    url: `${process.env.API_URL}/qa/questions/${questionId}/answers`,
    data: {
      body,
      name,
      email,
      photos,
    },
    headers: {
      Authorization: process.env.AUTH_KEY,
    },
  };
  return axios(requestConfig)
    .catch((err) => {
      console.log('failed posting answer.', err);
    });
}

export function updateHelpful(type, id) {
  let path;
  if (type === 'question') path = 'qa/questions';
  if (type === 'answer') path = 'qa/answers';
  if (type === 'review') path = 'review';

  const requestConfig = {
    method: 'PUT',
    url: `${process.env.API_URL}/${path}/${id}/helpful`,
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  };

  return axios(requestConfig)
    .catch((err) => {
      console.log(`Failed PUT request for marking ${type} of id ${id} helpful.`, err);
    });
}

export function updateReport(type, id) {
  let path;
  if (type === 'question') path = 'qa/questions';
  if (type === 'answer') path = 'qa/answers';

  console.log(path);
  console.log(type);

  const requestConfig = {
    method: 'PUT',
    url: `${process.env.API_URL}/${path}/${id}/report`,
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  };

  return axios(requestConfig)
    .catch((err) => {
      console.log('failed reporting answer', err);
    });
}