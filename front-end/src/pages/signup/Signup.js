import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import { signup } from '../../utils/api';
import './Signup.css';

const Signup = ({ setSession }) => {
  const initSignup = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  };
  const [signup, setSignup] = useState(initSignup);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    const { id } = target;
    if (id === 'passwordConfirm') setPasswordConfirm(target.value);
    setSignup({
      ...signup,
      [id]: target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const abortController = new AbortController();
    signup(signup, abortController.signal)
      .then((response) => {
        setSession(response);
        navigate('/');
      })
      .catch(setError);
  };
  return (
    <main className="row">
      <form
        id="signup-form"
        onSubmit={handleSubmit}
        className="col-12 col-sm-11 col-md-5 ms-auto me-auto border rounded signup-form"
      >
        <ErrorAlert error={error} />
        <h3 className="text-center">Welcome to DEV Clone</h3>
        <div className="row">
          <div className="input-control mb-3 col-12 col-lg-6">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              value={signup.first_name}
              onChange={handleChange}
              placeholder="first name"
            />
          </div>
          <div className="input-control mb-3 col-12 col-lg-6">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              value={signup.last_name}
              onChange={handleChange}
              placeholder="last name"
            />
          </div>
        </div>

        <div className="input-control mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={signup.username}
            onChange={handleChange}
            placeholder="username"
          />
        </div>
        <div className="input-control mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={signup.email}
            onChange={handleChange}
            placeholder="youremail@example.com"
          />
        </div>
        <div className="input-control mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={signup.password}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
        <div className="input-control mb-3">
          <label htmlFor="passwordConfirm" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            placeholder="confirm password"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1" disabled>
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary signup-submit"
          value="Submit"
          form="signup-form"
        >
          Continue
        </button>
      </form>
    </main>
  );
};

export default Signup;
