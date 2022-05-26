import './FeedNav.css';

const FeedNav = ({ setQuery, query }) => {
  const handleClick = async ({ target }) => {
    const { id } = target;
    setQuery(id === 'relevant' ? { type: '' } : { type: id });
  };
  return (
    <nav className="feed-nav">
      <ul>
        <li
          onClick={handleClick}
          id="relevant"
          className={query.type === '' ? 'active' : ''}
        >
          Relevant
        </li>
        <li
          onClick={handleClick}
          id="latest"
          className={query.type === 'latest' ? 'active' : ''}
        >
          Latest
        </li>
        <li
          onClick={handleClick}
          id="top"
          className={query.type === 'top' ? 'active' : ''}
        >
          Top
        </li>
      </ul>
    </nav>
  );
};

export default FeedNav;
