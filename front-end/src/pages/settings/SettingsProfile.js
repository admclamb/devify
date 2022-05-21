import { useEffect, useState } from 'react';
import { postAvatar } from '../../utils/api';
import ErrorAlert from '../../errors/ErrorAlert';
const SettingsProfile = ({ session, setSession }) => {
  const {
    user_id = null,
    first_name,
    last_name,
    username,
    avatar = null,
  } = session;
  const [error, setError] = useState(null);
  const [file, setFile] = useState('');
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
  });
  useEffect(() => {
    setProfileForm({
      first_name,
      last_name,
    });
    setProfileUsername(username);
  }, [session]);
  const fileSelected = ({ target }) => {
    const file = target.files[0];
    setFile(file);
  };
  const postPfp = async () => {
    setError(null);
    try {
      if (!user_id) {
        setError({ message: 'No user_id found' });
        return;
      }
      if (file) {
        const response = await postAvatar(file, user_id);
        console.log(response);
      }
    } catch (error) {
      setError(error);
    }
  };
  const handleChange = ({ target }) => {
    const { id } = target;
    setProfileForm({
      ...profileForm,
      [id]: target.value,
    });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError(null);
    } catch (error) {
      setError(error);
    }
  };
  console.log(profileForm);
  console.log(first_name, last_name, username);
  return (
    <>
      <ErrorAlert error={error} />
      <div className="settings-container border rounded p-3">
        <h4>User</h4>
        <form>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            className="form-control mb-2"
            value={profileForm.first_name}
            onChange={handleChange}
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            className="form-control mb-2"
            value={profileForm.last_name}
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="form-control mb-2"
            value={profileForm.username}
            onChange={handleChange}
          />
        </form>
        <div className="">
          <button
            type="submit"
            className="submit btn btn-primary w-100"
            onClick={handleSubmit}
          >
            Save Profile Information
          </button>
        </div>
      </div>
      <div className="settings-container border rounded p-3 mt-3">
        <h4>Profile Picture</h4>
        <div className="profile-pic-change  mb-2 d-flex">
          <div className="comment-pfp me-0">
            {avatar ? <img src={avatar} width="100%" /> : ''}
          </div>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            className="form-control"
            onChange={fileSelected}
          />
        </div>
        <button
          type="submit"
          className="submit btn btn-primary w-100 mt-2"
          onClick={postPfp}
        >
          Update Profile Image
        </button>
      </div>
    </>
  );
};

export default SettingsProfile;
