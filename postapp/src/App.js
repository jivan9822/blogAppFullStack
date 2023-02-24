import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/Home/HomePage';
import { useState, useEffect } from 'react';
import LoginPage from './Components/LoginPage/Login';
import SignupPage from './Components/SignUpPage/SignUp';
import isValidUser from './Components/Utils/isValidUser';
import UserLogOut from './Components/LogOut/LogOut';
import AddBlog from './Components/Blogs/AddBlog';
import getAllBlogs from './Components/Utils/getAllBlogs';

function App() {
  const [userData, getUserData] = useState(null);
  const [hideForm, setHideForm] = useState(false);
  const [blogs, getBlogs] = useState([]);
  useEffect(() => {
    isValidUser(getUserData);
    getAllBlogs(getBlogs);
  }, []);
  console.log(blogs);
  return (
    <Routes>
      <Route
        path='/'
        element={
          <HomePage
            userData={userData}
            setHideForm={setHideForm}
            blogs={blogs}
          />
        }
      >
        <Route path='login' element={<LoginPage getUserData={getUserData} />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='logout' element={<UserLogOut />} />
        <Route
          path='addblog'
          element={<AddBlog hideForm={hideForm} setHideForm={setHideForm} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
