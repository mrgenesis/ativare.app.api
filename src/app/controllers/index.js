const fs = require('fs');
const path = require('path');

//const teste = fs.readdirSync(__dirname);
//console.log(teste.filter( item => item.indexOf('.') !== 0 && item !== 'index.js' ));


module.exports = app => {
    fs
        .readdirSync(__dirname)
        .filter( file => file.indexOf('.') !== 0 && file !== 'index.js' )
        .forEach( fileOk => require(path.resolve(__dirname, fileOk))(app));
};