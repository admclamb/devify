import { Link } from 'react-router-dom';
import { formatAsMonthDay } from '../../utils/formatDate';
import './ResultsCard.css';
const ResultsCard = ({ result }) => {
  const {
    post_id,
    image_url = null,
    created_at,
    first_name,
    last_name,
    post_header,
    post_body,
    hashtags,
  } = result;
  return (
    <article className="result-card border rounded">
      <div className="result-card-container p-3">
        <header className="result-card-header">
          <div className="result-profile">
            <div className="post-card-pfp"></div>
            <div className="result-name_date">
              <h5 className="text-sm">
                {first_name && last_name
                  ? first_name + '   ' + last_name
                  : 'No Name'}
              </h5>

              <p className="text-sm text-dark">
                {formatAsMonthDay(created_at)}
              </p>
            </div>
          </div>

          <Link to={`/post/${post_id}`} className="post-header-link">
            <h2>{post_header}</h2>
          </Link>
        </header>
        <main className="result-card-main">
          <p className="text-dark">{post_body}</p>
          <p className="text-dark">{hashtags}</p>
        </main>
      </div>
    </article>
  );
};

export default ResultsCard;
