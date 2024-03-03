import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";

let container, stats;

let camera, scene, renderer;

let mouseX = 0,
  mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.getElementById("container");

  camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 1800;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 0, 1);
  scene.add(light);

  // shadow

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const context = canvas.getContext("2d");
  // 径向渐变填充
  /**
   * createRadialGradient: 创建一个径向渐变对象。
参数：
第一个是渐变中心点的 x 坐标 (相对于画布宽度)。
第二个是渐变中心点的 y 坐标 (相对于画布高度)。
第三个是内圆半径 (0 表示渐变从一点开始)。
第四个是渐变终点的 x 坐标。
第五个是渐变终点的 y 坐标。
第六个是渐变终点的半径 (决定渐变覆盖的范围)。
   */
  const gradient = context.createRadialGradient(
    canvas.width / 3,
    canvas.height / 3,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  // 底部阴影
  gradient.addColorStop(0.1, "rgba(210,210,210,1)");
  gradient.addColorStop(1, "rgba(255,255,255,1)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // 投射影子的材质和几何体
  // 创建画布纹理
  const shadowTexture = new THREE.CanvasTexture(canvas);
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture });
  const shadowGeo = new THREE.PlaneGeometry(300, 300, 1, 1);

  let shadowMesh;

  shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
  shadowMesh.position.y = -250;
  shadowMesh.rotation.x = -Math.PI / 2;
  scene.add(shadowMesh);

  shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
  shadowMesh.position.y = -250;
  shadowMesh.position.x = -400;
  shadowMesh.rotation.x = -Math.PI / 2;
  scene.add(shadowMesh);

  shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
  shadowMesh.position.y = -250;
  shadowMesh.position.x = 400;
  shadowMesh.rotation.x = -Math.PI / 2;
  scene.add(shadowMesh);

  const radius = 200;

  // 二十面体几何
  // const geometry1 = new THREE.IcosahedronGeometry(radius, 1);

  // 八面体几何
  const geometry1 = new THREE.OctahedronGeometry(radius, 6);

  // 圆
  // const geometry1 = new THREE.CircleGeometry(150, 64);

  // 几何体中顶点的数量
  const count = geometry1.attributes.position.count;
  // 存储每个顶点的颜色信息
  geometry1.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(count * 3), 3)
  );

  const geometry2 = geometry1.clone();
  const geometry3 = geometry1.clone();

  const color = new THREE.Color();
  const positions1 = geometry1.attributes.position;
  const positions2 = geometry2.attributes.position;
  const positions3 = geometry3.attributes.position;
  const colors1 = geometry1.attributes.color;
  const colors2 = geometry2.attributes.color;
  const colors3 = geometry3.attributes.color;

  for (let i = 0; i < count; i++) {
    color.setHSL(
      (positions1.getY(i) / radius + 1) / 2,
      1.0,
      0.5,
      THREE.SRGBColorSpace
    );
    colors1.setXYZ(i, color.r, color.g, color.b);

    color.setHSL(
      0,
      (positions2.getY(i) / radius + 1) / 2,
      0.5,
      THREE.SRGBColorSpace
    );
    colors2.setXYZ(i, color.r, color.g, color.b);

    color.setRGB(
      1,
      0.8 - (positions3.getY(i) / radius + 1) / 2,
      0,
      THREE.SRGBColorSpace
    );
    colors3.setXYZ(i, color.r, color.g, color.b);
  }

  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
    vertexColors: true,
    shininess: 0,
  });

  // 镜面高光的闪亮表面的材质

  // 创建线框材质：
  // wireframeMaterial: 创建一个 THREE.MeshBasicMaterial 材质，用于绘制线框。
  // color: 设置线框颜色为黑色 (0x000000)。
  // wireframe: 启用线框模式，只绘制线段。
  // transparent: 设置线框为半透明，让主网格可以透过线框看到。
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true,
  });

  let mesh = new THREE.Mesh(geometry1, material);
  let wireframe = new THREE.Mesh(geometry1, wireframeMaterial);
  mesh.add(wireframe);
  mesh.position.x = -400;
  mesh.rotation.x = -1.87;
  scene.add(mesh);

  mesh = new THREE.Mesh(geometry2, material);
  wireframe = new THREE.Mesh(geometry2, wireframeMaterial);
  mesh.add(wireframe);
  mesh.position.x = 400;
  scene.add(mesh);

  mesh = new THREE.Mesh(geometry3, material);
  wireframe = new THREE.Mesh(geometry3, wireframeMaterial);
  mesh.add(wireframe);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  stats = new Stats();
  container.appendChild(stats.dom);

  document.addEventListener("mousemove", onDocumentMouseMove);

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
