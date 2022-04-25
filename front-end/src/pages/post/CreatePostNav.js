const CreatePostNav = () => {
  return (
    <nav className="d-flex">
      <button className="btn btn-lg btn-light">B</button>
      <button className="btn btn-lg btn-light">
        <em>I</em>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-link"></i>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-list-ol"></i>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-list-ul"></i>
      </button>
      <button className="btn btn-lg btn-light">H</button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-quote-left"></i>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-code-simple"></i>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-display-code"></i>
      </button>
      <button className="btn btn-lg btn-light">
        <i className="fa-solid fa-image"></i>
      </button>
      <button className="btn btn-lg btn-light ms-auto">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
    </nav>
  );
};

export default CreatePostNav;
