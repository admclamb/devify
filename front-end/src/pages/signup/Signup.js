import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import { signupUser } from '../../utils/api';
import './Signup.css';

const Signup = ({ setSession, session }) => {
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
  const [signupBtnText, setSignupBtnText] = useState('Continue');
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    const { id } = target;
    setSignup({
      ...signup,
      [id]: target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSession({});
    setSignupBtnText('Loading...');
    console.log('here');
    console.log(signup.password, passwordConfirm);
    if (signup.password === passwordConfirm) {
      const abortController = new AbortController();
      console.log('here sending request');
      signupUser(signup, abortController.signal)
        .then(setSession)
        .catch(setError);
      setSignupBtnText('Continue');
      if (Object.keys(session) > 0 && !error) {
        navigate('/');
      }
    } else {
      console.log('password does not work');
      setError({ message: 'Passwords are not matching. Please try again.' });
    }
  };
  console.log('session: ', session, error);
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
              required
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
              required
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
            required
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
            required
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
            required
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
            onChange={({ target }) => setPasswordConfirm(target.value)}
            placeholder="confirm password"
            required
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
          {signupBtnText}
        </button>
      </form>
    </main>
  );
};

export default Signup;
