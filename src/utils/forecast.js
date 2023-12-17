const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0942e2588c32a887bb1ecfa928a21df3&query=' + lat + ',' + lng ;
    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to Reach', undefined);
        } else if (body.error) {
            callback('Unable to Find the Location', undefined);
        } else {
            callback(undefined, (` ${body.current.weather_descriptions} It is currently ${body.current.temperature} degree Celcius here and There is ${body.current.precip}% chance of rain`));
        }
    });
};

module.exports = forecast;
