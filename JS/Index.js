var left_button = document.getElementById('button_1')
var right_button = document.getElementById('button_2')


left_button.addEventListener('click', function () {
    this.style.display = 'none';
    right_button.textContent='Remettre' ;
});

right_button.addEventListener('click', function () {
    left_button.style.display = 'inline-block';
    this.textContent='Rien';
});


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(5, 5, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();