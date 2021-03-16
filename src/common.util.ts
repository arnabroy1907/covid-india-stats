import axios from 'axios';
import config from './config';
import { IndiaApiResponse, WorldApiResponse } from './types';

export const getWorldData = async () => {
    const resp = await axios.get<WorldApiResponse>(`${config.covidDataApi}/api`, {
        headers: {
            'x-rapidapi-key': config.apiKey
        },
        timeout: 5000
    });

    if (!resp || !resp.data) {
        throw new Error('No data for getWorldData');
    }

    return resp.data;
};

export const getIndiaData = async () => {
    const resp = await axios.get<IndiaApiResponse>(`${config.covidDataApi}/api_india`, {
        headers: {
            'x-rapidapi-key': config.apiKey
        },
        timeout: 5000
    });

    if (!resp || !resp.data) {
        throw new Error('No data for getIndiaData');
    }

    return resp.data;
};