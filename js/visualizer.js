/**
 * @file
 * This file provides a class to set the graphic interface for a three.js visualization in the canvas.
 */

 /**
  * Class representing the visualizer of the interpreter that sets all the three.js elements.
  */
class Visualizer {
    /**
     * Init all the elements for the visualization in the canvas.
     */
    initVisualizer() {
        this.setScene();
        this.setCamera();
        this.setRenderer();
    }

    /**
     * Set the three.js scene.
     */
    setScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        this.scene.add(light);
    }

    /**
     * Set the three.js camera.
     */
    setCamera() {
        let canvas = document.getElementById("canvas");
        this.camera = new THREE.PerspectiveCamera(70, canvas.offsetWidth / canvas.offsetWidth, 1, 10000);
        this.camera.position.z = 1000;
    }

    /**
     * Set the three.js renderer.
     */
    setRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        let canvas = document.getElementById("canvas");
        this.renderer.setSize(canvas.offsetWidth, canvas.offsetWidth);
        canvas.appendChild(this.renderer.domElement);
    }

    /**
     * Set the animate function for rendering the canvas.
     */
    animate() {
        requestAnimationFrame(animate);

        this.render();
    }

    /**
     * Renders the this.scene with the corresponding this.camera.
     */
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
