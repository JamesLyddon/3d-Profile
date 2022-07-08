import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
import gsapCore from 'gsap/gsap-core'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.05)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
directionalLight.position.set(0, 0, 100)

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5)

const pointLight = new THREE.PointLight(0xffffff, 1, 3)
pointLight.position.set(0, 0, 50)

// const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI * 0.3, 0.2, 1)
// spotLight.position.set(0, 2, 3)
// spotLight.target.position.x = -1 // need to add spotLight.target to scene to work

const rectAreaLight = new THREE.RectAreaLight(0x00ffff, 5, 5, 5)
rectAreaLight.position.set(4, 0, 2)
rectAreaLight.lookAt(new THREE.Vector3())

const rectAreaLight2 = new THREE.RectAreaLight(0xff00ff, 5, 5, 5)
rectAreaLight2.position.set(-4, 0, 2)
rectAreaLight2.lookAt(new THREE.Vector3())

scene.add(rectAreaLight, rectAreaLight2, directionalLight)

// HELPERS

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// const spotLightHelper = new THREE.SpotLightHelper(spotLight)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight) // not included, needs to be imported from examples
const rectAreaLight2Helper = new RectAreaLightHelper(rectAreaLight2) // not included, needs to be imported from examples

// scene.add(pointLightHelper)

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('hello', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 64,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 64,
  })
  textGeometry.center()
  const text = new THREE.Mesh(textGeometry, material)
  text.position.set(0, -5, 0)
  scene.add(text)
  gsap.to(text.position, { duration: 1, delay: 1, y: 0 })
  gsap.to(text.position, { duration: 1, delay: 3, y: -5 })
})

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry(`I'm James`, {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 64,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 64,
  })
  textGeometry.center()
  const text = new THREE.Mesh(textGeometry, material)
  text.position.set(0, 5, 2)
  scene.add(text)
  gsap.to(text.position, { duration: 1, delay: 6, y: 0 })
  gsap.to(text.position, { duration: 1, delay: 11, y: 5 })
})

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 1

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
torus.position.x = 1.5

const floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 30), material)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = -0.5

const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(1000, 30), material)
ceiling.rotation.x = Math.PI * 0.5
ceiling.position.y = 0.5

scene.add(floor, ceiling)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
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
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

//1 Hello
gsap.to(camera.position, { duration: 1, delay: 0, x: -0.5, z: 1 })
// gsap.to(directionalLight.position, { duration: 1, delay: 3, z: 2 })
//2 I'm James
gsap.to(camera.position, { duration: 1, delay: 5, x: 0.5, z: 4 })
// gsap.to(directionalLight.position, { duration: 1, delay: 3, z: 7 })

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
