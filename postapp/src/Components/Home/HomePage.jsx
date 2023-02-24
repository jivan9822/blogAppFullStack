import { Link, Outlet } from 'react-router-dom';
import { Fragment, useState } from 'react';
import homeCss from './homeCss.module.css';
import DisplayBlogs from './../Blogs/DisplayBlogs';
const HomePage = (props) => {
  const [isMain, setMain] = useState(true);

  return (
    <div className={homeCss.mainDiv}>
      <div className={homeCss.navDiv}>
        <Link onClick={() => setMain(true)} className={homeCss.heading} to='/'>
          Blogging App
        </Link>
        <div onClick={() => setMain(false)} className={homeCss.navLogin}>
          {props.userData ? (
            <div>
              <Link className={homeCss.link}>MyBlogs</Link>
              <Link
                onClick={() => {
                  props.setHideForm(false);
                }}
                className={homeCss.link}
                to='/addblog'
              >
                AddBLog
              </Link>
              <Link className={homeCss.link} to='/userdetails'>
                Welcome-{props.userData.username}
              </Link>
              <Link className={homeCss.link} to='/logout'>
                LogOut
              </Link>
            </div>
          ) : (
            <div>
              <Link className={homeCss.link} to='/login'>
                Login
              </Link>
              <Link className={homeCss.link} to='/signup'>
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
      {isMain && <DisplayBlogs blogs={props.blogs} user={props.userData} />}
      <Outlet />
    </div>
  );
};

export default HomePage;
