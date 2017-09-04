const express = require('express');
const server = express();
const path = require('path');
const opn = require('opn');
const axios = require('axios');

const baseDemoAPIURL = 'http://demo.nemo.travel/api';

server.use(express.static('./'));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.route('/api/autocomplete/(:search)?').get((req, res) => {
	const searchString = req.params.search;
	
	if (searchString) {
		axios.get(`${baseDemoAPIURL}/guide/autocomplete/iata/${encodeURIComponent(searchString)}`)
			.then(({data}) => res.json(data))
			.catch(() => res.sendStatus(400));
	}
	else {
		res.sendStatus(400);
	}
});

server.listen(5555);
opn('http://localhost:5555');