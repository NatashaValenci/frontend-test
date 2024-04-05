import React, { createContext, useContext, useEffect, useState } from 'react';
import ApiBinanceService from '../services/ApiBinanceService';
import { AppContextType } from '../interfaces/AppContextType';


const AppContext = createContext<AppContextType>({
    symbols:[],
    loading: false
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [symbols, setSymbols] = useState<string[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchExchangeInfo = async () => {
            setLoading(true);
            try {
                const data = await ApiBinanceService.get();
                const asymbols = data.symbols.map((symbol: any) => symbol.symbol);
                setSymbols(asymbols)
                setLoading(false);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
                setLoading(false);
            }
        };

        fetchExchangeInfo();
    }, []);

    return (
        <AppContext.Provider value={{ symbols, loading }}>
            {children}
        </AppContext.Provider>
    );
};
