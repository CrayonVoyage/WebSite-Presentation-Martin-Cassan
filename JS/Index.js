document.getElementById('button_1').addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('button_2').style.display = 'inline-block';
});

document.getElementById('button_2').addEventListener('click', function () {
    this.style.display = 'none';
    document.getElementById('button_1').style.display = 'inline-block';
});
