import { Link } from 'react-router-dom';
import './Searchbar.css';

const Searchbar = ({ search, setSearch }) => {
  return (
    <>
      <div className="search-container d-none d-md-block">
        <Link to="/search">
          <i className="fa-thin fa-magnifying-glass search-container__icon fa-lg"></i>
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="searchbar search-container__input"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <Link
        to="/search"
        className="searchbar-small d-block d-md-none ms-auto btn"
      >
        <i className="fa-thin fa-magnifying-glass fa-lg"></i>
      </Link>
    </>
  );
};

export default Searchbar;
