// const { response } = require("express");

// let socket = io();

// let form = document.getElementById('form');
// let input = document.getElementById('input');
let stdout = document.getElementById('stdout');
let stdin = document.getElementById('stdin');
let code = document.getElementById('inpCode');
let compileAndRun = document.getElementById('compileAndRun');
compileAndRun.addEventListener('click', (event) => {
    console.log('about to post');
    
    fetch('/process', {
        method: "POST",
        body: JSON.stringify({
            stdin: stdin.value,
            inpCode: getCode()
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        stdout.value = json.stdout;
    });
});

