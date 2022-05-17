import { useState } from 'react';
import SearchResultCard from './SearchResultCard';

const Search = ({ search = 'Hello' }) => {
  const [results, setResults] = useState([]);
  return (
    <section className="container">
      <header className="search-header row">
        <h3>Search for {search}</h3>
      </header>
      <main className="row">
        <aside className="col-2">
          <nav>
            <ul>
              <li>Posts</li>
              <li>People</li>
              <li>Tags</li>
            </ul>
          </nav>
        </aside>
        <section className="col-10">
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
        </section>
      </main>
    </section>
  );
};
export default Search;
