import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// c
const textures = new THREE.CubeTextureLoader()
  .setPath("./assets/textures/")
  .load(["04.jpg", "01.jpg", "05.jpg", "02.jpg", "06.jpg", "03.jpg"]);

  // 立方体贴图
const texture = new THREE.TextureLoader().load("./assets/textures/02-map.jpg");

// 纹理的环绕模式和重复因子

// 纹理 S 坐标（水平方向）的环绕模式
textures.wrapS = THREE.RepeatWrapping;
// 纹理 T 坐标（垂直方向）的环绕模式
textures.wrapT = THREE.RepeatWrapping;
// 纹理将在水平方向重复 4 次，在垂直方向重复 4 次
texture.repeat.set(4, 4);

scene.background = textures;

/**
 * 添加雾 
 * 
 * 参数：
 * color :比如说，如果将其设置为黑色，远处的物体将被渲染成黑色。
 * near：开始应用雾的最小距离。距离小于活动摄像机“near”个单位的物体将不会被雾所影响。默认值是1。
 * far：结束计算、应用雾的最大距离，距离大于活动摄像机“far”个单位的物体将不会被雾所影响。默认值是1000。
 * */

scene.fog = new THREE.Fog(0xcccccc, 10, 15);

const camera = new THREE.PerspectiveCamera();
camera.position.y = 5;
camera.position.z = 10;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: texture });

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

// // 创建球体
// const sphere = new THREE.SphereGeometry(1)
// const material1 = new THREE.MeshBasicMaterial({ 
//   envMap: textures,
//   color: 0xf40404,
//   map: texture
// });

// // 网格
// const cube1 = new THREE.Mesh(sphere, material1);
// cube1.position.set(0, 0, 0);
// scene.add(cube1);

// // 添加网格地面
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

// // 添加坐标轴
// const axesHelper = new THREE.AxesHelper( 5 );
// axesHelper.position.y = 3
// scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();
