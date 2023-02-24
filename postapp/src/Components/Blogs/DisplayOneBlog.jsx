import oneblog from './DisplayOneBlog.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayOneBlog = (props) => {
  const user = props.user;
  const [AddComment, setComment] = useState(false);
  const [comment, setUserComment] = useState('');
  const [displaYComments, setDisComments] = useState([]);
  const [blog, setBlog] = useState(null);
  useEffect(() => {
    axios
      .get('/getOneBlog', {
        params: {
          id: props.blog._id,
        },
      })
      .then((res) => {
        setDisComments(res.data.data.blog.comments.reverse());
        setBlog(res.data.data.blog ? res.data.data.blog : null);
        // blog =
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onBackHandler = (e) => {
    props.setDisplayOne((old) => !old);
    axios
      .post('/updateLikeDisLike', { displaYComments, blogId: blog._id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickLikeDisLike = (e) => {
    let name = e.target.getAttribute('name');
    let value = e.target.getAttribute('value');
    displaYComments.map((each) => {
      if (each._id == value) {
        each[name]++;
      }
    });
    setDisComments([...displaYComments]);
  };
  const onChangeHandler = (e) => {
    setUserComment(e.target.value);
  };
  const onSubmitHandler = (e) => {
    // displaYComments.push(comment);
    console.log(comment);
    e.preventDefault();
    axios
      .post('/comment', { comment, blogId: blog._id })
      .then((res) => {
        const newComment = res.data.data.comment;
        setDisComments((old) => [newComment, ...old]);
        setUserComment('');
      })
      .catch((err) => {
        if (err.response.status == 401) {
          alert('Your session expired');
          window.location.reload();
        }
      });
  };
  function handleBodyClick(event) {
    event.preventDefault();
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setUserComment('');
        setComment(false);
      }
    });
    setComment(false);
  }

  return (
    <div>
      {blog ? (
        <div className={oneblog.mainDiv}>
          <div onClick={handleBodyClick}>
            <p className={oneblog.backBtn} onClick={onBackHandler}>
              🏡goto
            </p>
            <h2>{blog.title}</h2>
            <p>{blog.text}</p>
            <p>
              <strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
              <strong>Published by:</strong> {blog.userName}
            </p>
            <p>
              <strong>Published date:</strong> {blog.publishAt}
            </p>
          </div>
          <div className={oneblog.commDiv}>
            <div className={oneblog.commDiv1}>
              <p className={oneblog.commentName}>
                {user.username[0].toUpperCase()}{' '}
              </p>
              <input
                className={oneblog.commentInput}
                onChange={onChangeHandler}
                onFocus={() => setComment(true)}
                onClick={() => setComment(true)}
                type='text'
                name='comment'
                value={comment}
                placeholder='Add a comment'
              />
            </div>
            {AddComment && (
              <div className={oneblog.commDiv2}>
                <p
                  onClick={() => {
                    setUserComment('');
                    setComment(false);
                  }}
                >
                  Cancel
                </p>
                <p onClick={onSubmitHandler}>Submit</p>
              </div>
            )}
          </div>
          <div className={oneblog.commentSec}>
            {displaYComments.map((each) => {
              return (
                <div key={each._id} className={oneblog.eachComm}>
                  <div className={oneblog.eachCommSub}>
                    <p className={oneblog.commentName2}>
                      {each.userName[0].toUpperCase()}
                    </p>
                    <h3>{each.comment}</h3>
                    <p>{each.time}</p>
                  </div>
                  <div className={oneblog.likeDislike}>
                    <p
                      name='like'
                      value={each._id}
                      onClick={onClickLikeDisLike}
                      className={oneblog.likeBtn}
                    >
                      👍 <span>{each.like}</span>
                    </p>

                    <p
                      name='disLike'
                      value={each._id}
                      onClick={onClickLikeDisLike}
                      className={oneblog.likeBtn}
                    >
                      👎 <span>{each.disLike}</span>
                    </p>
                    <p>Reply</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>Getting Data....</h1>
      )}
    </div>
  );
};
export default DisplayOneBlog;
