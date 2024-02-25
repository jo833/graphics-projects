function setup() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  var slider1 = document.getElementById("slider1");
  slider1.value = -25;

  function draw() {
    canvas.width = canvas.width;

    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 700, 309);
    context.fillStyle = "SaddleBrown";
    context.fillRect(0, 308, 700, 50);
    context.fillStyle = "DarkRed";
    context.font = "50px Courier New";
    context.fillText("Bucky Coaster", 160, 45);
    // use the sliders to get the angles
    var tParam = slider1.value * 0.01;

    function moveToTx(loc, Tx) {
      var res = vec2.create();
      vec2.transformMat3(res, loc, Tx);
      context.moveTo(res[0], res[1]);
    }

    function lineToTx(loc, Tx) {
      var res = vec2.create();
      vec2.transformMat3(res, loc, Tx);
      context.lineTo(res[0], res[1]);
    }
    function drawHoldingArea(color, Tx) {
      context.beginPath();
      context.fillStyle = color;
      context.fillRect(5, 280, 50, 30);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.fillRect(265, 175, 5, 135);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.fillRect(215, 215, 5, 96);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.fillRect(168, 153, 5, 155);
      context.closePath();
    }
    function drawHoldingAreaOtherSide(color, Tx) {
      context.beginPath();
      context.fillStyle = color;
      context.fillRect(640, 280, 50, 30);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.fillRect(440, 267, 5, 43);
      context.closePath();
      context.beginPath();
      context.fillStyle = "black";
      context.fillRect(350, 280, 5, 29);
      context.closePath();
    }

    function drawObject(color, Tx) {
      context.beginPath();
      context.fillStyle = color;
      moveToTx([-0.09, -0.05], Tx);
      lineToTx([-0.09, 0.05], Tx);
      lineToTx([0.05, 0.05], Tx);
      lineToTx([0.1, 0], Tx);
      lineToTx([0.05, -0.05], Tx);
      context.closePath();
      context.fill();
      context.beginPath();
      context.strokeStyle = "White";
      context.lineWidth = 2;
      moveToTx([-0.09, -0.025], Tx);
      lineToTx([0.08, -0.025], Tx);
      context.closePath;
      context.stroke();
    }

    var Hermite = function (t) {
      return [
        2 * t * t * t - 3 * t * t + 1,
        t * t * t - 2 * t * t + t,
        -2 * t * t * t + 3 * t * t,
        t * t * t - t * t,
      ];
    };

    var HermiteDerivative = function (t) {
      return [
        2 * t * t - 2 * t,
        2 * t * t - 2 * t + 1,
        -1 * t * t + 3 * t,
        3 * t * t - 2 * t,
      ];
    };
    var Hermite2 = function (t) {
      return [
        3 * t * t * t - 3 * t * t + 1,
        t * t * t - 2 * t * t + t,
        -2 * t * t * t + 3 * t * t,
        t * t * t - t * t,
      ];
    };

    var HermiteDerivative2 = function (t) {
      return [
        9 * t * t - 6 * t,
        3 * t * t - 2 * t + 1,
        -6 * t * t + 6 * t,
        3 * t * t - 2 * t,
      ];
    };

    function Cubic(basis, P, t) {
      var b = basis(t);
      var result = vec2.create();
      vec2.scale(result, P[0], b[0]);
      vec2.scaleAndAdd(result, result, P[1], b[1]);
      vec2.scaleAndAdd(result, result, P[2], b[2]);
      vec2.scaleAndAdd(result, result, P[3], b[3]);
      return result;
    }

    var p0 = [0, 0];
    var d0 = [1.5, 0];
    var p1 = [0.8, 1];
    var d1 = [1, 0];
    var p2 = [1.3, 0.7];
    var d2 = [1, 1.2];
    var p3 = [1.8, 0.2];
    var d3 = [0.5, -0.7];
    var p4 = [2.3, 0.6];
    var d4 = [-1, 0.7];
    var p5 = [2.5, 0.2];
    var d5 = [1.5, 0.5];
    var p6 = [1.5, -0.15];
    var d6 = [-2.3, 0];

    var P0 = [p0, d0, p1, d1];
    var P1 = [p1, d1, p2, d2];
    var P2 = [p2, d2, p3, d3];
    var P3 = [p3, d3, p4, d4];
    var P4 = [p4, d4, p5, d5];
    var P5 = [p5, d5, p6, d6];
    var C0 = function (t_) {
      return Cubic(Hermite, P0, t_);
    };
    var C1 = function (t_) {
      return Cubic(Hermite, P1, t_);
    };
    var C2 = function (t_) {
      return Cubic(Hermite, P2, t_);
    };
    var C3 = function (t_) {
      return Cubic(Hermite, P3, t_);
    };
    var C4 = function (t_) {
      return Cubic(Hermite, P4, t_);
    };
    var C5 = function (t_) {
      return Cubic(Hermite2, P5, t_);
    };

    var C0prime = function (t_) {
      return Cubic(HermiteDerivative, P0, t_);
    };
    var C1prime = function (t_) {
      return Cubic(HermiteDerivative, P1, t_);
    };
    var C2prime = function (t_) {
      return Cubic(HermiteDerivative, P2, t_);
    };
    var C3prime = function (t_) {
      return Cubic(HermiteDerivative, P3, t_);
    };
    var C4prime = function (t_) {
      return Cubic(HermiteDerivative, P4, t_);
    };
    var C5prime = function (t_) {
      return Cubic(HermiteDerivative2, P5, t_);
    };

    var Ccomp = function (t) {
      if (t < 1) {
        var u = t;
        return C0(u);
      } else if (t >= 1 && t < 2) {
        var u = t - 1.0;
        return C1(u);
      } else if (t >= 2 && t < 3) {
        var u = t - 2.0;
        return C2(u);
      } else if (t >= 3 && t < 4) {
        var u = t - 3.0;
        return C3(u);
      } else if (t >= 4 && t < 5) {
        var u = t - 4.0;
        return C4(u);
      } else {
        var u = t - 5.0;
        return C5(u);
      }
    };

    var Ccomp_tangent = function (t) {
      if (t < 1) {
        var u = t;
        return C0prime(u);
      } else if (t >= 1 && t < 2) {
        var u = t - 1.0;
        return C1prime(u);
      } else if (t >= 2 && t < 3) {
        var u = t - 2.0;
        return C2prime(u);
      } else if (t >= 3 && t < 4) {
        var u = t - 3.0;
        return C3prime(u);
      } else if (t >= 4 && t < 5) {
        var u = t - 4.0;
        return C4prime(u);
      } else {
        var u = t - 5.0;
        return C5prime(u);
      }
    };

    function drawRollerCoasterTrack(t_begin, t_end, intervals, C, Tx, color) {
      context.strokeStyle = color;
      context.lineWidth = 6;
      context.beginPath();
      moveToTx(C(t_begin), Tx);
      for (var i = 1; i <= intervals; i++) {
        var t =
          ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
        lineToTx(C(t), Tx);
      }
      context.stroke();
    }

    var tracks_to_canvas = mat3.create();
    mat3.fromTranslation(tracks_to_canvas, [50, 300]);
    mat3.scale(tracks_to_canvas, tracks_to_canvas, [150, -150]); // Flip the Y-axis
    drawRollerCoasterTrack(0.0, 1.0, 100, C0, tracks_to_canvas, "Black");
    drawRollerCoasterTrack(0.0, 1.0, 100, C1, tracks_to_canvas, "Grey");
    drawRollerCoasterTrack(0.0, 1.0, 100, C2, tracks_to_canvas, "Black");
    drawRollerCoasterTrack(0.0, 1.0, 100, C3, tracks_to_canvas, "Grey");
    drawRollerCoasterTrack(0.0, 1.0, 100, C4, tracks_to_canvas, "Black");
    drawRollerCoasterTrack(0.0, 1.0, 100, C5, tracks_to_canvas, "Grey");
    var rollarcoaster_cart_to_track = mat3.create();
    mat3.fromTranslation(rollarcoaster_cart_to_track, Ccomp(tParam));
    var rollercoaster_cart_to_canvas = mat3.create();

    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1], tangent[0]);

    mat3.rotate(
      rollarcoaster_cart_to_track,
      rollarcoaster_cart_to_track,
      angle
    );
    mat3.multiply(
      rollercoaster_cart_to_canvas,
      tracks_to_canvas,
      rollarcoaster_cart_to_track
    );
    drawObject("red", rollercoaster_cart_to_canvas);
    var coasterHolder = mat3.create();
    mat3.fromTranslation(coasterHolder, [100, 300]);
    var coasterHolder_to_canvas = mat3.create();
    mat3.multiply(coasterHolder_to_canvas, tracks_to_canvas, coasterHolder);
    drawHoldingArea("white", coasterHolder_to_canvas);
    var coasterHolder2 = mat3.create();
    mat3.fromTranslation(coasterHolder2, [100, 300]);
    var coasterHolder2_to_canvas = mat3.create();
    mat3.multiply(coasterHolder2_to_canvas, tracks_to_canvas, coasterHolder2);
    drawHoldingAreaOtherSide("white", coasterHolder2_to_canvas);
  }

  slider1.addEventListener("input", draw);
  draw();
}
window.onload = setup;
