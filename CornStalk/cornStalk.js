function setup() {
  "use strict";
  var canvas = document.getElementById("myCanvas");
  //creation of sliders
  var slider1 = document.getElementById("slider1");
  slider1.value = -180;

  var slider2 = document.getElementById("slider2");
  slider2.value = 0;

  var slider3 = document.getElementById("slider3");
  slider3.value = 0;

  var slider4 = document.getElementById("slider4");
  slider4.value = -180;

  var slider5 = document.getElementById("slider5");
  slider5.value = 0;

  var slider6 = document.getElementById("slider6");
  slider6.value = 0;
  var slider7 = document.getElementById("slider7");

  function draw() {
    var context = canvas.getContext("2d");
    canvas.width = canvas.width;
    //slider values
    var corn1 = -1 * slider1.value * 0.005 * Math.PI;
    var cornHusk1 = -1 * slider2.value * 0.005 * Math.PI;
    var cornHusk2 = slider3.value * 0.005 * Math.PI;
    var corn2 = slider4.value * 0.005 * Math.PI;
    var cornHusk3 = -1 * slider5.value * 0.005 * Math.PI;
    var cornHusk4 = slider6.value * 0.005 * Math.PI;

    canvas.width = canvas.width;
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 300, 250);
    context.fillStyle = "SaddleBrown";
    context.fillRect(0, 250, 300, 50);
    context.fillStyle = "DarkGreen";
    context.font = "25px Courier New";
    context.fillText("Fresh Corn!", 65, 330);

    function moveToTx(x, y, Tx) {
      var res = vec2.create();
      vec2.transformMat3(res, [x, y], Tx);
      context.moveTo(res[0], res[1]);
    }

    function lineToTx(x, y, Tx) {
      var res = vec2.create();
      vec2.transformMat3(res, [x, y], Tx);
      context.lineTo(res[0], res[1]);
    }
    //creation of the corn stalk
    function cornStalk(color, Tx) {
      //three corn tassels
      context.beginPath();
      context.strokeStyle = "GoldenRod";
      context.lineWidth = 1;
      moveToTx(1.5, -20, Tx);
      lineToTx(1.5, 10, Tx);
      context.closePath;
      context.stroke();
      context.beginPath();
      context.strokeStyle = "GoldenRod";
      context.lineWidth = 1;
      moveToTx(-5, -10, Tx);
      lineToTx(1, 10, Tx);
      context.closePath;
      context.stroke();
      context.beginPath();
      context.strokeStyle = "GoldenRod";
      context.lineWidth = 1;
      moveToTx(7, -10, Tx);
      lineToTx(2, 10, Tx);
      context.closePath;
      context.stroke();

      //corn stalk body
      context.beginPath();
      context.fillStyle = color;
      moveToTx(0, 10, Tx);
      lineToTx(3, 10, Tx);
      lineToTx(7, 200, Tx);
      lineToTx(-5, 200, Tx);
      context.closePath();
      context.fill();

      //creates outline of corn stalk
      context.strokeStyle = "DarkGreen";
      context.lineWidth = 1.5;
      moveToTx(0, 30, Tx);
      moveToTx(100, 500, Tx);
      context.stroke();
    }
    //creation of corn
    function corn(color, Tx) {
      context.beginPath();
      context.fillStyle = color;
      moveToTx(0, 10, Tx);
      lineToTx(5, 10, Tx);
      lineToTx(10, 30, Tx);
      lineToTx(10, 180, Tx);
      lineToTx(5, 200, Tx);
      lineToTx(0, 200, Tx);
      lineToTx(-5, 180, Tx);
      lineToTx(-5, 30, Tx);
      //    context.lineTo;
      context.closePath();
      context.fill();

      //creates outline of corn
      context.strokeStyle = "GoldenRod";
      context.lineWidth = 2;
      moveToTx(0, 30, Tx);
      moveToTx(100, 500, Tx);
      context.stroke();
    }
    //the outer lining of the corn
    function cornHusk(color, Tx) {
      context.beginPath();
      context.fillStyle = color;
      moveToTx(0, 30, Tx);
      lineToTx(0, 220, Tx);
      lineToTx(10, 130, Tx);
      lineToTx(10, 0, Tx);
      context.fill();

      //creates outline of each husk
      context.strokeStyle = "DarkGreen";
      context.lineWidth = 2;
      moveToTx(0, 30, Tx);
      moveToTx(100, 500, Tx);
      context.stroke();
    }

    //first stalk of corn
    var firstCornToCanvas = mat3.create();
    mat3.fromTranslation(firstCornToCanvas, [70, 50]);
    cornStalk("green", firstCornToCanvas);

    //start of bottom corn on stalk
    var bottomCorntoCornStalk = mat3.create();
    mat3.fromTranslation(bottomCorntoCornStalk, [0, 160]);
    mat3.rotate(bottomCorntoCornStalk, bottomCorntoCornStalk, corn1);
    mat3.scale(bottomCorntoCornStalk, bottomCorntoCornStalk, [1, 0.3]);
    var bottomCorntoCanvas = mat3.create();
    mat3.multiply(bottomCorntoCanvas, firstCornToCanvas, bottomCorntoCornStalk);
    corn("gold", bottomCorntoCanvas);
    var bottomCorntoCornHusk = mat3.create();
    mat3.fromTranslation(bottomCorntoCornHusk, [12, 0]);

    mat3.rotate(bottomCorntoCornHusk, bottomCorntoCornHusk, cornHusk1);
    mat3.scale(bottomCorntoCornHusk, bottomCorntoCornHusk, [-0.8, 0.8]);
    var bottomCornHuskToCanvas = mat3.create();
    mat3.multiply(
      bottomCornHuskToCanvas,
      bottomCorntoCanvas,
      bottomCorntoCornHusk
    );
    cornHusk("green", bottomCornHuskToCanvas);

    var bottomCorntoCornHusk2 = mat3.create();
    mat3.fromTranslation(bottomCorntoCornHusk2, [-6, 0]);

    mat3.rotate(bottomCorntoCornHusk2, bottomCorntoCornHusk2, cornHusk2);
    mat3.scale(bottomCorntoCornHusk2, bottomCorntoCornHusk2, [0.8, 0.8]);
    var bottomCornHuskToCanvas2 = mat3.create();
    mat3.multiply(
      bottomCornHuskToCanvas2,
      bottomCorntoCanvas,
      bottomCorntoCornHusk2
    );
    cornHusk("green", bottomCornHuskToCanvas2);

    //start of the top corn on the stalk
    var topCorntoCornStalk = mat3.create();
    mat3.fromTranslation(topCorntoCornStalk, [0, 50]);

    mat3.rotate(topCorntoCornStalk, topCorntoCornStalk, corn1);
    mat3.scale(topCorntoCornStalk, topCorntoCornStalk, [0.7, 0.2]);
    var topCorntoCanvas = mat3.create();
    mat3.multiply(topCorntoCanvas, firstCornToCanvas, topCorntoCornStalk);
    corn("gold", topCorntoCanvas);

    var topCorntoCornHusk = mat3.create();
    mat3.fromTranslation(topCorntoCornHusk, [12, 0]);

    mat3.rotate(topCorntoCornHusk, topCorntoCornHusk, cornHusk1);
    mat3.scale(topCorntoCornHusk, topCorntoCornHusk, [-0.8, 0.8]);
    var topCornHuskToCanvas1 = mat3.create();
    mat3.multiply(topCornHuskToCanvas1, topCorntoCanvas, topCorntoCornHusk);
    cornHusk("green", topCornHuskToCanvas1);

    var topCorntoCornHusk2 = mat3.create();
    mat3.fromTranslation(topCorntoCornHusk2, [-7, 0]);

    mat3.rotate(topCorntoCornHusk2, topCorntoCornHusk2, cornHusk2);
    mat3.scale(topCorntoCornHusk2, topCorntoCornHusk2, [0.8, 0.8]);
    var topCornHuskToCanvas2 = mat3.create();
    mat3.multiply(topCornHuskToCanvas2, topCorntoCanvas, topCorntoCornHusk2);
    cornHusk("green", topCornHuskToCanvas2);

    //start of middle corn on the stalk
    var middleCorntoCornStalk = mat3.create();
    mat3.fromTranslation(middleCorntoCornStalk, [5, 100]);

    mat3.rotate(middleCorntoCornStalk, middleCorntoCornStalk, -1 * corn1);
    mat3.scale(middleCorntoCornStalk, middleCorntoCornStalk, [-1, 0.25]);
    var middleCorntoCanvas = mat3.create();
    mat3.multiply(middleCorntoCanvas, firstCornToCanvas, middleCorntoCornStalk);
    corn("gold", middleCorntoCanvas);

    var middleCorntoCornHusk1 = mat3.create();
    mat3.fromTranslation(middleCorntoCornHusk1, [12, 0]);

    mat3.rotate(middleCorntoCornHusk1, middleCorntoCornHusk1, cornHusk1);
    mat3.scale(middleCorntoCornHusk1, middleCorntoCornHusk1, [-0.8, 0.8]);
    var middleCornHuskToCanvas1 = mat3.create();
    mat3.multiply(
      middleCornHuskToCanvas1,
      middleCorntoCanvas,
      middleCorntoCornHusk1
    );
    cornHusk("green", middleCornHuskToCanvas1);

    var middleCorntoCornHusk2 = mat3.create();
    mat3.fromTranslation(middleCorntoCornHusk2, [-6, 0]);

    mat3.rotate(middleCorntoCornHusk2, middleCorntoCornHusk2, cornHusk2);
    mat3.scale(middleCorntoCornHusk2, middleCorntoCornHusk2, [0.8, 0.8]);
    var middleCornHuskToCanvas2 = mat3.create();
    mat3.multiply(
      middleCornHuskToCanvas2,
      middleCorntoCanvas,
      middleCorntoCornHusk2
    );
    cornHusk("green", middleCornHuskToCanvas2);

    //second stalk of corn
    var secondCornToCanvas = mat3.create();
    mat3.fromTranslation(secondCornToCanvas, [190, 50]);

    cornStalk("green", secondCornToCanvas);

    //start of bottom corn on the stalk
    var secondBottomCorntoCornStalk = mat3.create();
    mat3.fromTranslation(secondBottomCorntoCornStalk, [5, 160]);

    mat3.rotate(
      secondBottomCorntoCornStalk,
      secondBottomCorntoCornStalk,
      corn2
    );
    mat3.scale(
      secondBottomCorntoCornStalk,
      secondBottomCorntoCornStalk,
      [1, 0.3]
    );
    var secondBottomCorntoCanvas = mat3.create();
    mat3.multiply(
      secondBottomCorntoCanvas,
      secondCornToCanvas,
      secondBottomCorntoCornStalk
    );
    corn("gold", secondBottomCorntoCanvas);
    var secondBottomCorntoCornHusk1 = mat3.create();
    mat3.fromTranslation(secondBottomCorntoCornHusk1, [12, 0]);

    mat3.rotate(
      secondBottomCorntoCornHusk1,
      secondBottomCorntoCornHusk1,
      cornHusk3
    );
    mat3.scale(
      secondBottomCorntoCornHusk1,
      secondBottomCorntoCornHusk1,
      [-0.8, 0.8]
    );
    var secondBottomCornHuskToCanvas1 = mat3.create();
    mat3.multiply(
      secondBottomCornHuskToCanvas1,
      secondBottomCorntoCanvas,
      secondBottomCorntoCornHusk1
    );
    cornHusk("green", secondBottomCornHuskToCanvas1);

    var secondBottomCorntoCornHusk2 = mat3.create();
    mat3.fromTranslation(secondBottomCorntoCornHusk2, [-6, 0]);

    mat3.rotate(
      secondBottomCorntoCornHusk2,
      secondBottomCorntoCornHusk2,
      cornHusk4
    );
    mat3.scale(
      secondBottomCorntoCornHusk2,
      secondBottomCorntoCornHusk2,
      [0.8, 0.8]
    );
    var secondBottomCornHuskToCanvas2 = mat3.create();
    mat3.multiply(
      secondBottomCornHuskToCanvas2,
      secondBottomCorntoCanvas,
      secondBottomCorntoCornHusk2
    );
    cornHusk("green", secondBottomCornHuskToCanvas2);

    //start of top corn on the stalk

    var secondTopCorntoCornStalk = mat3.create();
    mat3.fromTranslation(secondTopCorntoCornStalk, [2, 50]);

    mat3.rotate(secondTopCorntoCornStalk, secondTopCorntoCornStalk, corn2);
    mat3.scale(secondTopCorntoCornStalk, secondTopCorntoCornStalk, [0.7, 0.2]);
    var secondTopCorntoCanvas = mat3.create();
    mat3.multiply(
      secondTopCorntoCanvas,
      secondCornToCanvas,
      secondTopCorntoCornStalk
    );
    corn("gold", secondTopCorntoCanvas);

    var secondTopCorntoCornHusk1 = mat3.create();
    mat3.fromTranslation(secondTopCorntoCornHusk1, [12, 0]);

    mat3.rotate(secondTopCorntoCornHusk1, secondTopCorntoCornHusk1, cornHusk3);
    mat3.scale(secondTopCorntoCornHusk1, secondTopCorntoCornHusk1, [-0.8, 0.8]);
    var secondTopCornHuskToCanvas1 = mat3.create();
    mat3.multiply(
      secondTopCornHuskToCanvas1,
      secondTopCorntoCanvas,
      secondTopCorntoCornHusk1
    );
    cornHusk("green", secondTopCornHuskToCanvas1);
    var secondTopCorntoCornHusk2 = mat3.create();
    mat3.fromTranslation(secondTopCorntoCornHusk2, [-6, 0]);

    mat3.rotate(secondTopCorntoCornHusk2, secondTopCorntoCornHusk2, cornHusk4);
    mat3.scale(secondTopCorntoCornHusk2, secondTopCorntoCornHusk2, [0.8, 0.8]);
    var secondTopCornHuskToCanvas2 = mat3.create();
    mat3.multiply(
      secondTopCornHuskToCanvas2,
      secondTopCorntoCanvas,
      secondTopCorntoCornHusk2
    );
    cornHusk("green", secondTopCornHuskToCanvas2);

    //start of the middle corn on the stalk

    var secondMiddleCorntoCornStalk = mat3.create();
    mat3.fromTranslation(secondMiddleCorntoCornStalk, [-2, 100]);

    mat3.rotate(
      secondMiddleCorntoCornStalk,
      secondMiddleCorntoCornStalk,
      -1 * corn2
    );
    mat3.scale(
      secondMiddleCorntoCornStalk,
      secondMiddleCorntoCornStalk,
      [-1, 0.25]
    );
    var secondMiddleCorntoCanvas = mat3.create();
    mat3.multiply(
      secondMiddleCorntoCanvas,
      secondCornToCanvas,
      secondMiddleCorntoCornStalk
    );
    corn("gold", secondMiddleCorntoCanvas);
    var secondMiddleCorntoCornHusk1 = mat3.create();
    mat3.fromTranslation(secondMiddleCorntoCornHusk1, [10, 0]);

    mat3.rotate(
      secondMiddleCorntoCornHusk1,
      secondMiddleCorntoCornHusk1,
      cornHusk3
    );
    mat3.scale(
      secondMiddleCorntoCornHusk1,
      secondMiddleCorntoCornHusk1,
      [-0.8, 0.8]
    );
    var secondMiddleCornHuskToCanvas1 = mat3.create();
    mat3.multiply(
      secondMiddleCornHuskToCanvas1,
      secondMiddleCorntoCanvas,
      secondMiddleCorntoCornHusk1
    );
    cornHusk("green", secondMiddleCornHuskToCanvas1);
    var secondMiddleCorntoCornHusk2 = mat3.create();
    mat3.fromTranslation(secondMiddleCorntoCornHusk2, [-6, 0]);

    mat3.rotate(
      secondMiddleCorntoCornHusk2,
      secondMiddleCorntoCornHusk2,
      cornHusk4
    );
    mat3.scale(
      secondMiddleCorntoCornHusk2,
      secondMiddleCorntoCornHusk2,
      [0.8, 0.8]
    );
    var secondMiddleCornHuskToCanvas2 = mat3.create();
    mat3.multiply(
      secondMiddleCornHuskToCanvas2,
      secondMiddleCorntoCanvas,
      secondMiddleCorntoCornHusk2
    );
    cornHusk("green", secondMiddleCornHuskToCanvas2);
  }
  slider1.addEventListener("input", draw);
  slider2.addEventListener("input", draw);
  slider3.addEventListener("input", draw);
  slider4.addEventListener("input", draw);
  slider5.addEventListener("input", draw);
  slider6.addEventListener("input", draw);
  draw();
}
window.onload = setup;
