const fs = require('fs');

const Usuario =  require('../models/usuario');
const Medico =  require('../models/medico');
const Hospital =  require('../models/hospital');

const borrarImagen = (path)=> {
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            //buscar el medico
            const medico = await Medico.findById(id);
            //si no existe retorna un falso y salimos
            if(!medico){
                console.log('no es un medico');
                return false;
            }
            //re-construccion del path antiguo
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            //asignamos el nombre del archivo al medico
            medico.img = nombreArchivo;
            //guardamos los datos del medico.
            await medico.save();
            return true;

            break;
        case 'hospitales':
            //buscar el hospital
            const hospital = await Hospital.findById(id);
            //si no existe retorna un falso y salimos
            if(!hospital){
                console.log('no es un hospital');
                return false;
            }
            //re-construccion del path antiguo
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            //asignamos el nombre del archivo al medico
            hospital.img = nombreArchivo;
            //guardamos los datos del medico.
            await hospital.save();
            return true;

            break;
        case 'usuarios':
            //buscar el usuario
            const usuario = await Usuario.findById(id);
            //si no existe retorna un falso y salimos
            if(!usuario){
                console.log('no es un usuario');
                return false;
            }
            //re-construccion del path antiguo
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            //asignamos el nombre del archivo al usuario
            usuario.img = nombreArchivo;
            //guardamos los datos del usuario.
            await usuario.save();
            return true;
            
            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}