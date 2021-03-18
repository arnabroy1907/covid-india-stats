// eslint-disable-next-line import/no-anonymous-default-export
export default {
    appName: 'covid-india-stats',
    covidDataApi: 'https://corona-virus-world-and-india-data.p.rapidapi.com',
    apiKey: process.env.REACT_APP_COVID_API_KEY,
    apiTimeOut: 10000,
    envr: process.env.NODE_ENV,
    errorMessage: 'Something went wrong! Please try again after some time.',
    footerText: {
        info: 'This site is owned and maintained by',
        owner: 'Arnab Roy',
        linkedInLink: 'https://www.linkedin.com/in/arnab-roy-1907/'
    }
};