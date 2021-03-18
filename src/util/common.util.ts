import axios from 'axios';
import config from '../config';
import { IndiaApiResponse, WorldApiResponse } from '../types';
import dnt from 'date-and-time';
const ordinal = require('date-and-time/plugin/ordinal');

const worldResponseKey = 'world-data';
const indiaResponseKey = 'india-data';
dnt.plugin(ordinal);

const saveDataInLocalStorage = (data: WorldApiResponse|IndiaApiResponse, key: string) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

const getItemFromLocalStorage = (key: string): any => {
    const dataString = window.localStorage.getItem(key);
    if (!dataString) throw new Error(`No Data present in cache too for: ${key}`);
    return JSON.parse(dataString);
}

export const getWorldData = async (): Promise<WorldApiResponse> => {
    try {
        const resp = await axios.get<WorldApiResponse>(`${config.covidDataApi}/api`, {
            headers: {
                'x-rapidapi-key': config.apiKey
            },
            timeout: config.apiTimeOut
        });

        if (!resp || !resp.data) {
            throw new Error('No data for getWorldData');
        }

        saveDataInLocalStorage(resp.data, worldResponseKey);
        return resp.data;
    } catch (err) {
        console.error(err);
        return getItemFromLocalStorage(worldResponseKey);
    }
};

export const getIndiaData = async (): Promise<IndiaApiResponse> => {
    try {
        const resp = await axios.get<IndiaApiResponse>(`${config.covidDataApi}/api_india`, {
            headers: {
                'x-rapidapi-key': config.apiKey
            },
            timeout: config.apiTimeOut
        });
    
        if (!resp || !resp.data) {
            throw new Error('No data for getIndiaData');
        }

        saveDataInLocalStorage(resp.data, indiaResponseKey);
        return resp.data;
    } catch (err) {
        console.error(err);
        return getItemFromLocalStorage(indiaResponseKey);
    }
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

/**
 * Potential input: 18/3/2021 02:24:47 and 2021-03-17 23:58:01
 * @param dateTimeStr
 */
export const getDateTimeString = (dateTimeStr: string) => {
    // For world time scenario
    if (dateTimeStr.match('-')) {
        const date: Date = dnt.parse(dateTimeStr, 'YYYY-MM-DD HH:mm:ss', true);
        return dnt.format(date, 'dddd, DDD MMMM YYYY hh:mm:ss A');
    }

    // For india time scenario
    if (dateTimeStr.match('/')) {
        const date: Date = dnt.parse(dateTimeStr, 'D/M/YYYY HH:mm:ss', true);
        return dnt.format(date, 'dddd, DDD MMMM YYYY hh:mm:ss A');
    }

    return dateTimeStr;
};