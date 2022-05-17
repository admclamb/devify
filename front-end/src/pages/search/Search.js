import { useState } from 'react';
import SearchResultCard from './SearchResultCard';
import SearchSearchBar from './SearchSearchbar';

const Search = ({ search }) => {
  const [results, setResults] = useState([]);
  return (
    <section className="container">
      <header className="search-header row mb-2">
        <div className="search-searchbar d-md-none col-12">
          <SearchSearchBar search={search} />
        </div>
        <h3 className="d-none d-md-block col-12">Search for {search}</h3>
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
