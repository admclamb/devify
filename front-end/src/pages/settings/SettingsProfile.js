import { useState } from 'react';
import { postAvatar } from '../../utils/api';

const SettingsProfile = ({ session, setSession }) => {
  const [file, setFile] = useState('');
  const { user_id } = session;
  const fileSelected = ({ target }) => {
    const file = target.files[0];
    setFile(file);
  };
  const postPfp = async () => {
    if (file) {
      const response = await postAvatar(file, user_id);
      const newSession = await response.json();
    }
  };
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
        <p className="mt-2 mb-1">Change profile image</p>
        <div className="profile-pic-change  mb-2 d-flex">
          <div className="profile-picture me-2"></div>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            className="form-control"
            onChange={fileSelected}
          />
        </div>
      </form>
      <div>
        <button
          type="submit"
          className="submit btn btn-primary w-100"
          onClick={postPfp}
        >
          Save Profile Information
        </button>
      </div>
    </div>
  );
};

export default SettingsProfile;
