/**
 * @file
 * This file provides a script to set the graphic interface for a three.js visualization in the canvas.
 */

var scene, camera, renderer;
var geometry, material, mesh;
var objects;

/**
 * Init all the elements for the visualization in the canvas.
 */
function initVisualizer() {
    setScene();
    setCamera();
    setRenderer();
    objects = [];

    //addCubes();
}

/**
 * Set the three.js scene.
 */
function setScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
}

/**
 * Set the three.js camera.
 */
function setCamera() {
    let canvas = document.getElementById("canvas");
    camera = new THREE.PerspectiveCamera(70, canvas.offsetWidth / canvas.offsetWidth, 1, 10000);
    camera.position.z = 1000;
}

/**
 * Set the three.js renderer.
 */
function setRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    let canvas = document.getElementById("canvas");
    renderer.setSize(canvas.offsetWidth, canvas.offsetWidth);
    canvas.appendChild(renderer.domElement);
}

/**
 * Set the animate function for rendering the canvas.
 */
function animate() {
    requestAnimationFrame(animate);

    render();
}

/**
 * Renders the scene with the corresponding camera.
 */
function render() {
    renderer.render(scene, camera);
}

$( document ).ready(function(){
    initVisualizer();
    render();
})