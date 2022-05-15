/**
 *
 * @param {title of modal} title
 * @param {body text of modal} body
 * @param {desired function to pass on confirm} helperFunction
 */

const Modal = ({ title, body, helperFunction, btnConfirmText = 'Confirm' }) => {
  return (
    <div
      className="modal fade"
      id="modal"
      tabindex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={helperFunction}
            >
              {btnConfirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
