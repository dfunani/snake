const bcrypt = require('bcrypt');
const saltRounds = 10;

export function generateHash(password: string){
const salt = bcrypt.genSaltSync(saltRounds);
return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string){
    return bcrypt.compareSync(password, hash) ;
}

