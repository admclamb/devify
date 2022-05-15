const SettingsCustomization = ({ darkMode, setDarkMode }) => {
  const handleChange = () => {
    setDarkMode((currMode) => !currMode);
  };
  return (
    <div className="settings-container border rounded p-3">
      <h4>Appearance</h4>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios1"
          value="lightMode"
          checked={!darkMode}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="exampleRadios1">
          Light Mode
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios2"
          value="darkMode"
          checked={darkMode}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="exampleRadios2">
          Dark Mode
        </label>
      </div>
    </div>
  );
};

export default SettingsCustomization;
