var canvas = document.getElementById("myCanvas1");
var ctx = canvas.getContext("2d");

var startButton = document.getElementById('startButton')
var button_up = document.getElementById('button_up')
var button_down = document.getElementById('button_down')
var button_left = document.getElementById('button_left')
var button_right = document.getElementById('button_right')

var gameStatus = 0 ;
var score = 0 ;
document.getElementById('scoreDisplay').innerHTML = 0 ;

var targetPositionVertical ;
var targetPositionHorizontal ;
var rectPositionVertical ;
var rectPositionHorizontal ;

startButton.addEventListener('click', function () {
    gameStatus = 1 ; 
    rectPositionVertical = 200 ;
    rectPositionHorizontal = 200 ;
    targetPositionVertical = Math.floor(Math.random() * ( 460 - 10 + 10)) + 10 ;
    targetPositionHorizontal = Math.floor(Math.random() * ( 460 - 10 + 10)) + 10 ;
    draw() ;
});

button_up.addEventListener('click', function () {
    if (gameStatus === 1) {
        rectPositionVertical = rectPositionVertical - 20 ;
        draw() ;
        checkWin();
    }
});

button_down.addEventListener('click', function () {
    if (gameStatus === 1) {
        rectPositionVertical = rectPositionVertical + 20 ;
        draw () ;
        checkWin();
    }
});

button_right.addEventListener('click', function () {
    if (gameStatus === 1) {
        rectPositionHorizontal = rectPositionHorizontal + 20 ;
        draw() ;
        checkWin();
    }
});

button_left.addEventListener('click', function () {
    if (gameStatus === 1) {
        rectPositionHorizontal = rectPositionHorizontal - 20 ;
        draw() ;
        checkWin();
    }
});

function checkWin() {
    if (
        rectPositionVertical < targetPositionVertical + 20 && 
        rectPositionVertical + 50 > targetPositionVertical &&
        rectPositionHorizontal < targetPositionHorizontal + 20 && 
        rectPositionHorizontal +50 > targetPositionHorizontal
    ) {
        score ++ ;
        document.getElementById('scoreDisplay').innerHTML = score ;
        gameStatus = 0 ;     
    }
}

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(rectPositionHorizontal , rectPositionVertical, 50, 50);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(targetPositionHorizontal , targetPositionVertical, 20, 20);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    console.log(rectPositionVertical)
    console.log(rectPositionHorizontal)
    console.log(targetPositionVertical)
    console.log(targetPositionVertical)

    console.log(score)
}

var titleToChange = document.getElementsByClassName('intro')
console.dir(titleToChange)

