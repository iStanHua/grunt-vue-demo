var canvas = document.getElementById('time');
var cxt = canvas.getContext('2d');
var alpha = ""
var ua = navigator.userAgent.toLowerCase();
//判断用户设备类型
if (/android/.test(ua)) {
    window.addEventListener('deviceorientationabsolute', DeviceOrientationHandler, false);

    function DeviceOrientationHandler(event) {
        alpha = event.alpha;
        document.getElementById("alpha").innerHTML = Math.round(360 - event.alpha);
    }
} else {
    window.addEventListener('deviceorientation', DeviceOrientationHandler, false);

    function DeviceOrientationHandler(event) {
        alpha = event.webkitCompassHeading;
        document.getElementById("alpha").innerHTML = event.webkitCompassHeading;
    }
}
//定时器
setInterval(myTime, 50);

function myTime() {
    //清除画布
    cxt.clearRect(0, 0, 500, 500);

    var sec = 360 - alpha

    //罗盘边框
    cxt.lineWidth = 10;
    cxt.strokeStyle = "black";
    cxt.beginPath();

    cxt.arc(250, 250, 200, 0, 2 * Math.PI);
    cxt.closePath();
    cxt.stroke();
    //罗盘刻度
    for (var i = 1; i < 8; i++) {
        cxt.save();
        cxt.lineWidth = 7;
        cxt.strokeStyle = "black";
        cxt.translate(250, 250);
        cxt.rotate(i * 45 * Math.PI / 180);
        cxt.beginPath();
        cxt.moveTo(0, -170);
        cxt.lineTo(0, -190);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    }
    cxt.save();
    cxt.lineWidth = 7;
    cxt.strokeStyle = "red";
    cxt.translate(250, 250);
    cxt.beginPath();
    cxt.moveTo(0, -170);
    cxt.lineTo(0, -190);
    cxt.closePath();
    cxt.stroke();
    cxt.restore();

    cxt.save();
    cxt.strokeStyle = "red";
    cxt.lineWidth = 3;
    cxt.translate(250, 250);
    cxt.rotate(sec * Math.PI / 180);
    cxt.beginPath();
    cxt.moveTo(0, -130);
    cxt.lineTo(0, 20);
    cxt.closePath();
    cxt.stroke();
    cxt.beginPath();
    cxt.arc(0, 0, 5, 0, 360, false);
    cxt.closePath();
    cxt.fillStyle = "gray";
    cxt.fill();
    cxt.stroke();
    cxt.restore();
}