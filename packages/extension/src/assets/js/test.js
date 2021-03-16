/*
  This is a merge of multiple files.
  I will put the source code on github after I refine the structure a bit.
*/
if (!Animations) var Animations = new Object();

Animations.InfinityLoop = function () {
  var loops = [];
  var loopsCount = 70;

  for (var i = 1; i <= loopsCount; i++) {
    loops.push(new Objects.InfiniteLoop());
  }

  this.init = function (application) {
    //Initialize the scene objects for this animation
    for (var i = 0; i < loops.length; i++) {
      application.getScene().add(loops[i].getObject3D());
    }
  };

  this.tick = function (timestamp, application) {
    for (var i = 0; i < loops.length; i++) {
      loops[i].update(timestamp);
    }
  };
};
/**
 * Created by ionescusilviuciprian on 11/09/15.
 */
function Animation(app) {
  console.log(app);

  if (!app) throw "Animation needs an app to bind to.";

  var tickCallbacks = new Array();
  var runTickCallbacks = function (timestamp) {
    for (i in tickCallbacks) {
      tickCallbacks[i].tick(timestamp, app);
    }
  };

  var render = function (timestamp) {
    runTickCallbacks(timestamp);
    requestAnimationFrame(render);

    app.getControl().update();
    app.getRenderer().render(app.getScene(), app.getCamera());
  };

  this.addTickCallback = function (AnimationClass) {
    tickCallbacks.push(AnimationClass);
    if (AnimationClass.init) AnimationClass.init(app);
  };

  this.render = function () {
    render();
  };

  return this;
}
function App() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    precision: "highp",
    devicePixelRatio: window.devicePixelRatio || 1,
  });

  var self = this;

  pixelRatio = window.devicePixelRatio || 1;

  renderer.setSize(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  $("#content img").remove();
  document.getElementById("content").appendChild(renderer.domElement);
  renderer.domElement.style.width = window.innerWidth + "px";
  renderer.domElement.style.height = window.innerHeight + "px";

  // scene.fog = new THREE.Fog(0xffffff, 0, 5);
  // scene.fog.color.setHex( 0xe8dabe );

  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.minDistance = 0;
  controls.maxDistance = 500;

  // controls.enableDamping = true;
  // controls.dampingFactor = 0.25;
  //controls.enableZoom = true;

  this.getScene = function () {
    return scene;
  };
  this.getCamera = function () {
    return camera;
  };
  this.getRenderer = function () {
    return renderer;
  };
  this.getApp = function () {
    return self;
  };
  this.getControl = function () {
    return controls;
  };

  return self;
}

App.prototype.renderWorldPlane = function () {
  //var earth = new WorldPlane(this.getScene());
  var lighingSystem = new WorldLight(this.getScene());
  var animation = new Animation(this.getApp());

  animation.addTickCallback(new Animations.InfinityLoop());
  //animation.addTickCallback(new Animations.InfiniteHall());
  //animation.addTickCallback(new Animations.CameraWiggle());
  animation.render();
};

App.prototype.initWorld = function () {
  this.renderWorldPlane();
  this.getCamera().position.set(0, -200, 100);
  this.getCamera().lookAt(new THREE.Vector3(0, 0, 0));
  //this.getCamera().rotation.z = (5*Math.PI/180);
};
if (!Objects) var Objects = new Object();

function pow(val, exp) {
  var res = 1;
  for (i = 0; i < exp; i++) {
    res = res * val;
  }
  return res;
}

function square(x) {
  return x * x;
}

function cassinian_oval(t, a, b) {
  var M =
    2 * pow(a, 2) * Math.cos(2 * t) +
    2 * Math.sqrt(pow(-a, 4) + pow(b, 4) + pow(a, 4) * pow(Math.cos(2 * t), 2));

  var M =
    2 * Math.sqrt(pow(b, 4) - pow(a, 4) + pow(a, 4) * pow(Math.cos(2 * t), 2)) +
    2 * pow(a, 2) * Math.cos(2 * t);

  var x = Math.sqrt(M / 2) * Math.cos(t);
  var y = Math.sqrt(M / 2) * Math.sin(t);

  return [x, y];
}

function leminescate_of_bernoulli(t, a) {
  var x = (a * Math.sqrt(2) * Math.cos(t)) / (square(Math.sin(t)) + 1);
  var y =
    (a * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (square(Math.sin(t)) + 1);

  return [x, y];
}

Objects.InfiniteLoop = function () {
  var granularity = 80;
  var minVisibleRatio = 3;
  var maxAdditionalVisibleRatio = 10;
  var obj3d = new THREE.Object3D(); //Main container
  //colors 0x556600
  var coloroptions = [0x8b8091, 0xfd976f, 0xfbd584, 0xc0cab6, 0xf8ebd4];
  var coloroptions = [0x556600, 0x616646, 0x46665a, 0x465d66, 0x66464c];

  this.last_tick = 0;
  this.speed = 1000 / 60;
  this.points = [];
  this.quads = [];

  var opacity = Math.round() * 0.6 + 0.4;

  var pickedColor = Math.round(Math.random() * (coloroptions.length - 1));

  extruded_shape_material = new THREE.MeshBasicMaterial({
    color: coloroptions[pickedColor],
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    wireframe: false,
  });

  extruded_shape_material.side = THREE.DoubleSide;

  var a = 30 + Math.round(Math.random() * 20);
  //var b=30;
  var fullInterval = 2 * Math.PI;
  var woobleStrength = Math.floor((Math.random() * 20) / 4);
  var woobleDisplace = 0; // Math.random()*Math.PI*2;

  for (t = 0; t <= fullInterval; t += fullInterval / granularity) {
    //var cassiniPoint = cassinian_oval(t, a, b);
    var cassiniPoint = leminescate_of_bernoulli(t, a);
    cassiniPoint[1] *= 1.4;
    if (cassiniPoint[0] != cassiniPoint[1])
      yValue = Math.sin(t * woobleStrength + woobleDisplace) * 10;
    this.points.push(
      new THREE.Vector3(cassiniPoint[0], yValue, cassiniPoint[1])
    );
  }

  var percentDisplacement = Math.random();
  var lastP2 = null;
  for (i = 0; i < this.points.length; i++) {
    var first_point = this.points[i];
    var next_point = this.points[i + 1];

    if (i == this.points.length - 1) {
      next_point = this.points[0];
    }

    var p0 = new THREE.Vector3(first_point.x, first_point.y - 2, first_point.z);
    var p1 = new THREE.Vector3(next_point.x, next_point.y - 2, next_point.z);

    var percent = i / (this.points.length / 100) / 100;
    percent -= percentDisplacement;

    var displaceSine = Math.PI * 2 * percent;
    var yDisplacement = Math.sin(displaceSine) * (percentDisplacement * 10);
    var zDisplacement = Math.cos(displaceSine) * (percentDisplacement * 5);
    var xDisplacement = Math.sin(displaceSine) * (percentDisplacement * 10);

    var p2 = new THREE.Vector3(
      p1.x + xDisplacement,
      p1.y + yDisplacement,
      p1.z + zDisplacement
    );
    var p3 = new THREE.Vector3(
      p0.x + xDisplacement,
      p0.y + yDisplacement,
      p0.z + zDisplacement
    );
    if (lastP2 != null) {
      p3 = lastP2;
    }
    lastP2 = p2;

    this.quads.push(
      new THREE.Mesh(new Quad(p0, p1, p2, p3), extruded_shape_material)
    );
  }

  var quadsCount = this.quads.length;

  this.ribbonLength = Math.floor(quadsCount / minVisibleRatio);
  this.curentRibbonIndex = Math.floor(Math.random() * quadsCount);

  this.ribbon = new THREE.Object3D();
  for (i = 0; i < this.ribbonLength; i++) {
    var extractedQuad = this.quads[this.curentRibbonIndex + i];
    if (this.curentRibbonIndex + i < 0)
      extractedQuad = this.quads[
        this.quads.length - this.curentRibbonIndex + i
      ];
    if (extractedQuad) this.ribbon.add(extractedQuad);
  }

  /* Draw a line for debugging purposes */
  // var control_line_material = new THREE.LineBasicMaterial({color: 0xff0000});
  // var infinity_geometry = new THREE.Geometry();
  // infinity_geometry.vertices=this.points;
  // var line = new THREE.Line( infinity_geometry, control_line_material );
  // obj3d.add(line);

  /* Add the ribbon object to the main object. It will be composed outside the scope of this constructor*/
  obj3d.add(this.ribbon);

  /* Add everything inside the object */
  this.obj3d = obj3d;
  return this;
};

Objects.InfiniteLoop.prototype.getObject3D = function () {
  return this.obj3d;
};

Objects.InfiniteLoop.prototype.update = function (tick) {
  if (tick - this.last_tick > this.speed) {
    this.last_tick = tick;
    //this.ribbonLength = Math.floor(quadsCount/minVisibleRatio);
    //this.curentRibbonIndex = Math.floor(Math.random()*quadsCount);

    var lastQuad = this.ribbon.children.shift();
    lastQuad.remove();

    this.curentRibbonIndex += 1;
    if (this.curentRibbonIndex >= this.quads.length) this.curentRibbonIndex = 0;
    this.ribbon.add(this.quads[this.curentRibbonIndex]);
  }
};

var Quad = function (p0, p1, p2, p3) {
  var scope = this;

  THREE.Geometry.call(this);

  scope.vertices.push(p0);
  scope.vertices.push(p1);
  scope.vertices.push(p2);
  scope.vertices.push(p3);

  f3(2, 1, 0);
  f3(0, 3, 2);

  //this.computeCentroids();
  //this.computeFaceNormals();
  //this.sortFacesByMaterial();

  function f3(a, b, c) {
    scope.faces.push(new THREE.Face3(a, b, c));
  }
};

Quad.prototype = new THREE.Geometry();
Quad.prototype.constructor = Quad;

function WorldLight(appScene) {
  if (!appScene) throw "WorldLight needs a scene to bind to.";

  //add a simple ambient light
  var ambientLight = new THREE.AmbientLight(0xffffff);

  appScene.add(ambientLight);

  // var pointLight = new THREE.PointLight(0xffffff, 100, 200);
  // pointLight.position.set(0,100,100);
  // appScene.add(pointLight);

  // var bottomPointLight = new THREE.PointLight(0xffffff, 100, -200);
  // bottomPointLight.position.set(0,100,100);
  // appScene.add(bottomPointLight);

  return this;
}
function WorldPlane(appScene) {
  if (!appScene) throw "WorldPlane needs a scene to bind to.";

  var planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x091838,
    wireframe: false,
  });
  var simplePlane = new THREE.Mesh(planeGeometry, planeMaterial);

  appScene.add(simplePlane);

  return this;
}
$(window).load(function () {
  var app = new App();

  app.initWorld();

  main = app;

  (function () {
    var script = document.createElement("script");
    script.onload = function () {
      var stats = new Stats();
      stats.domElement.style.cssText =
        "position:fixed;left:0;top:0;z-index:10000";
      document.body.appendChild(stats.domElement);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = "//rawgit.com/mrdoob/stats.js/master/build/stats.min.js";
    document.head.appendChild(script);
  })();
});
