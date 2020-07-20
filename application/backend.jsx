import express from "express";

const app = express();

app.get('/', (req, res) => res.send('Test'));

app.listen(3000, function () {
	console.log('Server started');
});