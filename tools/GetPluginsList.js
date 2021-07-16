const fs = require('fs');
const path = require('path');

module.exports = ()=>{
    var a = fs.readdirSync(path.resolve(__dirname,'../plugins'))
    return a;
}