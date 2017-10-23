/**
 * @file
 * This file contains any constants and methods needed in other files to have more control.
 */

let supportedCommands = ['>', '<', '+', '-', ',', '.', '[', ']'];
let ignoredCommands = [' ', '\n', '\t', '\0'];

let ENTER_KEY_CODE = 13;

let RunningMethodEnum = {
    RUN : 0,
    RUN_VISUALIZE: 1,
    VISUALIZE: 2
}/**
 * @file
 * This file provides a class and a script to interpret a Brainfuck program.
 */

 /**
  * Class representing a Brainfuck Interpreter.
  */
class BrainfuckInterpreter {

    /**
     * Constructor for a Brainfuck Interpreter
     */
    constructor(font) {
        this.textFont = font;
        this.initInterpreter();
    }

    /**
     * Set the initial values for the interpreter fields.
     */
    initInterpreter() {
        this.memory = [];
        this.currentCellIdx = 0;
        this.commands = "";
        this.input = "";
        this.currentCommandIdx = 0;
        this.currentInputIdx = 0;
        this.loopStartIdxs = [];
        this.finished = false;
        this.keyPressedListenerActive = false;
        this.instructionBaseTime = 500;
        this.memory.push(this.createCell());
    }

    /**
     * Set the initial values necessary for the visualization.
     * 
     * @param {RunningMethodEnum} runningMethod - Selected runningMethod for the execution. See RunningMethodEnum in utils.js
     */
    initGUI(runningMethod) {
        document.getElementById("outputTextArea").value = "";
        this.speedRange = document.getElementById("speedRange");
        if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
            this.keyPressedListenerActive = false;
            if (runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
                this.drawMemory();
            }
        }
        else if (runningMethod == RunningMethodEnum.VISUALIZE) {
            this.keyPressedListenerActive = true;
            this.drawMemory();
        }
    }

    /**
     * Remove every element in the canvas.
     */
    clearCanvas() {
        while (visualizer.scene.children.length)
        {
            visualizer.scene.remove(visualizer.scene.children[0]);
        }
    }

    /**
     * Creates a new MemoryCell object.
     * 
     * @return MemoryCell a whole new MemoryCell object
     */
    createCell() {
        return new MemoryCell(0, this.textFont);
    }

    /**
     * Handler for the increment '>' command.
     */
    incrementPointer() {
        this.currentCellIdx++;
        while (this.currentCellIdx >= this.memory.length) {
            this.memory.push(this.createCell());
        }
    }

    /**
     * Handle for the decrement '<' command.
     */
    decrementPointer() {
        if (this.currentCellIdx > 0) {
            this.currentCellIdx--;
        }
    }

    /**
     * Handler for the increment value '+' command.
     */
    incrementValue() {
        if (this.memory[this.currentCellIdx].value < 255) {
            (this.memory[this.currentCellIdx].value)++;
        }
    }

    /**
     * Handler for the decrement value '-' command.
     */
    decrementValue() {
        if (this.memory[this.currentCellIdx].value > 0) {
            (this.memory[this.currentCellIdx].value)--;
        }
    }

    /**
     * Handler for the this.input ',' command.
     * Gets one this.input character from the user according to the current runningMethod.
     * 
     * @param {RunningMethodEnum} runningMethod - Selected runningMethod for the execution. See RunningMethodEnum in utils.js
     */
    inputCommand(runningMethod) {
        if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
            if (this.currentInputIdx >= this.input.length) {
                alert("Error: Input out of bounds");
                // TODO: Stop execution
                return;
            }
            let inputByte = this.input[this.currentInputIdx];
            this.memory[this.currentCellIdx].value = inputByte.charCodeAt(0);
            this.currentInputIdx++;
        }
        else if (runningMethod == RunningMethodEnum.VISUALIZE) {
            let inputByte = prompt("Please enter a value between 0-255");
            if (inputByte >= 0 && inputByte <= 255) {
                this.memory[this.currentCellIdx].value = inputByte;
            }
            else {
                alert("Error: Inncorrect this.input value");
                // TODO: Stop execution
            }
        }
    }

    /**
     * Handler for the output '.' command.
     */
    outputCommand() {
        var value = this.memory[this.currentCellIdx].value;
        if (value >= 0 && value <= 255) {
            var valChar = String.fromCharCode(value);
            var outputTextBox = document.getElementById("outputTextArea");
            var outputSoFar = outputTextBox.value;
            var newOutput = outputSoFar + valChar;
            outputTextBox.value = newOutput;
            Materialize.updateTextFields();
            $('#outputTextArea').trigger('autoresize');
        }
    }

    /**
     * Handler for the start loop '[' command.
     */
    startLoop() {
        var value = this.memory[this.currentCellIdx].value;
        if (value != 0) {
            this.loopStartIdxs.push(new Loop(this.currentCommandIdx, true));
        }
        else {
            this.loopStartIdxs.push(new Loop(this.currentCommandIdx, false));
        }
    }

    /**
     * Handler for the end loop '[' command.
     */
    endLoop() {
        if (this.loopStartIdxs.length == 0) {
            // TODO: Handle syntax error
            return;
        }
        var value = this.memory[this.currentCellIdx].value;
        if (value != 0) {
            this.currentCommandIdx = this.loopStartIdxs[this.loopStartIdxs.length - 1].idx;
        }
        else {
            this.loopStartIdxs.pop();
        }
    }

    /**
     * Select the correct handler for the current command of the tape and execute it
     * according to the current runningMethod.
     * 
     * @param {char} command - Char indicating the current command. See the supportedCommands list in utils.js
     * @param {RunningMethodEnum} runningMethod - Selected runningMethod for the execution. See RunningMethodEnum in utils.js
     */
    runCommand(command, runningMethod) {
        if (supportedCommands.indexOf(command) == -1 && ignoredCommands.indexOf(command) == -1) {
            // TODO: Handle wrong command error
            alert("Invalid command " + command + " = " + command.charCodeAt(0) + " at idx: " + this.currentCommandIdx);
        }
        if (this.loopStartIdxs.length == 0 || this.loopStartIdxs[this.loopStartIdxs.length - 1].valid) {
            if (command == '>') {
                this.incrementPointer();
            }
            else if (command == '<') {
                this.decrementPointer();
            }
            else if (command == '+') {
                this.incrementValue();
            }
            else if (command == '-') {
                this.decrementValue();
            }
            else if (command == ',') {
                this.inputCommand(runningMethod);
            }
            else if (command == '.') {
                this.outputCommand();
            }
        }

        if (command == '[') {
            this.startLoop();
        }
        else if (command == ']') {
            this.endLoop();
        }
        if (runningMethod == RunningMethodEnum.RUN_VISUALIZE || runningMethod == RunningMethodEnum.VISUALIZE) {
            this.drawMemory();
        }
    }

    /**
     * Get one new command from the user according to the current runningMethod.
     * 
     * @param {RunningMethodEnum} runningMethod - Selected runningMethod for the execution. See RunningMethodEnum in utils.js
     */
    nextCommand(runningMethod) {
        if (this.finished) {
            return;
        }
        if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
            if (this.currentCommandIdx >= this.commands.length) {
                this.finished = true;
                return;
            }
            let nextCommandChar = this.commands[this.currentCommandIdx];
            this.runCommand(nextCommandChar, runningMethod);
            this.currentCommandIdx++;
            if (runningMethod == RunningMethodEnum.RUN) {
                this.nextCommand(runningMethod);
            }
            if (runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
                let interpreter = this;
                setTimeout(function(){
                    interpreter.nextCommand(runningMethod);
                }, this.instructionBaseTime / this.speedRange.value);
            }
        }
        else if (runningMethod == RunningMethodEnum.VISUALIZE) {
            if (this.currentCommandIdx >= this.commands.length) {
                return;
            }
            let nextCommandChar = this.commands[this.currentCommandIdx];
            this.runCommand(nextCommandChar, runningMethod);
            this.currentCommandIdx++;
            if (this.currentCommandIdx < this.commands.length) {
                let interpreter = this;
                setTimeout(function(){
                    interpreter.nextCommand(runningMethod);
                }, this.instructionBaseTime / this.speedRange.value);
            }
        }
    }

    /**
     * Run a Brainfuck program according to the selected runningMethod.
     * Init all the necessary elements for the interpreter and the canvas.
     * 
     * @param {RunningMethodEnum} runningMethod - Selected runningMethod for the execution. See RunningMethodEnum in utils.js
     */
    runCode(runningMethod) {
        this.clearCanvas();
        this.initInterpreter();
        this.initGUI(runningMethod);
        if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
            this.keyPressedListenerActive = false;
            this.commands = document.getElementById("codeTextArea").value;
            this.input = document.getElementById("inputTextArea").value;
            if (runningMethod == RunningMethodEnum.RUN) {
                this.nextCommand(runningMethod);
            }
            else if (runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
                let interpreter = this;
                setTimeout(function(){
                    interpreter.nextCommand(runningMethod);
                }, this.instructionBaseTime / this.speedRange.value);
            }
        }
        else if (runningMethod == RunningMethodEnum.VISUALIZE) {
            this.keyPressedListenerActive = true;
            this.commands = "";
        }
    }

    /**
     * Creates a string representation of the current state of the this.memory.
     * 
     * @return string A string representation of the this.memory
     */
    memoryToString() {
        s = "";
        s += "[";
        for(i = 0; i < this.memory.length; i++) {
            s += this.memory[i].value + (i == this.memory.length - 1 ? "" : ",");
        }
        s += "]";
        return s;
    }

    /**
     * Creates a string representation of the current state of the loops.
     * 
     * @return string A string representation of the loops
     */
    loopsToString() {
        s = "";
        s += "[";
        for(i = 0; i < this.loopStartIdxs.length; i++) {
            s += "(" + this.loopStartIdxs[i].idx + ", " + this.loopStartIdxs[i].valid + ")" + (i == this.loopStartIdxs.length - 1 ? "" : ",");
        }
        s += "]";
        return s;
    }

    /**
     * Draw the state of each this.memory cell in the canvas and renders it.
     */
    drawMemory() {
        for (var i = 0; i < this.memory.length; i++) {
            this.memory[i].draw(i, this.currentCellIdx, this.textFont);
        }
        visualizer.render();
    }

}
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
/**
 * @file
 * This file provides a class to represent a memory cell in the program.
 */

let cellSize = 90;
let spaceBetweenCells = 50;
let textSpace = 90;
let textSize = 13;

/**
 * Class representing a cell of memory of the program execution.
 */
class MemoryCell {

    /**
     * Constructor for a new MemoryCell object.
     * 
     * @param {int} value - Initial value for the cell
     * @param {Font} font - Font for drawing the value
     */
    constructor(value, font) {
        this.value = value;
    }

    /**
     * Creates a cube mesh and adds it to the cell for it to be updated and drawn later.
     */
    addCube() {
        var geometry = new THREE.BoxBufferGeometry( cellSize, cellSize, cellSize );
        this.cube = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { 
            //color: Math.random() * 0xffffff 
            color: 0x777777,
            wireframe: true
        } ) );
        this.cube.position.x = 0;
        this.cube.position.y = 0;
        this.cube.position.z = 0;
        visualizer.scene.add(this.cube);
    }

    /**
     * Create a text mesh for drawing the value of the cell and adds it in the scene.
     * 
     * @param {Font} font - The font previously loaded for drawing the cell value
     */
    addText(font) {
        var textMaterial = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );
        var textGeometry = new THREE.TextGeometry(this.value, {
            font: font,
            size: textSize,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 5
        } );
        this.textMesh = new THREE.Mesh( textGeometry, textMaterial );
        this.textMesh.position.x = this.cube.position.x;
        this.textMesh.position.y = this.cube.position.y + textSpace;
        this.textMesh.position.z = this.cube.position.z;
        visualizer.scene.add(this.textMesh);
    }

    /**
     * Draw the cell in the scene with the corresponding coordinates according to the
     * cell index and the current pointer index.
     * 
     * @param {int} idx - Index of the cell
     * @param {int} currentCellIdx - Index of the current pointer
     * @param {Font} font - Font to draw the cell value
     */
    draw(idx, currentCellIdx, font) {
        if (this.cube == undefined) {
            this.addCube();
        }
        if (idx == currentCellIdx) {
            this.cube.material.color.setHex(0xff0000);
        }
        else {
            this.cube.material.color.setHex(0x777777);
        }
        this.cube.position.x = 0 + ((cellSize + spaceBetweenCells) * (idx - currentCellIdx));
        this.cube.position.y = 0;
        this.cube.position.z = 0;

        visualizer.scene.remove(this.textMesh);
        this.addText(font);
    }

}
/**
 * Class representing a loop in the code execution.
 */
class Loop {

    /**
     * Constructor for a Loop object
     * 
     * @param {int} idx - Starting index of the loop
     * @param {bool} valid - True if the loop is valid (current pointer value != 0), otherwise false
     */
    constructor(idx, valid) {
      this.idx = idx;
      this.valid = valid;
    }

}
module.exports = {
    BrainfuckInterpreter : BrainfuckInterpreter,
    MemoryCell : MemoryCell,
    Loop : Loop,
    Visualizer : Visualizer
}