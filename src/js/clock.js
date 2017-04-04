var myClock = document.getElementById('clock');
var ctx = myClock.getContext('2d');
var ClockWidth = ctx.canvas.width;
var ClockHeight = ctx.canvas.height;
var r = ClockWidth / 2;
var rem = ClockWidth / 500;

function drawBackground() {
    ctx.save();
    ctx.translate(r, r);
    ctx.beginPath();
    ctx.lineWidth = 15 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
    ctx.stroke();

    var hourNum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 36 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var i = 0; i < 12; i++) {
        var rad = 2 * Math.PI / 12 * i; //对一个不同值的弧度
        var x = Math.cos(rad) * (r - 55 * rem);
        var y = Math.sin(rad) * (r - 55 * rem);
        ctx.fillText(hourNum[i], x, y);
    }

    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.beginPath();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (i % 5 === 0) {
            ctx.fillStyle = '#000';
            ctx.arc(x, y, 4 * rem, 0, 360, false);
        } else {
            ctx.fillStyle = '#ccc';
            ctx.arc(x, y, 3 * rem, 0, 360, false);
        }
        ctx.fill();
    }
}

function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 12 * hour;
    var mRad = 2 * Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mRad);
    ctx.lineWidth = 10 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}

function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -(r - 80 * rem));
    ctx.stroke();
    ctx.restore();
}

function drawSecond(second) {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-4 * rem, 30 * rem);
    ctx.lineTo(4 * rem, 30 * rem);
    ctx.lineTo(1, -(r - 40 * rem));
    ctx.lineTo(-1, -(r - 40 * rem));
    ctx.fill();
    ctx.restore();
}

function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0, 0, 5 * rem, 0, 360, false);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, ClockWidth, ClockHeight);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}

draw();
setInterval(draw, 1000);