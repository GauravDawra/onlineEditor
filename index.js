// let execFile = require('child_process').execFile
const { execSync, execFile } = require('child_process');
const fs = require('fs');
const express = require('express');
const { cpp } = require('compile-run');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname +  '/public'));
app.set('view engine', 'html');

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
    console.log("het");
});

const runCode = async (source, stdin) => {
    let ans = await cpp.runSource(source, { stdin: stdin });
    return ans;
}

app.post('/process', (req, res) => {
    
    // fs.writeFile(__dirname + '/test.cpp', req.body.inpCode, err => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    // });
    let outResult = runCode(req.body.inpCode, req.body.stdin)
    .then(run => res.send(run));
    // cpp.runFile(__dirname + "/test.cpp", (err, result) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         // console.log(result);
    //         outResult = result;
    //     }
    //     res.send(outResult);
    //     // if(result.exitCode == 0) {
    //     // }
    //     // res.send(result.stdout);
    // });
});

http.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

