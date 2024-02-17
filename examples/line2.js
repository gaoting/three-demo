import * as THREE from "three";
// import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { FontLoader } from "three/addons/loaders/FontLoader.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 3d场景
const scene = new THREE.Scene();

//创建一个空的几何体对象
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标
  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);
const attribue = new THREE.BufferAttribute(vertices, 3); 
geometry.attributes.position = attribue;

// 线材质对象
const material = new THREE.LineBasicMaterial({
  color: 'yellow', //线条颜色
});
// 创建线模型对象
const line = new THREE.Line(geometry, material);

// 位置
line.position.set(0, 10, 10);

// 添加
scene.add(line);

// 相机
const camera = new THREE.PerspectiveCamera(30, 800 / 300, 0.5);
camera.position.set(20, 400, 200);
camera.lookAt(60, 10, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 600);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

// 渲染函数
const clock = new THREE.Clock();
function render() {
  const spt = clock.getDelta() * 30000; //毫秒
  renderer.render(scene, camera); //执行渲染操作
  mesh.rotateZ(0.01); //每次绕y轴旋转0.01弧度
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();
