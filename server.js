const express = require('express');
const server = express();
const path = require('path');
const opn = require('opn');
const compression = require('compression');
const requestProxy = require('express-request-proxy');

server.use(compression());
server.use(express.static('./dist'));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

server.post('/json/dependence-cities', requestProxy({
	url: "http://demo.websky.aero/gru/json/dependence-cities",
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	}
}));

server.listen(5555);
opn('http://localhost:5555');