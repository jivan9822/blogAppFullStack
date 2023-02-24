import axios from 'axios';

const isValidUser = (getUserData) => {
  axios
    .get('/isValid')
    .then((res) => {
      getUserData(res.data.data.user ? res.data.data.user : null);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default isValidUser;
