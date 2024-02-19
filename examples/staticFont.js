import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// 缓存
THREE.Cache.enabled = true;

let container;

let camera, cameraTarget, scene, renderer;

let group, textMesh1, textMesh2, textGeo, materials;

let text = "three.js",
  bevelEnabled = true,
  font = undefined,
  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = "bold"; // normal bold

const height = 20,
  size = 70,
  hover = 30,
  curveSegments = 4, // 曲线段
  bevelThickness = 2, // 斜面厚度
  bevelSize = 1.5; // 斜面尺寸

const mirror = true;

/**
 * helvetiker：Helvetica 字体，一种常见的无衬线字体。
optimer：Optimer 字体，一种常见的衬线字体。
gentilis：Gentilis 字体，一种常见的衬线字体。
"droid/droid_sans"：Droid Sans 字体，一种常见的无衬线字体。
"droid/droid_serif"：Droid Serif 字体，一种常见的衬线字体。
 */
const fontMap = {
  helvetiker: 0,
  optimer: 1,
  gentilis: 2,
  "droid/droid_sans": 3,
  "droid/droid_serif": 4,
};

const weightMap = {
  regular: 0,
  bold: 1,
};

const reverseFontMap = [];
const reverseWeightMap = [];

for (const i in fontMap) reverseFontMap[fontMap[i]] = i;
for (const i in weightMap) reverseWeightMap[weightMap[i]] = i;

init();
animate()

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1500
  );
  camera.position.set(0, 400, 700);
  // 三维向量（Vector3）
  cameraTarget = new THREE.Vector3(0, 150, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.fog = new THREE.Fog(0x000000, 250, 1400);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
  pointLight.color.setHSL(Math.random(), 1, 0.5);
  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }),
    new THREE.MeshPhongMaterial({ color: 0xffffff }),
  ];

  group = new THREE.Group();
  group.position.y = 100;

  scene.add(group);

  loadFont();

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
    })
  );

  scene.add(plane);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  function createText() {
    textGeo = new TextGeometry(text, {
      font: font,
      size: size,
      height: height,
      curveSegments: curveSegments,

      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled,
    });
    textGeo.computeBoundingBox();

    const centerOffset =
    -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    textMesh1 = new THREE.Mesh(textGeo, materials);

    textMesh1.position.x = centerOffset;
    textMesh1.position.y = hover;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;
    group.add(textMesh1);

    if (mirror) {
      textMesh2 = new THREE.Mesh(textGeo, materials);

      textMesh2.position.x = centerOffset;
      textMesh2.position.y = -hover;
      textMesh2.position.z = height;

      textMesh2.rotation.x = Math.PI;
      textMesh2.rotation.y = Math.PI * 2;

      group.add(textMesh2);
    }
  }

  function refreshText() {
    group.remove(textMesh1);
    if (mirror) group.remove(textMesh2);
    if (!text) return;
    createText();
  }

  function loadFont() {
    const loader = new FontLoader();
    loader.load(
      "./fonts/" + fontName + "_" + fontWeight + ".typeface.json",
      function (response) {
        font = response;
        refreshText();
      }
    );
  }
}

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {

  camera.lookAt(cameraTarget);

  renderer.clear();
  renderer.render(scene, camera);
}

