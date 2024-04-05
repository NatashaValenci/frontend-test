import React, { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <input 
      type="text" 
      placeholder="Pesquisar..." 
      value={query} 
      onChange={handleChange} 
      className="input"
   />
  );
};

export default SearchInput;
