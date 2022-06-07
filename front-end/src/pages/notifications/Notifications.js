import { useState } from 'react';
import NotificationCard from './NotificationCard';
import './Notifications';
const Notifications = ({ notifications, setNotifications, session }) => {
  const [query, setQuery] = useState('all');
  const [error, setError] = useState(null);
  const handleClick = ({ target }) => {
    setQuery(target.id);
  };

  const notificationsList =
    Array.isArray(notifications) &&
    notifications.map((not, index) => {
      return <NotificationCard notification={not} key={not.notification_id} />;
    });
  console.log(notifications);
  return (
    <section className="container">
      <header>
        <h3>Notifications</h3>
      </header>
      <main className="row">
        <aside className="col-12 col-md-2">
          <nav className="search-page__nav">
            <ul className="d-flex d-md-block">
              <li
                id="all"
                className={`p-2 rounded ${
                  query === 'all' ? 'search-page-nav__active' : ''
                }`}
                onClick={handleClick}
              >
                All
              </li>
              <li
                id="comments"
                className={`p-2 rounded ${
                  query === 'comments' ? 'search-page-nav__active' : ''
                }`}
                onClick={handleClick}
              >
                Comments
              </li>
              <li
                id="posts"
                className={`p-2 rounded ${
                  query === 'posts' ? 'search-page-nav__active' : ''
                }`}
                onClick={handleClick}
              >
                Posts
              </li>
            </ul>
          </nav>
        </aside>
        <div className="col-12 col-md-6">{notificationsList}</div>
      </main>
    </section>
  );
};

export default Notifications;
