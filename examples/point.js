import * as THREE from "three";
// import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { FontLoader } from "three/addons/loaders/FontLoader.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 3d场景
const scene = new THREE.Scene();

//创建一个空的几何体对象
const geometry = new THREE.BufferGeometry(); 
//类型化数组创建顶点数据
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标
  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);
const attribue = new THREE.BufferAttribute(vertices, 3); 
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;
// 点渲染模式
const material = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 10.0 //点对象像素尺寸
}); 
// 材质
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// 网络模型
// const line = new THREE.Line(geometry, material)
const points = new THREE.Points(geometry, material);

// 位置
points.position.set(200, 10, 10);

// 添加
scene.add(points);

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
  const spt = clock.getDelta()*30000;//毫秒
  renderer.render(scene, camera); //执行渲染操作
  mesh.rotateZ(0.01);//每次绕y轴旋转0.01弧度
  requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();
