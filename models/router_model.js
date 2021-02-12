const path = require('path');
const fs = require('fs');
const imageThumbnail = require('image-thumbnail');

// jwt
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

let RouterModel = model => class extends model {

    static async lihatSemuaRouter(req, res){
        try {
            const data = await model.lihatSemua()
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async lihatSatuRouter(req, res){
        try {
            const data = await model.lihatSatu(req.params.id);
            res.send({status: true, data: data});
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async lihatByEmailPasswordRouter(req, res){
       
        const data = await model.lihatByEmailPassword(req.body.email, req.body.password);
        if(data == null){
            res.send({status: false, data: null})
        }else{
            const token = model.generateAccessToken({email: req.body.email});
            res.send({status: true, data: token})
        }
        
    }

    static async temukanRouter(req, res){
       try {
           const data = await model.temukan(req.params.id);
           res.send({status: true, data: data})
       } catch (error) {
           res.send({status: false, message: error.message})
       }
    }

    static async cariRouter(req, res){
        try {
            const data = await model.cari(req.params.name);
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async simpanRouter(req, res){
        try {
            const data = await model.simpan(req.body);
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async updateRouter(req, res){
        try {
            const data = await model.update(req.body.data, req.body.id);
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async updateAtauSimpanRouter(req, res){
        try {
            const data = await model.updateAtauSimpan(req.body);
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async hapusRouter(req, res){
        try {
            const data = await model.hapus(req.body.id);
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async bersihkanRouter(req, res){
        try {
            const data = await model.bersihkan();
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async terangkanRouter(req, res) {
        try {
            const data = await model.terangkan();
            res.send({status: true, data: data})
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async simpanGambarRouter(req, res){
        try {
            const thumbnail = await imageThumbnail(req.file.buffer);
            const imageData = await imageThumbnail(req.file.buffer, {percentage: 50});

            const paket = {
                user_id: req.body.user_id,
                name: Math.random().toString(26).substring(7)+"-"+req.body.name,
                data: imageData,
                thumbnail: thumbnail
            }
            const data = await model.simpan(paket);
            res.send({status: true, data: data.name});
        } catch (error) {
            res.send({status: false, message: error.message})
        }
    }

    static async lihatGambarRouter(req, res) {
        try {
            const data = await model.lihatGambar(req.params.user_id, req.params.name)
            
            res.writeHead(200,{
                'Content-Type': 'image/png',
                //'Content-Length': data.data.length
            })
            res.end(req.params.ukuran == "kecil"?data.thumbnail:data.data);
           

        } catch (error) {
            const data = fs.readFileSync(path.join(__dirname,'./assets/images/no_image.png'))
            res.writeHead(200,{
                'Content-Type': 'image/png',
                'Content-Length': data.length
            })
            res.end(data)
        }
    }

    static async lihatSemuaGambarRouter(req, res){
        try {
            const data = await model.lihatSemuaGambar();
            res.send({status: true, data: data});
        } catch (error) {
            res.send({status: false, message: error.message});
        }
    }

    static async aktifkanRouter(req, res){
        try {
            const data = await model.aktifkan();
            res.send({status : true, data: data})
        } catch (error) {
            console.log(error);
            res.send({status: false, message: error.message});
        }
    } 

    static token(req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token
    
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next() // pass the execution off to whatever request the client intended
        })
    }
}

module.exports = { RouterModel }