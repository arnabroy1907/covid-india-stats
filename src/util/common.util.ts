import axios from 'axios';
import config from '../config';
import { IndiaApiResponse, WorldApiResponse } from '../types';

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

/**
 * Returns the numeric string in Indian comma seperator format
 * Converts existing international format to Indian format
 * @example 
 * '100000' or '100,000' -> '1,00,000'
 * '10000000' or '10,000,000' -> '1,00,00,000'
 * '10000000000' or '10,000,000,000' -> '1000,00,00,000'
 * @param numberString @type(string)
 * @returns Numeric String with commas
 */
export const formatNumberString: Function = (numberString: string): string => {
    let str = numberString;
    str = numberString.split(',').join('');

    // if number is less than 1 thousand
    if (str.length <= 3) return str;

    // if number is more than 1 thousand and less than 1 lakh
    if (str.length < 6) {
        return str.substr(0, str.length - 3) + ',' + str.substr(str.length - 3, 3);
    }

    // if number is more than 1 lakh and less than 1 crore
    if (str.length < 8) {
        return str.substr(0, str.length - 5) + ',' +
            str.substr(str.length - 5, 2) + ',' +
            str.substr(str.length - 3, 3);
    }

    // if number is more than 1 crore
    return str.substr(0, str.length - 7) + ',' +
        str.substr(str.length - 7, 2) + ',' +
        str.substr(str.length - 5, 2) + ',' +
        str.substr(str.length - 3, 3);
};