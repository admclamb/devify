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
      <Link to="/search" className="d-block d-md-none ms-auto btn">
        <i className="fa-thin fa-magnifying-glass fa-lg"></i>
      </Link>
    </>
  );
};

export default Searchbar;
