import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


//loading
const textureLoader= new THREE.TextureLoader();
const normalTexture= textureLoader.load('/textures/NormalMap.png');
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry= new THREE.SphereBufferGeometry(.5,64,64);
// Materials

// const material = new THREE.MeshBasicMaterial();
const material = new THREE.MeshStandardMaterial();
material.metalness=0.5;
material.roughness=0.5;
material.normalMap=normalTexture;
material.color = new THREE.Color(0x22929);

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
const pointLight1 = new THREE.PointLight(0xff0000, 2)
// pointLight1.position.x = 1
// pointLight1.position.y = 1
// pointLight1.position.z = 1
pointLight1.position.set(-1.5,1,-1.5);
pointLight1.intensity=2;
scene.add(pointLight1)

const light1= gui.addFolder('light 1');
light1.add(pointLight1.position, 'x').min(-3).max(9).step(0.01);
light1.add(pointLight1.position, 'y').min(-3).max(9).step(0.01);
light1.add(pointLight1.position, 'z').min(-3).max(9).step(0.01);
light1.add(pointLight1, 'intensity').min(-3).max(9).step(0.01);
// const pointLightHelper=new THREE.PointLightHelper(pointLight1,1);
// scene.add(pointLightHelper);

const pointLight2 = new THREE.PointLight(0x3bbed, 2)
// pointLight2.position.x = 1
// pointLight2.position.y = 1
// pointLight2.position.z = 1
pointLight2.position.set(2.48,-2.02,-0.83);
pointLight2.intensity=2;
scene.add(pointLight2)

const light2=gui.addFolder('Light 2');
light2.add(pointLight2.position, 'x').min(-3).max(9).step(0.01);
light2.add(pointLight2.position, 'y').min(-3).max(9).step(0.01);
light2.add(pointLight2.position, 'z').min(-3).max(9).step(0.01);
light2.add(pointLight2, 'intensity').min(-3).max(9).step(0.01);

const light2Color ={
    color: 0xff0000
}
light2.addColor(light2Color, 'color')
.onChange(()=>{
    pointLight2.color.set(light2Color.color)
})
// const pointLightHelper1=new THREE.PointLightHelper(pointLight2,1);
// scene.add(pointLightHelper1);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX=0;
let mouseY =0;
let targetX=0;
let targetY =0 ;
const windowX = window.innerWidth/2;
const windowY = window.innerHeight /2;
function onDocumentMouseMove (event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}
const clock = new THREE.Clock()


const updateSphere=(event) =>{
    sphere.position.y=window.scrollY * .001;
}
window.addEventListener('scroll', updateSphere);

const tick = () =>
{
    targetX= mouseX * .001;
    targetY = mouseY* .001; 

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime;
    sphere.rotation.y += .7 * (targetX- sphere.rotation.y);
    sphere.rotation.x += .6 * (targetY- sphere.rotation.x);
    sphere.position.z += -2 * (targetY- sphere.rotation.x);
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();