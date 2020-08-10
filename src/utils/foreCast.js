const request = require('request');

const foreCast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=5a0a1ca28db67f36c9f08034bf2766b9&query=${latitude},${longitude}&units=f`;
	console.log(url);
	request({ url, json: true }, (error, { body }) => {
		// Low level error, pass string for error
		if (error) {
			callback('Unabe to connet to weather service!');
		} else if (!body) {
			// Coordinate error, pass string for error
			callback('Unable to find location');
		} else {
			// Success, pass forecast string for data (same format as from before)
			callback(undefined, {
				feelsLike: body.current.feelslike,
				current: body.current.temperature,
				description: body.current.weather_descriptions[0]
			});
		}
	});
};

module.exports = foreCast;

// http://api.weatherstack.com/current
//     ? access_key = YOUR_ACCESS_KEY
//     & query = New York

// // optional parameters:

//     & units = m
//     & language = en
//     & callback = MY_CALLBACK
