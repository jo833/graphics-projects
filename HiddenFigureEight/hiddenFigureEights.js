function setup() {
  var cameraCanvas = document.getElementById("cameraCanvas");
  var cameraContext = cameraCanvas.getContext("2d");
  var slider1 = document.getElementById("slider1");
  slider1.value = 0;
  var slider2 = document.getElementById("slider2");
  slider2.value = 0;

  var context = cameraContext;

  function draw() {
    cameraCanvas.width = cameraCanvas.width;

    context.fillStyle = "aliceblue";
    context.fillRect(0, 0, 700, 400);

    var tParam = slider1.value * 0.01;
    var viewAngle = slider2.value * 0.02 * Math.PI;

    function moveToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      context.moveTo(res[0], res[1]);
    }

    function lineToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      context.lineTo(res[0], res[1]);
    }

    function drawTriangle(color, TxU, scale) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      context.beginPath();
      context.fillStyle = color;

      moveToTx([-0.05, -0.05, 0], Tx);
      lineToTx([-0.05, 0.05, 0], Tx);
      lineToTx([0.05, 0.07, 0], Tx);
      context.closePath();
      context.fill();
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
        6 * t * t - 6 * t,
        3 * t * t - 4 * t + 1,
        -6 * t * t + 6 * t,
        3 * t * t - 2 * t,
      ];
    };

    function Cubic(basis, P, t) {
      var b = basis(t);
      var result = vec3.create();
      vec3.scale(result, P[0], b[0]);
      vec3.scaleAndAdd(result, result, P[1], b[1]);
      vec3.scaleAndAdd(result, result, P[2], b[2]);
      vec3.scaleAndAdd(result, result, P[3], b[3]);
      return result;
    }

    var p0 = [0, 0, 0];
    var d0 = [50, 200, -300];
    var p1 = [10, 100, 0];
    var d1 = [100, 400, -300];
    var p2 = [-10, 150, 0];
    var d2 = [100, 100, -300];
    var p3 = [-10, 100, 0];
    var d3 = [100, 100, -300];
    var p4 = [0, 0, 0];
    var d4 = [10, 100, -300];

    var P0 = [p0, d0, p1, d1];
    var P1 = [p1, d1, p2, d2];
    var P2 = [p2, d2, p3, d3];
    var P3 = [p3, d3, p4, d4];

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
      } else {
        var u = t - 3.0;
        return C3(u);
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
      } else {
        var u = t - 3.0;
        return C3prime(u);
      }
    };

    var CameraCurve = function (angle) {
      var distance = 120.0;
      var eye = vec3.create();
      eye[0] = distance * Math.sin(viewAngle);
      eye[1] = 100;
      eye[2] = distance * Math.cos(viewAngle);
      return [eye[0], eye[1], eye[2]];
    };

    function drawPath(t_begin, t_end, intervals, C, Tx, color) {
      context.strokeStyle = color;
      context.lineWidth = 3;
      context.beginPath();
      moveToTx(C(t_begin), Tx);
      for (var i = 1; i <= intervals; i++) {
        var t =
          ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
        lineToTx(C(t), Tx);
      }
      context.stroke();
    }

    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0, 0, 0);
    var upCamera = vec3.fromValues(0, 100, 0);
    var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

    var eyeObserver = vec3.fromValues(500, 300, 500);
    var targetObserver = vec3.fromValues(0, 50, 0);
    var upObserver = vec3.fromValues(0, 1, 0);
    var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

    var Tviewport = mat4.create();
    mat4.fromTranslation(Tviewport, [200, 300, 0]);

    mat4.scale(Tviewport, Tviewport, [100, -100, 1]);

    context = cameraContext;

    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera, -100, 100, -100, 100, -1, 1);
    mat4.perspective(TprojectionCamera, Math.PI / 1.8, 1, -1, 1);

    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver, -120, 120, -120, 120, -1, 1);

    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera, Tviewport, TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera, tVP_PROJ_VIEW_Camera, TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer, Tviewport, TprojectionObserver);
    mat4.multiply(
      tVP_PROJ_VIEW_Observer,
      tVP_PROJ_VIEW_Observer,
      TlookAtObserver
    );

    var Tmodel = mat4.create();
    mat4.fromTranslation(Tmodel, Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1], tangent[0]);
    mat4.rotateZ(Tmodel, Tmodel, angle);

    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(
      tVP_PROJ_VIEW_MOD2_Observer,
      tVP_PROJ_VIEW_Observer,
      eyeCamera
    );
    var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera, TlookAtCamera);
    mat4.multiply(
      tVP_PROJ_VIEW_MOD2_Observer,
      tVP_PROJ_VIEW_MOD2_Observer,
      TlookFromCamera
    );

    context = cameraContext;

    drawPath(0.0, 1.0, 100, C0, tVP_PROJ_VIEW_Camera, "red");
    drawPath(0.0, 1.0, 100, C1, tVP_PROJ_VIEW_Camera, "pink");
    drawPath(0.0, 1.0, 100, C2, tVP_PROJ_VIEW_Camera, "red");
    drawPath(0.0, 1.0, 100, C3, tVP_PROJ_VIEW_Camera, "pink");
    drawTriangle("darkOrchid", tVP_PROJ_VIEW_MOD_Camera, 100.0);
  }

  slider1.addEventListener("input", draw);
  slider2.addEventListener("input", draw);
  draw();
}
window.onload = setup;
