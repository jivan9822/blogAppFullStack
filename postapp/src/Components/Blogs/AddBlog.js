import formCss from './AddBlog.module.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import isValidUrl from '../Utils/isValidUrl';

const AddBlog = (props) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const source = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = source.current.value;
    if (isValidUrl(url)) {
      axios
        .post('/blog', {
          data: { title, text, url },
        })
        .then((res) => {
          setSuccess(true);
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert('Invalid source Url!');
    }
  };
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const textLength = text.length;
  return (
    <div>
      {!props.hideForm && (
        <div>
          {success ? (
            <h1>Blog Submitted Success!</h1>
          ) : (
            <form className={formCss.factForm} onSubmit={handleSubmit}>
              <div className={formCss.formSubDiv}>
                <input
                  value={title}
                  type='text'
                  placeholder='Title...(max 20 char)'
                  maxLength={50}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span>{500 - textLength}</span>
                <textarea
                  type='text'
                  placeholder='Share a blog min 20 max 100 char...'
                  value={text}
                  maxLength={500}
                  onChange={(e) => setText(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Trustworthy source...'
                  ref={source}
                />
              </div>
              <div className={formCss.btnDiv}>
                <button
                  className={
                    textLength > 19 ? formCss.btn : formCss.btnDisabled
                  }
                  disabled={textLength > 19 ? false : true}
                >
                  Post
                </button>
                <button
                  onClick={() => {
                    props.setHideForm(true);
                    navigate('/');
                    window.location.reload();
                  }}
                  className={formCss.btn}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AddBlog;
