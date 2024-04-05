import axios from 'axios';

const BASE_URL = 'https://api.binance.com/api/v3';

const ApiBinanceService = {
    get: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/exchangeInfo`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default ApiBinanceService;