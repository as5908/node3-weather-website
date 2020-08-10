const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/foreCast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public'); // to serve static content
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Abhinav Sahai'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Abhinav Sahai'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text.',
		title: 'Help',
		name: 'Abhinav Sahai'
	});
});

app.get('/weather', (req, res) => {
	const { address } = req.query;

	if (!address) {
		return res.send({
			error: 'You must provide an address!'
		});
	}
	geoCode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error
			});
		}
		foreCast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}
			res.send({
				forecast: forecastData,
				location,
				address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		// We need to return to ensure the outside if block does not get executed.
		return res.send({
			error: 'You must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Abhinav Sahai',
		errorMessage: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Abhinav Sahai',
		errorMessage: 'Page not found'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});