const { response } = require("express");
const fs = require('fs');

const path = require('path');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-image");

const fileUploads = (req,res = response) => {

    //recuperamos los parametros desde la url
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','usuarios','medicos'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: 'Tipo no soportado'
        });
    }

    //validamos que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay archivos seleccionados'
        });
    }

    //capturamos el archivo 'imagen'
    const file = req.files.imagen;
    //separamos la extension del nombre del archivo
    const nombreCortado = file.name.split('.');
    //asignamos la extension del archivo a la variable extensionArchivo
    const extensionArchivo = nombreCortado[nombreCortado.length -1];
    //definimos las extensiones validas
    const extensionesValidas = ['png','jpg','jpeg','gif'];

    //nos aseguramos que la extension de la imagen posea una extension valida
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'Extension no soportada'
        });
    }

    //asignamos un identificador unico y concatenamos con la extension del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar el archivo
    const path =`./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen
    file.mv(path, (err) => {
        if (err){
          return res.status(500).json({
              ok: false,
              msg: 'Error al mover la imagen'
          });
        }

        //actualizar db
        actualizarImagen(tipo, id, nombreArchivo);

        res.status(200).json({
            ok:true,
            msg:'File uploaded!',
            nombreArchivo
        });
    });

}

const retornaImagen = (req, res= response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    //reconstruimos la ruta de la imagen
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
    //si existe manda la ruta
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}


module.exports = {
    fileUploads,
    retornaImagen
}