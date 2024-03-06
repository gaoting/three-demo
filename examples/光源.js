import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 创建场景

// 场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
const scene = new THREE.Scene();
// 添加背景颜色
scene.background = new THREE.Color("#5c92ff");

// 创建相机
const camera = new THREE.PerspectiveCamera();
camera.position.y = 3;
camera.position.z = 10;

// 创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 创建材质
const material = new THREE.MeshPhongMaterial({
  color: 0x0099ff,
  shininess: 150,
});

// 创建Mesh
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0.5, 0);

// 物体接受光源
cube.receiveShadow = true;
// 物体投射光源
cube.castShadow = true;
scene.add(cube);

// 添加灯光效果

// 添加环境光
const light = new THREE.AmbientLight(0xffffff, 1); // 柔和的白光
scene.add(light);

// 添加点光源
const pointlight = new THREE.PointLight(0xffffff, 100, 100);
pointlight.position.set(5, 3, 5);
pointlight.castShadow = true;
scene.add(pointlight);

// 创建地面
const meshfloor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshPhongMaterial({
    color: 0x1b5e20,
  })
);

meshfloor.rotation.x -= Math.PI / 2;

// 地面同样要设置接受光源
meshfloor.receiveShadow = true;
scene.add(meshfloor);

// 添加坐标辅助线
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// 将渲染器添加到页面
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 让立方体动起来
function animate() {
  // 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;
  // 轨道控制器更新
  controls.update();
  renderer.render(scene, camera);
}
animate();
