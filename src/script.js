import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'

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

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 0, 2)

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5)

const pointLight = new THREE.PointLight(0xffffff, 1, 3)
pointLight.position.set(0, 0, -0.8)

// const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI * 0.3, 0.2, 1)
// spotLight.position.set(0, 2, 3)
// spotLight.target.position.x = -1 // need to add spotLight.target to scene to work

const rectAreaLight = new THREE.RectAreaLight(0x00ffff, 8, 1, 1)
rectAreaLight.position.set(2, 0, 0)
rectAreaLight.lookAt(new THREE.Vector3())

const rectAreaLight2 = new THREE.RectAreaLight(0xff00ff, 10, 1, 1)
rectAreaLight2.position.set(-2, 0, 0)
rectAreaLight2.lookAt(new THREE.Vector3())

scene.add(rectAreaLight, rectAreaLight2, pointLight, directionalLight)

// HELPERS

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// const spotLightHelper = new THREE.SpotLightHelper(spotLight)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight) // not included, needs to be imported from examples
const rectAreaLight2Helper = new RectAreaLightHelper(rectAreaLight2) // not included, needs to be imported from examples

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('hey', {
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
  scene.add(text)
})

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.9

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
torus.position.x = 1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5

scene.add(plane)

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
camera.position.z = 100
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

gsap.to(camera.position, { duration: 1, delay: 3, z: 1 })

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // rectAreaLight.rotation.y = 2 * elapsedTime
  // rectAreaLight2.rotation.y = -1 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

// 3D TEXT
// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// import * as dat from 'lil-gui'

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// // Axes Helper
// // const axesHelper = new THREE.AxesHelper()
// // scene.add(axesHelper)

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()
// const matcapTexture = textureLoader.load('/textures/matcaps/13.png')

// /**
//  * Materials
//  */

// const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
// const material2 = new THREE.MeshToonMaterial({ color: 'cornflowerblue' })

// /**
//  * Fonts
//  */
// const fontLoader = new FontLoader()

// fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
//   const textGeometry = new TextGeometry('hi!', {
//     font,
//     size: 0.5,
//     height: 0.2,
//     curveSegments: 32,
//     bevelEnabled: true,
//     bevelThickness: 0.03,
//     bevelSize: 0.02,
//     bevelOffset: 0,
//     bevelSegments: 32,
//   })
//   textGeometry.center()
//   const text = new THREE.Mesh(textGeometry, material2)
//   scene.add(text)
// })

// /**
//  * Lights
//  */
// const light = new THREE.PointLight(0xffffff, 1)
// light.position.set(10, 10, 10)
// scene.add(light)

// /**
//  * Donuts
//  */

// // const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

// // console.time('donuts')

// // for (let i = 0; i < 50; i++) {
// //   const donut = new THREE.Mesh(donutGeometry, material)

// //   donut.position.x = (Math.random() - 0.5) * 10
// //   donut.position.y = (Math.random() - 0.5) * 10
// //   donut.position.z = (Math.random() - 0.5) * 10

// //   donut.rotation.x = Math.random() * Math.PI
// //   donut.rotation.y = Math.random() * Math.PI

// //   const randScale = Math.random()
// //   const scale = randScale < 0.5 ? randScale + 0.4 : randScale
// //   donut.scale.x = scale
// //   donut.scale.y = scale
// //   donut.scale.z = scale

// //   scene.add(donut)
// // }

// // console.timeEnd('donuts')

// /**
//  * Object
//  */

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// }

// window.addEventListener('resize', () => {
//   // Update sizes
//   sizes.width = window.innerWidth
//   sizes.height = window.innerHeight

//   // Update camera
//   camera.aspect = sizes.width / sizes.height
//   camera.updateProjectionMatrix()

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height)
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = -0.5
// camera.position.y = 0.5
// camera.position.z = 1
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime()

//   // Update controls
//   controls.update()

//   // Render
//   renderer.render(scene, camera)

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick)
// }

// tick()
