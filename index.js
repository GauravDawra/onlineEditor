// let execFile = require('child_process').execFile
const { execSync, execFile } = require('child_process');
const fs = require('fs');
const express = require('express');
const { cpp } = require('compile-run');

const app = express();

const http = require('http').Server(app);
// const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname +  '/public'));
app.set('view engine', 'html');

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

const runCode = async (source, stdin) => {
    let ans = await cpp.runSource(source, { stdin: stdin });
    return ans;
}

// const runViaSourceFile = async (sourceFile, stdin) => { // not tested yet
//     cpp.runFile(__dirname + "/" + sourceFile, (err, result) => {
//         if(err){
//             console.log(err);
//             return err;
//         }
//         else{
//             return result;
//         }
//     });
// }

app.post('/process', (req, res) => {
    /*Run below code to write to a file */
    // fs.writeFile(__dirname + '/test.cpp', req.body.inpCode, err => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    // });

    let outResult = runCode(req.body.inpCode, req.body.stdin)
    .then(run => res.send(run));
});

http.listen(port, () => {
    console.log(`listening on port ${port}`);
});

