//https://www.youtube.com/watch?v=Q7AOvWpIVHU&list=PL0vfts4VzfNjfHKRKkMjm_xUXglH6HtL1&index=16
import "../animate.css";
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

const geometry = new THREE.TorusGeometry(10, 3, 16, 100); //What shape you want to use
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 }); //The 'wrapping paper'
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

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
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
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

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Avatar with texture mapping

const jeffTexture = new THREE.TextureLoader().load("jeff.png");

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

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

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update(); //Initiates the mouse movement moving the scene

  renderer.render(scene, camera);
}

animate();
