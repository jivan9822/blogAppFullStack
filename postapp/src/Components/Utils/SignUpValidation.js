exports.validate = (name, value) => {
  if (name === 'username') {
    return value.length > 3;
  }
  if (name === 'email') {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  }
  if (name === 'password') {
    return value.length > 4 && value.length < 16;
  }
  return false;
};
