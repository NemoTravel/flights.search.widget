const express = require('express');
const server = express();
const path = require('path');
const opn = require('opn');
const axios = require('axios');

const baseDemoAPIURL = 'http://nemo1/api';

server.use(express.static('./'));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

const proxy = (url, response) => {
	axios.get(url)
		.then(({data}) => response.json(data))
		.catch(() => response.sendStatus(400));
};

server.route('/api/autocomplete/(:search)?').get((req, res) => {
	const search = req.params.search;
	proxy(`${baseDemoAPIURL}/guide/autocomplete/iata/${encodeURIComponent(search)}`, res);
});

server.route('/api/autocomplete/airline/:iata/(:search)?').get((req, res) => {
	const { search, iata } = req.params;
	let url = `${baseDemoAPIURL}/guide/autocomplete/airline/${iata}`;
	
	if (search) {
		url += `/${encodeURIComponent(search)}`;
	}
	
	proxy(url, res);
});

server.listen(5555);
opn('http://localhost:5555');