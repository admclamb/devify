import './CreatePostNav.css';

const CreatePostNav = ({ setBody }) => {
  return (
    <nav className="d-flex bg-light create-post-nav">
      <button
        className="btn btn-lg btn-light"
        onClick={() => setBody((currBody) => currBody + '****')}
      >
        B
      </button>
      <button
        className="btn btn-lg btn-light"
        onClick={() => setBody((currBody) => currBody + '__')}
      >
        <em>I</em>
      </button>
      <button
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
      </button>
      <button
        className="btn btn-lg btn-light"
        onClick={() => setBody((currBody) => currBody + '\n- ')}
      >
        <i className="fa-solid fa-list-ul"></i>
      </button>
      <button
        className="btn btn-lg btn-light"
        onClick={() => setBody((currBody) => currBody + '\n## ')}
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
      <button className="btn btn-lg btn-light ms-auto">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
    </nav>
  );
};

export default CreatePostNav;
