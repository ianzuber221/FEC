const fileValidation = async (uploadedFile, cbSuccess, cbError) => {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      cbSuccess(img);
    };
    img.onerror = () => {
      cbError();
    };
    img.src = event.target.result;
  };

  reader.onerror = () => {
    cbError();
  };

  reader.readAsDataURL(uploadedFile);
};

export default fileValidation;
