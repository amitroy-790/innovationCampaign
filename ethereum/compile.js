const path =  require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');
const contractPath = path.resolve(__dirname,'contracts','campaign.sol');

fs.ensureDirSync(buildPath);
fs.removeSync(buildPath);

const source = fs.readFileSync(contractPath,'utf8');
const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':','')+'.json'),
        output[contract]
    );
}