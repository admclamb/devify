import { Link } from 'react-router-dom';

const SignedInNav = ({ openModal, setOpenModal, modal, user_id, avatar }) => {
  return (
    <div className="navbar__profile-container ms-md-auto">
      <Link
        to={`${user_id}/create`}
        className="btn btn-outline-primary d-none d-md-block me-3"
      >
        Create Post
      </Link>
      {/* <i className="fa-thin fa-bell fa-lg"></i> */}
      <div>
        <img
          src={avatar ? avatar : ''}
          width="100%"
          className="ms-auto ms-md-0 profile-picture pfp-img"
          id="modal-toggle-btn"
          onClick={() => setOpenModal((prev) => !prev)}
        />
      </div>
      {openModal ? modal : ''}
    </div>
  );
};
export default SignedInNav;
