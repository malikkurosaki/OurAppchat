const { router, io } = require('./server');
const { Users, User } = require('./controllers/users')
const handler = require('express-async-handler');
const upload = require('multer')({}).single("file");

// akses token rest api
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

router.get("/",authenticateToken, (a, b)=> {
    b.send("apa kabar")
})

router.get('/lihat-semua-user', handler( Users.lihatSemuaRouter ) )
router.post('/simpan-user', handler(Users.simpanRouter) );
router.post('/user-login', handler( Users.lihatByEmailPasswordRouter))

// router.get('/lihat-karyawan', handler( Users.lihatSemuaRouter ))
// router.post('/hapus-karyawan', handler( Users.hapusRouter ));


// router.post('/simpan-gambar', upload, handler(Gambars.simpanGambarRouter) );
// router.get('/lihat-gambar/:ukuran/:user_id/:name', handler( Gambars.lihatGambarRouter ));
// router.get('/lihat-semua-gambar', handler(Gambars.lihatSemuaGambarRouter ))


function authenticateToken(req, res, next) {
    //console.log("ini apa ya");
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        //console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}



module.exports = { router }