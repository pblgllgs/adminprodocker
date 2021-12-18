const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')

    try {
        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex })

        ]);

        res.status(202).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            server: "500 Internal Server Error",
            msg: "Error al buscar el email",
        });
    }
}

const getDocumentosColeccion = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    try {
        switch (tabla) {
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('usuario', 'nombre img');
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'no existe ese documento'
                });
        }

        res.status(202).json({
            ok: true,
            resultados: data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            server: "500 Internal Server Error",
            msg: "Error al buscar el email",
        });
    }
}

const getEmail = async(req, res = response) => {

    const email = req.params.email;
    try {
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            res.json({
                ok: false,
                usuario
            })
        }
        res.json({

        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            server: "500 Internal Server Error",
            msg: "Error al buscar el email",
        });
    }

}

module.exports = {
    getTodo,
    getDocumentosColeccion,
    getEmail
}