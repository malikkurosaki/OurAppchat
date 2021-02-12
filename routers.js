const { router, webRouter } = require('./server');
const { Users } = require('./controllers/users')
const handler = require('express-async-handler');
const upload = require('multer')({}).single("file");

// dibutuhkan untuk akses token rest api
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

webRouter.get("/", (a, b)=> {
    b.send("apa kabar")
})

// auth
router.post('/signup', handler(Users.simpanRouter));
router.post('/signin', handler(Users.lihatByEmailPasswordRouter))


// rest api
router.get('/lihat-semua-user',Users.token, handler( Users.lihatSemuaRouter ) )
router.post('/simpan-user', handler(Users.simpanRouter) );


// router.get('/lihat-karyawan', handler( Users.lihatSemuaRouter ))
// router.post('/hapus-karyawan', handler( Users.hapusRouter ));


// router.post('/simpan-gambar', upload, handler(Gambars.simpanGambarRouter) );
// router.get('/lihat-gambar/:ukuran/:user_id/:name', handler( Gambars.lihatGambarRouter ));
// router.get('/lihat-semua-gambar', handler(Gambars.lihatSemuaGambarRouter ))






module.exports = { router }