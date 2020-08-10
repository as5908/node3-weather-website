const request = require('request');

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoidHdtcmR4IiwiYSI6ImNrZDM5MnRyaDBsM3IyeG54NDFlYnBrZmkifQ.Ij0OpMDo8z3BwErr0AYy7Q&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect ot location services!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location, try different search term', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geoCode;

// mapbox: pk.eyJ1IjoidHdtcmR4IiwiYSI6ImNrZDM5MnRyaDBsM3IyeG54NDFlYnBrZmkifQ.Ij0OpMDo8z3BwErr0AYy7Q
// weather stack info:
// http://api.weatherstack.com/
// 5a0a1ca28db67f36c9f08034bf2766b9
//
