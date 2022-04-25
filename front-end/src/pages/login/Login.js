import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../errors/ErrorAlert';
import { createLogin } from '../../utils/api';
import './LoginForm.css';
const Login = () => {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    const { id } = target;
    setLogin({
      ...login,
      [id]: target.value,
    });
  };
  console.log(login);
  const handleSubmit = async (event) => {
    try {
      event.preventDeault();
      setError(null);
      const abortController = new AbortController();
      await createLogin(login, abortController.signal);
      navigate('/');
    } catch (error) {
      setError(error);
    }
  };
  return (
    <main className="row">
      <form className="col-12 col-sm-11 col-md-5 ms-auto me-auto border rounded login-form">
        <ErrorAlert error={error} />
        <h3 className="text-center">Welcome to DEV Clone</h3>
        <div className="input-control mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={login.email}
            onChange={handleChange}
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
            value={login.password}
            onChange={handleChange}
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
          className="btn btn-primary login-submit"
          onSubmit={handleSubmit}
        >
          Continue
        </button>
      </form>
    </main>
  );
};

export default Login;
