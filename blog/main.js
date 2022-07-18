//https://www.youtube.com/watch?v=Q7AOvWpIVHU&list=PL0vfts4VzfNjfHKRKkMjm_xUXglH6HtL1&index=16
import "../animate.css";
import "../navbar.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup always starts with three objects: scene, camera, and renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, //FOV
  window.innerWidth / window.innerHeight, //Aspect ratio
  0.1, //object view distance (from x to y)
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Add an object

const hedronTexture = new THREE.TextureLoader().load("nebula.jpg");
const hedron = new THREE.Mesh(
  new THREE.IcosahedronGeometry(10, 3),
  new THREE.MeshBasicMaterial({ map: hedronTexture })
); //What shape you want to use

scene.add(hedron);
hedron.position.z = -100;
hedron.position.x = 40;
hedron.position.y = 15;

// Lights

const pointLight = new THREE.PointLight(0xffffff); //Adds a point of light
pointLight.position.set(5, 5, 5); //Move it away from the center

const ambientLight = new THREE.AmbientLight(0xffffff); //Creates lighting across the entire scene
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight) //Shows a wireframe of the light location
// const gridHelper = new THREE.GridHelper(200, 50); //Shows a wire of the grid relative to camera
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement); //Updates the camera position based on the mouse movement

function addStar() {
  //Creates randomly generated stars
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("space.jpeg");
scene.background = spaceTexture;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  //This creates the movement of the entire scene
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
//Recursive function to call the animation perpetually (like making things spin)
function animate() {
  requestAnimationFrame(animate);

  // hedron.rotation.x += 0.001;
  hedron.rotation.y += 0.001;
  hedron.rotation.z += 0.001;

  // controls.update(); //Initiates the mouse movement moving the scene

  renderer.render(scene, camera);
}

animate();

//Create Saturn
("use strict");

let particles, saturn;

let width = window.innerWidth,
  height = window.innerHeight;

let position = [-100, -20, -40];

const colors = [0x37be95, 0xf3f3f3, 0x6549c0];

init();
animate2();

function init() {
  // controls = new THREE.OrbitControls(camera, renderer.domElement);

  drawSaturn();
  saturn.position.z = -100;

  document.getElementById("bg").appendChild(renderer.domElement);

  window.addEventListener("resize", onResize);
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate2() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  particles.rotation.x += 0.001;
  particles.rotation.y -= 0.004;
  saturn.rotation.y += 0.003;
  renderer.render(scene, camera);
}

function drawSaturn() {
  saturn = new THREE.Group();
  saturn.rotation.set(1, 0.75, 0);
  scene.add(saturn);

  const planetGeometry = new THREE.IcosahedronGeometry(10, 1);

  const planetTexture = new THREE.TextureLoader().load("saturnSurface.jpg");

  const planetMaterial = new THREE.MeshBasicMaterial({
    map: planetTexture,
  });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);

  planet.castShadow = true;
  planet.receiveShadow = true;
  planet.position.set(...position);
  saturn.add(planet);

  const ringTexture = new THREE.TextureLoader().load("saturnRings.jpg");

  const ringGeometry = new THREE.TorusGeometry(20, 1.2, 2, 50);
  const ringMeterial = new THREE.MeshStandardMaterial({
    color: 0x8b741b,
    shading: THREE.FlatShading,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMeterial);
  ring.position.set(...position);
  ring.rotateX(80);
  ring.castShadow = true;
  ring.receiveShadow = true;
  saturn.add(ring);
}
