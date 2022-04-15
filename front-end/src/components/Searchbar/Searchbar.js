import "./Searchbar.css";

const Searchbar = () => {
  return (
    <>
      <div className="search-container">
        <i className="fa-thin fa-magnifying-glass search-container__icon fa-lg"></i>
        <input
          type="text"
          placeholder="Search..."
          className="searchbar search-container__input"
        />
      </div>
    </>
  );
};

export default Searchbar;
