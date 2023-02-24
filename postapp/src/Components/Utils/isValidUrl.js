const isValidUrl = (url) => {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
};

export default isValidUrl;
