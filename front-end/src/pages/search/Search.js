import { useState } from 'react';

import SearchResultNav from './SearchResultNav';
import SearchSearchBar from './SearchSearchbar';
import SearchResults from './SearchResults';
import './Search.css';
const Search = ({ search }) => {
  const [query, setQuery] = useState('posts');
  const [error, setError] = useState(null);
  const handleClick = ({ target }) => {
    setQuery(target.id);
  };
  return (
    <section className="container">
      <header className="search-header row mb-2 d-flex flex-column flex-md-row">
        <div className="search-searchbar d-md-none col-12">
          <SearchSearchBar search={search} />
        </div>
        <h3 className="d-none d-md-block col-12">Search for {search}</h3>
        <div className="ms-auto">
          <SearchResultNav />
        </div>
      </header>
      <main className="row">
        <aside className="col-12 col-md-2">
          <nav className="search-page__nav">
            <ul className="d-flex d-md-block">
              <li
                id="posts"
                className={`p-2 rounded ${
                  query === 'posts' ? 'search-page-nav__active' : ''
                }`}
                onClick={handleClick}
              >
                Posts
              </li>
              <li
                id="users"
                className={`p-2 rounded ${
                  query === 'people' ? 'search-page-nav__active' : ''
                }`}
                onClick={handleClick}
              >
                People
              </li>
              <li
                id="tags"
                className={`p-2 rounded ${
                  query === 'tags' ? 'search-page-nav__active' : ''
                }`}
                onClick={handleClick}
              >
                Tags
              </li>
            </ul>
          </nav>
        </aside>
        <div className="col-12 col-md-6">
          <SearchResults
            search={search}
            query={query}
            setError={setError}
            error={error}
          />
        </div>
      </main>
    </section>
  );
};
export default Search;
