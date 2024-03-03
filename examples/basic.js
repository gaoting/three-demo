import * as THREE from "three";

console.log(THREE);

// 场景 scene
const scene = new THREE.Scene();

// object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(1, 1, 1);
scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,1,3000);
camera.position.z = 5;
scene.add(camera);

const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
