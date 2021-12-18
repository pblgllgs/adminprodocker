const { response } = require("express");

const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");
  res.status(202).json({
    ok: true,
    uid: req.uid,
    hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hostipal = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hostipal.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "500 Internal Server Error",
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  //no existe
  try {
    //se busca en db
    const hospitalDB = await Hospital.findById(id);
    //sino existe
    if (!hospitalDB) {
      res.status(400).json({
        ok: false,
        server: "400 Bad Request",
        msg: "Hospital no encontrado",
      });
    }
    //se crea un objeto con los cambios que se quieren hacer en el hospital
    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };
    //se actualiza pasando la id y los cambios que se quieren guardar
    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      //devuelve el ultimo documento actualizado
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Hospital actualizado",
      hospital: hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      server: "500 Internal Server Error",
      msg: "Hospital no fue actualizado",
    });
  }
};

const borrarHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);
    //sino existe
    if (!hospitalDB) {
      res.status(400).json({
        ok: false,
        server: "400 Bad Request",
        msg: "Hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Archivo eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      server: "500 Internal Server Error",
      msg: "Hospital no fue actualizado",
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital,
};
