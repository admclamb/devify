import './SearchSearchbar.css';

const SearchSearchBar = ({ search, setSearch }) => {
  return (
    <form className="search-container">
      <input
        type="text"
        className="form-control search-container"
        placeholder="Search..."
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <button className="btn search-button">
        <i className="fa-thin fa-magnifying-glass search-container__icon--search fa-lg"></i>
      </button>
    </form>
  );
};

export default SearchSearchBar;
