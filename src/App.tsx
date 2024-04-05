import React, { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import SearchPage from './pages/SearchPage/SearchPage';

const App: React.FC = () => {


    return (
        <AppProvider>
            <SearchPage />
        </AppProvider>
    );
};

export default App;
