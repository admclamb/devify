import { Link } from 'react-router-dom';

const SignedInNav = ({ openModal, setOpenModal, modal }) => {
  return (
    <div className="navbar__profile-container">
      <Link
        to={`${user_id}/create`}
        className="btn btn-outline-primary d-none d-md-block"
      >
        Create Post
      </Link>
      <i className="fa-thin fa-bell fa-lg"></i>
      <div
        className="profile-picture"
        id="modal-toggle-btn"
        onClick={() => setOpenModal((prev) => !prev)}
      ></div>
      {openModal ? modal : ''}
    </div>
  );
};
import SignedInNav from './NotSignedInNav';
