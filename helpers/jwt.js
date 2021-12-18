const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise( (resolve, reject) =>{
        const payload = {uid};

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        },(err, token)=>{
            if(err){
                //MAL
                console.log(err)
                reject(err);
            }else{
                //todo bien
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}