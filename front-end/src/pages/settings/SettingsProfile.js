const SettingsProfile = () => {
  return (
    <div className="settings-container border rounded p-3">
      <h4>User</h4>
      <form>
        <label htmlFor="first_name">First Name</label>
        <input id="first_name" type="text" className="form-control" />
        <label htmlFor="last_name">Last Name</label>
        <input id="last_name" type="text" className="form-control" />
        <label htmlFor="username">Last Name</label>
        <input id="username" type="text" className="form-control" />
        <p className="mt-2 m-2">Change profile image here</p>
      </form>
      <div>
        <button type="submit" className="submit btn btn-primary w-100">
          Save Profile Information
        </button>
      </div>
    </div>
  );
};

export default SettingsProfile;
