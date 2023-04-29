import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const lighttexture = new THREE.TextureLoader().load('space.jpg');

const geometry = new THREE.TorusGeometry( 15, 8, 15, 70 ); 
const material = new THREE.MeshStandardMaterial( { map : lighttexture} ); 
const torus = new THREE.Mesh( geometry, material ); 
scene.add( torus );

const pointLight =new THREE.PointLight(0xffffff)
pointLight.position.set(5,10,10)
scene.add(pointLight)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)
// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

const bhtexture = new THREE.TextureLoader().load('space.jpg');

const blekhol = new THREE.Mesh(
  new THREE.TorusGeometry(5,3,2),
  new THREE.MeshBasicMaterial( {map: bhtexture})
);

scene.add(blekhol)

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

const earttexture = new THREE.TextureLoader().load('earth.jpg');
// const earthtexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earttexture,
    // normalMap: earthtexture,
  })
);

scene.add(earth);

earth.position.z = -30;
earth.position.setX(10);

moon.position.z = 30;
moon.position.setX(-10);

blekhol.position.z = -5;
blekhol.position.x = 2;
torus.position.z = -5;
torus.position.x = 2;



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  blekhol.rotation.y += 0.01;
  blekhol.rotation.z += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();
function animate() {
  requestAnimationFrame(animate);
  blekhol.rotation.z += 0.5;
  controls.update();

  renderer.render(scene,camera);
}

function animate2() {
  requestAnimationFrame(animate2);
  torus.rotation.z += 3;

  torus.rotation.x += 0.5;

  controls.update();

  renderer.render(scene,camera);
}

animate()
animate2()