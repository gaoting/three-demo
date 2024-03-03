import * as THREE from "three";

var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

// var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// var camera = new THREE.PerspectiveCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.position.set(0, 0, 50);
scene.add(camera);

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 1,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
} );
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

renderer.render(scene, camera);
