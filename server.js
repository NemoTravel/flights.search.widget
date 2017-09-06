const express = require('express');
const server = express();
const path = require('path');
const opn = require('opn');

server.use(express.static('./'));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.listen(5555);
opn('http://localhost:5555');