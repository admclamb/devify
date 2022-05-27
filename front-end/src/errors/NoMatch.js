import { Link } from 'react-router-dom';
import './NoMatch.css';
const NoMatch = () => {
  return (
    <div className="container">
      <div className="no-match-jumbotron rounded p-4">
        <h1>Error 404 Page Not Found</h1>
        <p>Please use this button to redirect to the homepage</p>
        <Link to="/" className="btn btn-light mt-2">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
