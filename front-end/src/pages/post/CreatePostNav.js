import { useEffect } from 'react';
import './CreatePostNav.css';

const CreatePostNav = ({ setBody, body, textAreaRef }) => {
  const handleClickWithFocus = ({ target }) => {
    const { id } = target;
    let text = '';
    if (id === 'bold') {
      text = '****';
    }
    if (id === 'italics') {
      text = '____';
    }
    if (id === 'unordered-list') {
      text = '\n&#183;';
    }
    if (id === 'header') {
      text = '\n##';
    }
    setBody((currBody) => currBody + text);
    const textarea = document.querySelector('#post-textarea');
    const end = textarea.value.length;
    textarea.setSelectionRange(end - 2, end - 2);
    textarea.focus();
  };
  // useEffect(() => {
  //   const validFormats = ["**", "__"];
  //   if (validFormats.includes(body.slice(-2))) {

  //   }
  // }, [body]);
  return (
    <nav className="d-flex bg-light create-post-nav">
      <button
        className="btn btn-lg btn-light"
        onClick={handleClickWithFocus}
        id="bold"
      >
        B
      </button>
      <button
        className="btn btn-lg btn-light"
        onClick={handleClickWithFocus}
        id="italics"
      >
        <em>I</em>
      </button>
      {/* <button
        className="btn btn-lg btn-light"
        onClick={() => setBody((currBody) => currBody + '[](url)')}
      >
        <i className="fa-solid fa-link"></i>
      </button>
      <button
        className="btn btn-lg btn-light"
        onClick={() => setBody((currBody) => currBody + '\n1. ')}
      >
        <i className="fa-solid fa-list-ol"></i>
      </button> */}
      <button
        className="btn btn-lg btn-light"
        onClick={handleClickWithFocus}
        id="unordered-list"
      >
        <i className="fa-solid fa-list-ul"></i>
      </button>
      <button
        className="btn btn-lg btn-light"
        onClick={handleClickWithFocus}
        id="header"
      >
        H
      </button>
      {/* <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-code-simple"></i>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-display-code"></i>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-image"></i>
      </button> */}
      {/* <button className="btn btn-lg btn-light ms-auto">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button> */}
    </nav>
  );
};

export default CreatePostNav;
