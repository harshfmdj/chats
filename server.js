const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
let users = [];
let messages = [];
let index = 0;

io.on("connection", socket => {
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    });

    //New user join
    socket.on("newuser", username => {
        console.log(`${username} arrive at the party.`);
        socket.username = username;
        users.push(socket);

        io.emit('userOnline', socket.username);
    });

    socket.on('msg', msg => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        }
        messages.push(message);

        io.emit('msg', message);
        index++;
    });

    //Disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the party`);
        io.emit('userLeft', socket.username);
        users.splice(users.indexOf(socket), 1);
    });
});

http.listen(3000, () => {
    console.log("Listening on port %s", 3000);
});