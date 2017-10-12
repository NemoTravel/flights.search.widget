const express = require('express');
const server = express();
const path = require('path');
const opn = require('opn');
const compression = require('compression');
const port = 5555;

server.use(compression());
server.use(express.static('./dist'));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

server.listen(port);
opn('http://localhost:' + port);