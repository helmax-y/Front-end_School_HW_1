import { useState, useCallback } from 'react';

import prepareSuitableMock from '../services/prepareSuitableMock';

const apiKey = {
    my: '74204c479emsh0e2f0aab91fff7ep1421f1jsnf9869f575cc3',
    genesis: 'c1257dc04cmshd888bbb072eb770p1f2b8ajsnbf16d4cd1d66',
};

const myAcc = false;
const workWithMock = true;

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [response, setResponse] = useState(undefined);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            const rapidApiHeaders = {
                ...headers,
                'x-rapidapi-host': 'tiktok33.p.rapidapi.com',
                'x-rapidapi-key': myAcc ? apiKey.my : apiKey.genesis,
            };

            const res = workWithMock
                ? prepareSuitableMock(url)
                : await fetch(url, { method, body, headers: { ...headers, ...rapidApiHeaders } });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(res.message || 'Something went wrong');
            } else {
                setResponse(data);
            }
        } catch(e) {
            setIsError(true);

            throw e;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { request, response, isLoading, setIsLoading, isError, setIsError };
};

export default useFetch;
