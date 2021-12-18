const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res = response,next) => {

    //leo el token
    const token = req.header('x-token');

    //si no existe
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    //si existe
    try {
        const {uid} = jwt.verify(token , process.env.SECRET_JWT_SEED);
        req.uid = uid;
        //todo sale bien
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const validarROLE = async (req, res = response, next) =>{ 
    const uid = req.uid;
    try {
        const usuarioDB =  await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        if(usuarioDB.role != 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios de ADMIN'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

const validarROLEPropio = async (req, res = response, next) =>{ 
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDB =  await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios de ADMIN'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        });
    }
}

module.exports = {
    validarJWT,
    validarROLE,
    validarROLEPropio
}