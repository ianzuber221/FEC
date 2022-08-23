import axios from 'axios';

export default function getImageUrl(file) {
  const postImageConfig = {
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/dl9zxpaoq/upload',
    data: {
      file,
      upload_preset: 'upload_preset_atelier',
    },
  };

  return axios(postImageConfig)
    .then((result) => result.data.url)
    .catch((err) => {
      console.log('error uploading images', err);
    });
}
