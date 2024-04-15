import * as THREE from "three";

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建地球几何体
const earthGeometry = new THREE.SphereGeometry(8, 32, 32);

// 创建地球材质
const earthMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./assets/textures/earth.jpg')
});

// 创建地球
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// 创建月球几何体
const moonGeometry = new THREE.SphereGeometry(2, 16, 16);

// 创建月球材质
const moonMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('./assets/textures/moon.jpg')
});

// 创建月球
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(15, 0, 0);
scene.add(moon);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// 创建动画循环
function animate() {
  requestAnimationFrame(animate);

  // 地球自转
  earth.rotation.y += 0.01;

  // 月球绕地球公转
  moon.position.x = Math.cos(1 * Date.now() / 1000) * 15;
  moon.position.z = Math.sin(1 * Date.now() / 1000) * 15;

   // 加快月球自转速度
   moon.rotation.y += 0.03; // 添加此行

  // 渲染场景
  renderer.render(scene, camera);
}

animate();