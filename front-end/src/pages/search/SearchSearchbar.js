const SearchSearchBar = ({ search }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={search}
    />
  );
};

export default SearchSearchBar;
