import axios from 'axios';

const getAllBlogs = (getBlogs) => {
  axios
    .get('/getblog')
    .then((res) => {
      getBlogs(res.data.data.blogs ? res.data.data.blogs : []);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getAllBlogs;
