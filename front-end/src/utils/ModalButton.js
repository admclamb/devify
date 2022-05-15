/**
 *
 * @param {text for button} text
 *
 * this is used in conjuction with Modal.js
 */

const ModalButton = ({ text, btnClasses = 'btn primary' }) => {
  return (
    <button
      type="button"
      className={btnClasses}
      data-bs-toggle="modal"
      data-bs-target="#modal"
    >
      {text}
    </button>
  );
};

export default ModalButton;
