function setup() {
  "use strict";
  var canvas = document.getElementById("myCanvas");
  var slider1 = document.getElementById("slider1");
  var slider2 = document.getElementById("slider2");
  var y = 50;
  let req;
  slider1.value = 0;
  slider2.value = 0;

  function draw() {
    //provides the colors of the background and title
    var context = canvas.getContext("2d");
    canvas.width = canvas.width;
    context.fillStyle = "Ivory";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "DarkSeaGreen";
    context.font = "40px Lucida Handwriting";
    context.fillText("Ice Cream", 20, 290);
    var x = slider1.value;

    //animation for falling ice cream in blue
    function drawMovingIceCream() {
      //blue ice cream
      context.beginPath();
      //move with first slider and change size with second slider
      context.arc(x, y, 20 + slider2.value / 2, 0, 2 * Math.PI);
      context.fillStyle = "lightblue";
      context.fill();
      //prevents ice cream from dropping down pass the cones
      y = (y + 2) % 150;
      req = requestAnimationFrame(draw);
      context.closePath();
    }
    //stationary cone with pink ice cream
    function drawCone1(color) {
      //pink ice cream
      context.beginPath();
      context.fillStyle = "pink";
      context.arc(165, 150, 20, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      //ice cream cone
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(150, 160);
      context.lineTo(180, 160);
      context.lineTo(165, 220);
      context.closePath();
      context.fill();

      //ice cream cone lines
      context.beginPath();
      context.strokeStyle = "Peru";
      context.lineWidth = 2;
      context.moveTo(150, 160);
      context.lineTo(180, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(155, 185);
      context.lineTo(180, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(159, 200);
      context.lineTo(175, 185);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(150, 160);
      context.lineTo(175, 185);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(163, 160);
      context.lineTo(176, 172);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(170, 200);
      context.lineTo(155, 183);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(153, 172);
      context.lineTo(165, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(165, 220);
      context.lineTo(150, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(165, 220);
      context.lineTo(180, 160);
      context.stroke();
      context.closePath();
    }
    //stationary cone with lavender ice cream
    function drawCone2(color) {
      //lavender ice cream
      context.beginPath();
      var color2 = "lavender";
      context.fillStyle = color2;
      context.arc(100, 150, 20, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      //ice cream cone
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(85, 160);
      context.lineTo(115, 160);
      context.lineTo(100, 220);
      context.closePath();
      context.fill();

      //ice cream cone lines
      context.beginPath();
      context.strokeStyle = "Peru";
      context.lineWidth = 2;
      context.moveTo(85, 160);
      context.lineTo(115, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(90, 185);
      context.lineTo(115, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(94, 200);
      context.lineTo(110, 185);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(85, 160);
      context.lineTo(110, 185);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(98, 160);
      context.lineTo(111, 172);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(105, 200);
      context.lineTo(90, 183);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(89, 172);
      context.lineTo(100, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(100, 220);
      context.lineTo(85, 160);
      context.stroke();

      context.strokeStyle = "Peru";
      context.moveTo(100, 220);
      context.lineTo(115, 160);
      context.stroke();
      context.closePath();
    }
    //stationary counter with silver milkshake cup and straw
    function drawCounter(color) {
      //counter
      context.fillStyle = color;
      context.fillRect(0, 230, canvas.width, 25);

      //ice cream holder
      context.beginPath();
      context.strokeStyle = "gray";
      context.lineWidth = 2;
      context.moveTo(70, 180);
      context.lineTo(190, 180);
      context.lineTo(200, 230);
      context.lineTo(60, 230);
      context.lineTo(70, 180);
      context.lineTo(65, 205);
      context.lineTo(195, 205);
      context.stroke();
      context.closePath();

      //straw
      context.beginPath();
      context.strokeStyle = "red";
      context.lineWidth = 4;
      context.moveTo(240, 170);
      context.lineTo(245, 155);
      context.lineTo(260, 160);
      context.stroke();
      context.closePath();

      //cup part of milkshake glass
      context.beginPath();
      context.strokeStyle = "gray";
      context.fillStyle = "silver";
      context.lineWidth = 2;
      context.moveTo(210, 170);
      context.lineTo(250, 170);
      context.lineTo(240, 218);
      context.lineTo(220, 218);
      context.lineTo(210, 170);
      context.stroke();
      context.fill();
      context.closePath();

      //base of milkshake cup
      context.beginPath();
      context.strokeStyle = "gray";
      context.lineWidth = 2;
      context.moveTo(220, 218);
      context.lineTo(240, 218);
      context.lineTo(250, 230);
      context.lineTo(210, 230);
      context.lineTo(220, 218);
      context.stroke();
      context.closePath();
      context.fill();
    }

    drawMovingIceCream();
    context.save();
    context.restore();
    drawCone1("tan");
    context.save();
    context.restore();
    drawCone2("tan");
    context.save();
    context.restore();
    drawCounter("SaddleBrown");
    context.save();
    context.restore();
  }
  req = requestAnimationFrame(draw);
}

window.onload = setup;
