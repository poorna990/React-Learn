/**
 * Custom hook to handle Http requests loading, error states etc
 */

import { useState, useEffect, useCallback } from 'react';

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const respData = await response.json();
    if (!response.ok) {
        throw new Error(respData.message ||
        'Something went wrong, failed to send request');
    }
    return respData;
}


export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(
        async function sendRequest(data) {
        setIsLoading(true);
        try {
            const responseData = await sendHttpRequest(url, { ...config, body: data });
            setData(responseData);
        } catch (error) {
            setError(error.message || 'Something went wrong!!');
        }
        setIsLoading(false);
   }, [url, config]);

    useEffect(() => {
        if (config && config.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}