import Searchbar from "../Searchbar/Searchbar";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-lg ">
        <h1 className="navbar__logo text-size-p">Devify</h1>
        <Searchbar />
        <div className="navbar__profile-container">
          <button className="btn btn-outline-primary">Create Post</button>
          <i className="fa-thin fa-bell fa-lg"></i>
          <div className="profile-picture"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
