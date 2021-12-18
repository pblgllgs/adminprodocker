const { response } = require("express");

const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre img");
  return res.status(202).json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "500 Internal Server Error",
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;

  //no existe
  try {
    //se busca en db
    const medicoDB = await Medico.findById(id);
    //sino existe
    if (!medicoDB) {
      res.status(400).json({
        ok: false,
        server: "400 Bad Request",
        msg: "Medico no encontrado",
      });
    }
    //se crea un objeto con los cambios que se quieren hacer en el hospital
    const cambiosMedico = {
      ...req.body,
    };
    //se actualiza pasando la id y los cambios que se quieren guardar
    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      //devuelve el ultimo documento actualizado
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Medico actualizado",
      medico: medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      server: "500 Internal Server Error",
      msg: "Medico no fue actualizado",
    });
  }
};

const borrarMedico = async (req, res = response) => {
  //tomamos el id del url
  const id = req.params.id;
  //no existe
  try {
    //se busca en db
    const medicoDB = await Medico.findById(id);
    //sino existe
    if (!medicoDB) {
      return res.status(400).json({
        ok: false,
        server: "400 Bad Request",
        msg: "Medico no encontrado",
      });
    }

    //se actualiza pasando la id y los cambios que se quieren guardar
    await Medico.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Medico Eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      server: "500 Internal Server Error",
      msg: "Medico no fue actualizado",
    });
  }
};

const getMedicoById = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");
    return res.status(202).json({
      ok: true,
      medico,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      server: "500 Internal Server Error",
      msg: "Medico no encontrado",
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
  getMedicoById,
};
