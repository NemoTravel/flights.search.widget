const express = require('express');
const server = express();
const path = require('path');
const opn = require('opn');
const compression = require('compression');

server.use(compression());
server.use(express.static('./dist'));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

server.listen(5555);
opn('http://localhost:5555');