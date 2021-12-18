const Usuario = require("../models/usuario");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const {getMenuFrontEnd} = require('../helpers/menu-frontend')

const login = async (req, res = response) => {
  //desestructuracion del req
  const { password, email } = req.body;
  try {
    //buscamos el usuario en la  db
    const usuarioDB = await Usuario.findOne({ email });
    //si no
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales invalidas",
      });
    }
    //si existe, comparamos la pass con la del usuario en db
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    //si no hacen match
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales invalidas",
      });
    }
    //generamos el jwt
    const token = await generarJWT(usuarioDB.id);

    res.status(200).json({
      ok: true,
      token,
      menu :getMenuFrontEnd(usuarioDB.role)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: " error inesperado",
    });
  }
};

const googleSign = async (req, res = response) => {
  //tomamos el token del body
  const googleToken = req.body.token;
  let usuario;
  try {
    //desestructuracion de la respuesta
    const { name, email, picture } = await googleVerify(googleToken);
    const usuarioDB = await Usuario.findOne({ email });

    //si no existe, asignamos los datos aun usuario para luego guardar sus datos en db
    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "123",
        img: picture,
        google: true,
      });
    } else {
      //existe
      usuario = usuarioDB;
      usuario.google = true;
    }
    //save
    await usuario.save();
    //generamos jwt
    const token = await generarJWT(usuario.id);
    res.json({
      ok: true,
      msg: "Google sign in",
      token,
      menu :getMenuFrontEnd(usuario.role)
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Unauthorized",
    });
  }
};

const renewToken = async (req, res = response) => {
  //tomamos el uid proveniente del token del login
  const uid = req.uid;

  //buscamos el usuario en la  db
  const usuario = await Usuario.findById( uid );
  //si no
  if (!usuario) {
    return res.status(400).json({
      ok: false,
      msg: "Id de usuario no existe",
    });
  }

  //volvemos a generar el token
  const token = await generarJWT(uid);
  res.json({
    ok: true,
    usuario,
    token,
    menu :getMenuFrontEnd(usuario.role)
  });
};

module.exports = {
  login,
  googleSign,
  renewToken,
};
