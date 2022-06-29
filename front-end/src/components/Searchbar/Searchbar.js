import { Link } from 'react-router-dom';
import './Searchbar.css';

const Searchbar = ({ searchBar, setSearchBar, onSearchSubmit }) => {
  return (
    <>
      <form className="search-container d-none d-md-block">
        <button onClick={onSearchSubmit} className="search-container__btn">
          <i className="fa-thin fa-magnifying-glass search-container__icon fa-lg"></i>
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="searchbar search-container__input"
          value={searchBar}
          onChange={({ target }) => setSearchBar(target.value)}
        />
      </form>
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
