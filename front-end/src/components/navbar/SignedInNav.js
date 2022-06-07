import { Link } from 'react-router-dom';
import defaultPFP from '../../assets/defaultPFP.png';
import './SignedInNav.css';
const SignedInNav = ({
  openModal,
  setOpenModal,
  modal,
  user_id,
  avatar,
  notifications,
}) => {
  const newNotifications =
    Array.isArray(notifications) &&
    notifications.filter((notification) => notification.new);
  console.log(newNotifications) || [];
  const ding = <div className="ding">{newNotifications.length}</div>;
  const notificationsBell = (
    <Link
      to={'/notifications'}
      className="navbar-notification-button rounded ms-1 me-1"
    >
      <i className="fa-thin fa-bell fa-lg"></i>
      {newNotifications.length > 0 ? { ding } : ''}
    </Link>
  );
  return (
    <div className="navbar__profile-container ms-md-auto">
      <Link
        to={`${user_id}/create`}
        className="btn btn-outline-primary d-none d-md-block"
      >
        Create Post
      </Link>
      {notificationsBell}
      <div>
        <img
          src={avatar ? avatar : defaultPFP}
          width="100%"
          className=" profile-picture pfp-img"
          id="modal-toggle-btn"
          onClick={() => setOpenModal((prev) => !prev)}
        />
      </div>
      {openModal ? modal : ''}
    </div>
  );
};
export default SignedInNav;
