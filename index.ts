import express from 'express';
import { Server } from 'socket.io';

const app = express();

const PORT = import.meta.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

const server = app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});

const io = new Server(server);

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	socket.on('draw', (data) => {
		socket.broadcast.emit('draw', data);
	});

	socket.on('disconnect', () => {
		console.log(`${socket.id} disconnected`);
	});
});
