import { useState } from 'react';
import SearchInput from '../../components/SearchInput';
import SelectedSymbols from '../../components/SelectedSymbols';
import { useAppContext } from '../../context/AppContext';
import './SearchPage.css';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
    const { symbols } = useAppContext();

    const handleSearch = (query: string) => {
        if (query === '') {
            setSearchResults([]);
        } else {
            const filteredSymbols = symbols.filter(symbol => symbol.toLowerCase().includes(query.toLowerCase())) || [];
            setSearchResults(filteredSymbols);
        }
    };

    const handleSelectSymbol = (symbol: string) => {
        setSelectedSymbols([...selectedSymbols, symbol]);
    };

    return (
        <div className='container'>
            <div className='search'>
                <div className='container-input'>
                    <SearchInput onSearch={handleSearch} />
                    {searchResults.map((symbol, index) => (
                        <div key={index} className='selecionar'>
                            <input className="selecionar-checkbox" type="checkbox" onChange={() => handleSelectSymbol(symbol)} />
                            <span>{symbol}</span>
                        </div>
                    ))}
                </div>

            </div>
            <div className='list'>
                <SelectedSymbols symbols={selectedSymbols}  />
            </div>
        </div>
    );
};

export default SearchPage;
