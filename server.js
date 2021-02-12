const express = require('express');
const httpsLocalhost = require("https-localhost")()
const port = 8000
const router = express.Router();
const app = express();


const cors = require('cors');
const body = require('body-parser')
const path = require('path');


app.use(cors());
app.use(express.static(path.join(__dirname,'./public')))
app.use(body.urlencoded({ extended: true}))
app.use(body.json())
app.use('/api',router);
app.use((req, res, next) => {
    res.status(404).send("<center>404 | not found</center>");
})


app.enable('trust proxy');

;(async x => {
    const certs = await httpsLocalhost.getCerts()
    const http = require('https').createServer(certs, app);
    const io = require('socket.io')(http);
    http.listen(port, () => console.log('server run on port 8000'));
    io.on("connection", socket => {
        socket.on("apa", message => console.log(message));
    });
})();


module.exports = { router };