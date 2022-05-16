const OffCanvasNavButton = () => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
    >
      <span className="navbar-toggler-icon d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-bars"></i>
      </span>
    </button>
  );
};

export default OffCanvasNavButton;
