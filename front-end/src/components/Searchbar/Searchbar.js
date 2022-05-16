import { Link } from 'react-router-dom';
import './Searchbar.css';

const Searchbar = () => {
  return (
    <>
      <div className="search-container d-none d-md-block">
        <i className="fa-thin fa-magnifying-glass search-container__icon fa-lg"></i>
        <input
          type="text"
          placeholder="Search..."
          className="searchbar search-container__input"
        />
      </div>
      <div className="search-button border d-block d-md-none">
        <Link to="/search bg-danger bg-danger">
          <i className="fa-thin fa-magnifying-glass fa-lg"></i>
        </Link>
      </div>
    </>
  );
};

export default Searchbar;
