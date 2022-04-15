import { SearchBar } from "../components";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar-brand">
          Devify
        </h1>
        <SearchBar />
        <div className="profile-container">
          <button className="btn btn-outline">
            Create Post
          </button>
          <i className="fa-thin fa-bell"></i>
          <div className="profile-picture">
            PFP
          </div>
        </div>
      <div>
    </nav>
  )
};

export default Navbar;