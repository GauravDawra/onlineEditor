// DOM elements below
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
            inpCode: getCode(),
            language: getLang()
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        if(json.stderr) {
            stdout.style.color = "red";
            stdout.value = json.stderr;
        }
        else {
            console.log("hello");
            stdout.style.color = "white";
            stdout.value = json.stdout;
        }
    });
});

// resizer js here
var startXVerti, startWidthIn, startWidthOut;
let vertResizer = document.querySelector('.vert');
const vertMouseDown = (e) => {
    startXVerti = e.clientX;
    startWidthIn = parseInt(document.defaultView.getComputedStyle(stdin).width, 10);
    startWidthOut = parseInt(document.defaultView.getComputedStyle(stdout).width, 10);

    window.addEventListener('mousemove', vertDoDrag, false);
    window.addEventListener('mouseup', vertStopDrag, false);
}

const vertDoDrag = (e) => {
    stdin.style.width = (startWidthIn + e.clientX - startXVerti) + 'px';
    stdout.style.width = (startWidthOut - e.clientX + startXVerti) + 'px';
}

const vertStopDrag = (e) => {
    window.removeEventListener('mousemove', vertDoDrag, false);
    window.removeEventListener('mouseup', vertStopDrag, false);
}
vertResizer.addEventListener('mousedown', vertMouseDown);

// hori resizing here
var startYHori, startHeightCode, startHeightInOut;
let horiResizer = document.querySelector('.hori');
let inOut = document.querySelector('.in-out-container');
let codeContainer = document.querySelector('.code');

const horiMouseDown = (e) => {
    startYHori = e.clientY;
    startHeightCode = parseFloat(document.defaultView.getComputedStyle(codeContainer).height, 10);
    startHeightInOut = parseFloat(document.defaultView.getComputedStyle(inOut).height, 10);
    window.addEventListener('mousemove', horiDoDrag, false);
    window.addEventListener('mouseup', horiStopDrag, false);
}

const horiDoDrag = (e) => {
    let dif = e.clientY - startYHori;
    console.log(dif);
    codeContainer.style.height = (startHeightCode + dif) + 'px';
    inOut.style.height = (startHeightInOut - dif) + 'px';
}

const horiStopDrag = (e) => {
    window.removeEventListener('mousemove', horiDoDrag, false);
    window.removeEventListener('mouseup', horiStopDrag, false);
}

horiResizer.addEventListener('mousedown', horiMouseDown);