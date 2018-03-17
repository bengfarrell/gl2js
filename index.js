let fs = require('fs');
let path = require('path');

let shaders = {};
let options = {};
for (let j = 2; j < process.argv.length; j++) {
    if (process.argv[j].indexOf('=') !== -1) {
        options[process.argv[j].split('=')[0]] = process.argv[j].split('=')[1];
    } else {
        let filepath = process.argv[j];
        let filename = path.basename(filepath);
        let filenameparts = filename.split('.');

        if (filenameparts[filenameparts.length-1].toLowerCase() === 'glsl' ) {
            let shadertype = filenameparts[filenameparts.length-2];
            let shadername = filename.substr(0, filename.indexOf(shadertype)-1);
            if (!shaders[shadername]) {
                shaders[shadername] = {};
            }

            let shader = fs.readFileSync(filepath, 'utf8');
            shader = shader.replace(/\r?\n/g, ' ');
            shader = shader.replace(/\t/g, ' ');
            shaders[shadername][shadertype] = shader;
        }
    }
}

if (path.extname(options.output).toLowerCase() === '.json') {
    fs.writeFileSync(options.output, JSON.stringify(shaders, null, 2), 'utf8');
} else {
    if (options.module) {
        fs.writeFileSync(options.output, 'export default ' + JSON.stringify(shaders, null, 2), 'utf8');
    } else {
        fs.writeFileSync(options.output, options.assignto + ' = ' + JSON.stringify(shaders, null, 2) + ';')
    }
}
