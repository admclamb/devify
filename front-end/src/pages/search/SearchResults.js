import { useEffect, useState } from 'react';
import FeedLoading from '../../components/Feed/FeedLoading';
import ErrorAlert from '../../errors/ErrorAlert';
import { searchData } from '../../utils/api';
import ResultsCard from './ResultsCard';
import SearchResultCard from './SearchResultCard';

const SearchResults = ({ search, query, setError, error }) => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    setError(null);
    setResults(null);
    const abortController = new AbortController();
    if (search) {
      searchData(query, search, abortController.signal)
        .then(setResults)
        .catch(setError);
    }
    return () => abortController.abort();
  }, [search, query]);

  const content = Array.isArray(results) ? (
    results.length > 0 ? (
      results.map((result, index) => (
        <ResultsCard key={index} result={result} />
      ))
    ) : (
      <h4>No Results...</h4>
    )
  ) : (
    <h4>Loading...</h4>
  );

  return (
    <section className="mt-2">
      <ErrorAlert error={error} />
      {content}
    </section>
  );
};

export default SearchResults;
