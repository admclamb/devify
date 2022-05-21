import { useEffect, useState } from 'react';
import { postAvatar, updateUserProfile } from '../../utils/api';
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
  const [id, setId] = useState(user_id);
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
  });
  useEffect(() => {
    setProfileForm({
      first_name,
      last_name,
      username,
    });
    setId(user_id);
  }, [session]);
  const fileSelected = ({ target }) => {
    const file = target.files[0];
    setFile(file);
  };
  const postPfp = async () => {
    setError(null);
    try {
      if (!id) {
        setError({ message: 'No user_id found' });
        return;
      }
      if (file) {
        const response = await postAvatar(file, id);
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
      const abortController = new AbortController();
      event.preventDefault();
      setError(null);
      console.log('sending: ', profileForm);
      const response = await updateUserProfile(
        profileForm,
        id,
        abortController.signal
      );
      console.log(response);
      console.log(profileForm);
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
