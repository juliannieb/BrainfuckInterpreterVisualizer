var scene, camera, renderer;
var geometry, material, mesh;
var objects;

function initVisualizer() {
    setScene();
    setCamera();
    setRenderer();
    objects = [];

    //addCubes();
}

function setScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
}

function setCamera() {
    let canvas = document.getElementById("canvas");
    camera = new THREE.PerspectiveCamera(70, canvas.offsetWidth / canvas.offsetWidth, 1, 10000);
    camera.position.z = 1000;
}

function setRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    let canvas = document.getElementById("canvas");
    renderer.setSize(canvas.offsetWidth, canvas.offsetWidth);
    canvas.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    renderer.render(scene, camera);
}

function addCubes() {
    var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    for (var i = 0; i < objects.length; i++) {
        scene.remove(objects[i]);
    }
    for (var i = 0; i < 100; i ++) {
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;
        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;
        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;
        objects.push(object);
        scene.add( object );
    }
}

$( document ).ready(function(){
    initVisualizer();
    render();
})