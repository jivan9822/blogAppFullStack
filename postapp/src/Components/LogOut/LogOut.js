import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserLogOut = (props) => {
  const navigate = useNavigate();
  // setTimeout(() => {
  //   window.location.reload();
  // }, 10);
  axios
    .get('/logout')
    .then((res) => {
      console.log(res);
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
  //   window.location.reload();
};
export default UserLogOut;
