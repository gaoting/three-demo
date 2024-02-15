import * as THREE from "three";
// import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { FontLoader } from "three/addons/loaders/FontLoader.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 3d场景
const scene = new THREE.Scene();

// 几何形状
const geometry = new THREE.BoxGeometry(120, 60, 70);

// 材质
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

// 网络模型
const mesh = new THREE.Mesh(geometry, material);

// 位置
mesh.position.set(200, 10, 10);

// 添加
scene.add(mesh);

// 相机
const camera = new THREE.PerspectiveCamera(30, 800 / 300, 0.5);
camera.position.set(20, 400, 200);
camera.lookAt(60, 10, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 600);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);
