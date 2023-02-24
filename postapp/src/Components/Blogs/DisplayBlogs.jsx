import display from './DisplayBlog.module.css';
import { useState } from 'react';
import DisplayOneBlog from './DisplayOneBlog';

const DisplayBlogs = (props) => {
  const [displayOne, setDisplayOne] = useState(false);
  const [blog, setBlog] = useState(null);
  return (
    <div>
      {!displayOne ? (
        <div className={display.mainGrid}>
          {props.blogs.map((each) => {
            return (
              <div key={each._id} className={display.gridItem}>
                <h2 className={display.blogTitle}>{each.title}</h2>
                <p className={display.blogText}>
                  {each.text.substring(0, 100)}{' '}
                  <span
                    onClick={() => {
                      setBlog(each);
                      setDisplayOne(!displayOne);
                    }}
                    className={display.readMore}
                  >
                    ...read more
                  </span>{' '}
                </p>
                <p className={display.userName}>
                  {each.userName}
                  <span>---{each.publishAt}</span>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <DisplayOneBlog
          blog={blog}
          setDisplayOne={setDisplayOne}
          user={props.user}
        />
      )}
    </div>
  );
};

export default DisplayBlogs;
