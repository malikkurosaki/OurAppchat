const express = require('express');
const httpsLocalhost = require("https-localhost")()
const port = 8000 || process.env.PORT
const router = express.Router();
const webRouter = express.Router();
const app = express();
const http = require('http').createServer(app);

const cors = require('cors');
const body = require('body-parser')
const path = require('path');


app.use(cors());
// app.use(express.static(path.join(__dirname,'./public')));
app.use(body.urlencoded({ extended: true}));
app.use(body.json());
app.use('/api',router);
app.use(webRouter);
app.use((req, res, next) => {
    res.status(404).send("<center>404 | not found</center>");
});

http.listen(port, () => console.log("server run on "+ port));

// ;(async x => {
//     app.enable('trust proxy');
//     const certs = await httpsLocalhost.getCerts()
//     const http = require('https').createServer(certs, app);
//     const io = require('socket.io')(http);
//     const ip = "localhost";
//     http.listen(port,"192.168.43.112",() => console.log(`server run on ${ip}:${port}`));
//     // io.on("connection", socket => {
//     //     socket.on("apa", message => console.log(message));
//     // });
// })();

// http.listen(port, () => console.log("server run on port "+port));
module.exports = { router, webRouter };