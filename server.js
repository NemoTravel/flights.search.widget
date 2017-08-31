const express = require('express');
const server = express();
const path = require('path');

server.use(express.static('./dist'));

server.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.listen(5555);