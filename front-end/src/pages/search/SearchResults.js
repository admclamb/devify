import { useEffect, useState } from 'react';
import { searchData } from '../../utils/api';
import SearchResultCard from './SearchResultCard';

const SearchResults = ({ search, query }) => {
  const [results, setResults] = useState([]);
  useEffect(async () => {
    const abortController = new AbortController();
    const response = await searchData(query, search, abortController.signal);
    console.log(response);
  }, [search]);
  return null;
};

export default SearchResults;
