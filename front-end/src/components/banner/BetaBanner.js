const BetaBanner = () => {
  return (
    <div
      className=" text-center alert mb-0 alert-primary alert-dismissible fade show"
      role="alert"
    >
      <strong>This is the beta version!</strong> This is for testing and is
      incomplete and could have bugs 🐛🐜
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default BetaBanner;
