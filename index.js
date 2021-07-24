// let execFile = require('child_process').execFile
require('dotenv').config();
const { execSync, execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const express = require('express');
const { cpp, python } = require('compile-run');

const app = express();

const http = require('http').Server(app);

const { auth, requiresAuth } = require('express-openid-connect');
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     secret: process.env.SECRET
// }; app.use(auth(config));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname , 'vendor')));
app.use('/codemirror', express.static(__dirname + '/node_modules/codemirror'));
app.set('view engine', 'html');

app.get('/', (req, res) => { // add requiresAuth() middleware if you want necessary authentication
    // use req.oidc.isAuthenticated() to check if authenticated 
    res.sendFile(__dirname + '/public/views/html/index.html');
});

const runCode = async (source, stdin, language) => {
    let ans;
    switch (language) {
        case "C++":
            ans = await cpp.runSource(source, { stdin: stdin });
            break;
        case "Python":
            ans = await python.runSource(source, { stdin: stdin, executionPath : 'python3' });
            break;
    }
    // let ans = await cpp.runSource(source, { stdin: stdin });
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
    runCode(req.body.inpCode, req.body.stdin, req.body.language)
    .then(run => res.send(run));
});

http.listen(port, () => {
    console.log(`listening on port ${port}`);
});