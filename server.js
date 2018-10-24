//
// # MinNodeServer
//
// by Rick Kozak

//require statements -- this adds external modules from node_modules or our own defined modules
const http = require('http');
const path = require('path');

//express related
const Express = require('express');
const bodyParser = require('body-parser');

//file access
const fs = require('fs-extra');

// OS system information module
const OSINFO = require('os');
var username = OSINFO.userInfo();

var cookieSession = require('cookie-session');


//express is the routing engine most commonly used with nodejs
var express = Express();
var server = http.createServer(express);


// handle sessions

express.use(cookieSession({
    name: 'r0c0',
    keys: ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9']
}));



//tell the express router where to find static files
express.use(Express.static(path.resolve(__dirname, 'client')));

//tell the router to parse urlencoded data and JSON data for us and put it into req.query/req.body
express.use(bodyParser.urlencoded({ extended: true }));
express.use(bodyParser.json());

//set up the HTTP server and start it running
server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function () {
    var addr = server.address();
    console.log('Server listening at', addr.address + ':' + addr.port);
});


const X_TOKEN = 'X';
const O_TOKEN = 'O'


//tell the router how to handle a get request to the root
express.get('/', function (req, res) {
    console.log('client requests root');

    console.log(req.session);

    //use sendfile to send our index.html file  
    res.sendFile(path.join(__dirname, 'client/views', 'index.html'));

});


//tell the router how to handle a post request to /calc
express.post('/result', async function (req, res) {

    // for (var i = 0; i < 10; i++) {
    //     req.session[i] = Math.floor(Math.random() * 2);
    //     //req.session[j] = req.session[i];
    //     console.log("i" + i);
    //     console.log(req.session[i]);

    // }

    const GRID = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    let foundMatch = false;
    let gameResult = "Its Tie";

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (GRID[i], [j] != ' ') {
                GRID[i][j] = (Math.floor(Math.random() * 2) == 1) ? X_TOKEN : O_TOKEN;

                // check horizontal
                if (GRID[i][0] != ' ' &&
                    GRID[i][0] === GRID[i][1] &&
                    GRID[i][0] === GRID[i][2]) {
                    gameResult = " Winner is " + GRID[i][0];
                    console.log(gameResult);
                    foundMatch = true;
                    break;
                }

                // check vertical
                if (GRID[0][j] != ' ' &&
                    GRID[0][j] === GRID[1][j] &&
                    GRID[0][j] === GRID[2][j]) {
                    gameResult = "Winner is " + GRID[0][j];
                    console.log(gameResult);
                    foundMatch = true;
                    break;
                }
                // check diagonal - top left bottom right    
                if (GRID[0][0] != ' ' &&
                    GRID[0][0] === GRID[1][1] &&
                    GRID[0][0] === GRID[2][2]) {
                    gameResult = "Winner is " + GRID[0][0];
                    console.log(gameResult);
                    foundMatch = true;
                    break;
                }

                // check diagonal - bottom left top right        
                if (GRID[2][0] != ' ' &&
                    GRID[2][0] === GRID[1][1] &&
                    GRID[2][0] === GRID[0][2]) {
                    console.log("bottom left top right: " + GRID[2][0]);
                    gameResult = "Winner is " + GRID[2][0];
                    console.log(gameResult);
                    foundMatch = true;
                    break;
                }
            }
        }
        if (foundMatch) {
            break;
        }
    }
    console.log(GRID);


    res.send(`<!doctype html>
    <html lang="en">
    
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <!-- To ensure proper rendering and touch zooming for all devices -->
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
        <!-- Local css -->
        <link rel="stylesheet" href="../css/style.css">
        <link rel="icon" href="images/logo1.png" type="image/gif" sizes="12x12">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <title>Tic Tac Toe</title>
    </head>
    
    <body>
        <header class="header"></header>
    
        <h1>Tic Tac Toe</h1>
        <form action="result" method="post">
            <div class="row">
                <div class="col col-sm-3" id="r0c0" data-i=0 data-j=0>${GRID[0][0]}</div>
                <div class="col col-sm-3" id="r0c1" data-i=0 data-j=1>${GRID[0][1]}</div>
                <div class="col col-sm-3" id="r0c2" data-i=0 data-j=2>${GRID[0][2]}</div>
            </div>
            <div class="row">
                <div class="col col-sm-3" id="r1c0" data-i=1 data-j=0>${GRID[1][0]}</div>
                <div class="col col-sm-3" id="r1c1" data-i=1 data-j=1>${GRID[1][1]}</div>
                <div class="col col-sm-3" id="r1c2" data-i=1 data-j=2>${GRID[1][2]}</div>
            </div>
            <div class="row">
                <div class="col col-sm-3" id="r2c0" data-i=2 data-j=0>${GRID[2][0]}</div>
                <div class="col col-sm-3" id="r2c1" data-i=2 data-j=1>${GRID[2][1]}</div>
                <div class="col col-sm-3" id="r2c2" data-i=2 data-j=2>${GRID[2][2]}</div>
            </div>
            <input type="submit" id="newGameButton" class="newGameButton btn btn-success" value="New Game">
        </form>
        
        <div class="gameResult badge badge-success">${gameResult}</div>
    
        <footer class="footer">PROG8165: Assignment 9</footer>
    </body>
    
    </html>`);

});
