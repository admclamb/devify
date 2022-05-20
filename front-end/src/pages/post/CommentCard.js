import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import OutsideAlerter from '../../hooks/OutsideAlerter';
import { formatAsMonthDay } from '../../utils/formatDate';
import Modal from '../../utils/Modal';
import ModalButton from '../../utils/ModalButton';
import { UserContext } from '../../utils/UserContext';
import './CommentCard.css';
const CommentCard = ({ comment_data, deleteComment }) => {
  console.log(comment_data);
  const session = useContext(UserContext);
  const { user_id } = session;
  const {
    comment,
    first_name,
    last_name,
    user_id: commentUser_id,
    created_at,
    comment_id,
    avatar = null,
  } = comment_data;
  const [openModal, setOpenModal] = useState(false);
  const handleEllipse = () => {
    setOpenModal((currState) => !currState);
  };
  console.log(comment_id);
  const commentModal = (
    <OutsideAlerter setState={setOpenModal}>
      <div className="comment-modal border rounded">
        <ul>
          <li>
            <button
              className="btn"
              onClick={() => setOpenModal((prevState) => !prevState)}
            >
              Report Abuse
            </button>
          </li>
          {user_id === commentUser_id && (
            <ModalButton text={'Delete Comment'} btnClasses={'btn'} />
          )}
        </ul>
        <Modal
          title="Delete this comment?"
          body="This cannot be undone."
          helperFunction={() => deleteComment(comment_id)}
        />
      </div>
    </OutsideAlerter>
  );

  return (
    <article className="comment-card">
      <aside>
        <Link to={`/`} className="comment-pfp">
          <img src={avatar ? avatar : 'A'} width="100%" />
        </Link>
      </aside>

      <main className="comment-card__main">
        <div className="comment-card-main border p-3 rounded">
          <header className="comment-header">
            <p className="text-sm">{`${first_name} ${last_name}`}</p>
            <p className="ms-4 text-sm">{formatAsMonthDay(created_at)}</p>
            <button
              id="modal-toggle-btn"
              className="btn ms-auto comment-ellipse"
              onClick={handleEllipse}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </button>
            {openModal && commentModal}
          </header>
          <article>
            <p>{comment}</p>
          </article>
        </div>
        <div className="buttons">
          <button className="btn me-2 comment-button">
            <i className="fa-solid fa-heart me-2"></i>0 Likes
          </button>
          <button className="btn comment-button">
            <i className="fa-solid fa-comment me-2"></i>
            Reply
          </button>
        </div>
      </main>
    </article>
  );
};

export default CommentCard;
