'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'getMaxDeletions' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function getCounter (arr) {
    return arr.reduce((prev, curr) => ({
        ...prev,
        [curr]: 1 + (prev[curr] || 0),
    }), {});
}
function getMaxDeletions(s) {
    const charArray = s.split('');
    const counter = getCounter(charArray);
    console.log({counter})
    const { U = 0, D = 0, L = 0, R = 0 } = counter || {};
    
    const neededSteps = Math.abs(U - D) + Math.abs(L - R);
    return s.length - neededSteps;

}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = getMaxDeletions(s);

    ws.write(result + '\n');

    ws.end();
}
