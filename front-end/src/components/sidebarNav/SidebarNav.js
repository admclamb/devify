import "./SidebarNav.css";

const SidebarNav = () => {
  return (
    <ul className="sidebar-nav">
      <li>
        <i className="fa-duotone fa-house me-1"></i> Home
      </li>
      <li>
        <i className="fa-duotone fa-book me-1"></i>Reading
      </li>
      <li>
        <i className="fa-duotone fa-address-card me-1"></i> About
      </li>
      <li>
        <i className="fa-duotone fa-lightbulb me-1"></i> FAQ
      </li>
      <li>
        <i className="fa-duotone fa-phone me-1"></i> Contact
      </li>
    </ul>
  );
};

export default SidebarNav;
