var memory = [];
var currentCellIdx = 0;
var commands = "";
var input = "";
var currentCommandIdx = 0;
var currentInputIdx = 0;
var loopStartIdxs = [];
var finished = false;
var keyPressedListenerActive = false;
var textFont;
var speedRange;
let instructionBaseTime = 500;

/**
 * Set the initial values for the interpreter fields.
 */
function initInterpreter() {
    memory = [];
    currentCellIdx = 0;
    commands = "";
    input = "";
    currentCommandIdx = 0;
    currentInputIdx = 0;
    loopStartIdxs = [];
    finished = false;
    memory.push(createCell());
}

/**
 * Set the initial values necessary for the visualization.
 * 
 * @param {RunningMethodEnum} runningMethod 
 */
function initGUI(runningMethod) {
    document.getElementById("outputTextArea").value = "";
    speedRange = document.getElementById("speedRange");
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        keyPressedListenerActive = false;
        if (runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
            drawMemory();
        }
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        keyPressedListenerActive = true;
        drawMemory();
    }
}

/**
 * Load font asynchronous for drawing cell values.
 * 
 * @param {string} url 
 */
function loadFont(url) {
    var loader = new THREE.FontLoader();
    loader.load(url, function ( font ) {
        textFont = font
    });
}

/**
 * Remove every element in the canvas.
 */
function clearCanvas() {
    while (scene.children.length)
    {
        scene.remove(scene.children[0]);
    }
}

/**
 * Creates a new MemoryCell object.
 * 
 * @return MemoryCell a whole new MemoryCell object
 */
function createCell() {
    return new MemoryCell(0, textFont);
}

/**
 * Handler for the increment '>' command.
 */
function incrementPointer() {
    currentCellIdx++;
    while (currentCellIdx >= memory.length) {
        memory.push(createCell());
    }
}

/**
 * Handle for the decrement '<' command.
 */
function decrementPointer() {
    if (currentCellIdx > 0) {
        currentCellIdx--;
    }
}

/**
 * Handler for the increment value '+' command.
 */
function incrementValue() {
    if (memory[currentCellIdx].value < 255) {
        (memory[currentCellIdx].value)++;
    }
}

/**
 * Handler for the decrement value '-' command.
 */
function decrementValue() {
    if (memory[currentCellIdx].value > 0) {
        (memory[currentCellIdx].value)--;
    }
}

/**
 * Handler for the input ',' command.
 * Gets one input character from the user according to the current runningMethod.
 * 
 * @param {RunningMethodEnum} runningMethod 
 */
function inputCommand(runningMethod) {
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        if (currentInputIdx >= input.length) {
            alert("Error: Input out of bounds");
            // TODO: Stop execution
            return;
        }
        let inputByte = input[currentInputIdx];
        memory[currentCellIdx].value = inputByte.charCodeAt(0);
        currentInputIdx++;
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        let inputByte = prompt("Please enter a value between 0-255");
        if (inputByte >= 0 && inputByte <= 255) {
            memory[currentCellIdx].value = inputByte;
        }
        else {
            alert("Error: Inncorrect input value");
            // TODO: Stop execution
        }
    }
}

/**
 * Handler for the output '.' command.
 */
function outputCommand() {
    var value = memory[currentCellIdx].value;
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
function startLoop() {
    var value = memory[currentCellIdx].value;
    if (value != 0) {
        loopStartIdxs.push(new Loop(currentCommandIdx, true));
    }
    else {
        loopStartIdxs.push(new Loop(currentCommandIdx, false));
    }
}

/**
 * Handler for the end loop '[' command.
 */
function endLoop() {
    if (loopStartIdxs.length == 0) {
        // TODO: Handle syntax error
        return;
    }
    var value = memory[currentCellIdx].value;
    if (value != 0) {
        currentCommandIdx = loopStartIdxs[loopStartIdxs.length - 1].idx;
    }
    else {
        loopStartIdxs.pop();
    }
}

/**
 * Select the correct handler for the current command of the tape and execute it
 * according to the current runningMethod.
 * 
 * @param {char} command 
 * @param {RunningMethodEnum} runningMethod 
 */
function runCommand(command, runningMethod) {
    if (supportedCommands.indexOf(command) == -1 && ignoredCommands.indexOf(command) == -1) {
        // TODO: Handle wrong command error
        alert("Invalid command " + command + " = " + command.charCodeAt(0) + " at idx: " + currentCommandIdx);
    }
    if (loopStartIdxs.length == 0 || loopStartIdxs[loopStartIdxs.length - 1].valid) {
        if (command == '>') {
            incrementPointer();
        }
        else if (command == '<') {
            decrementPointer();
        }
        else if (command == '+') {
            incrementValue();
        }
        else if (command == '-') {
            decrementValue();
        }
        else if (command == ',') {
            inputCommand(runningMethod);
        }
        else if (command == '.') {
            outputCommand();
        }
    }

    if (command == '[') {
        startLoop();
    }
    else if (command == ']') {
        endLoop();
    }
    if (runningMethod == RunningMethodEnum.RUN_VISUALIZE || runningMethod == RunningMethodEnum.VISUALIZE) {
        drawMemory();
    }
}

/**
 * Get one new command from the user according to the current runningMethod.
 * 
 * @param {RunningMethodEnum} runningMethod 
 */
var nextCommand = function nextCommandItself(runningMethod) {
    if (finished) {
        return;
    }
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        if (currentCommandIdx >= commands.length) {
            finished = true;
            return;
        }
        let nextCommand = commands[currentCommandIdx];
        runCommand(nextCommand, runningMethod);
        currentCommandIdx++;
        if (runningMethod == RunningMethodEnum.RUN) {
            nextCommandItself(runningMethod);
        }
        if (runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
            setTimeout(function(){
                nextCommandItself(runningMethod);
            }, instructionBaseTime / speedRange.value);
        }
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        if (currentCommandIdx >= commands.length) {
            return;
        }
        let nextCommand = commands[currentCommandIdx];
        runCommand(nextCommand, runningMethod);
        currentCommandIdx++;
        if (currentCommandIdx < commands.length) {
            setTimeout(function(){
                nextCommandItself(runningMethod);
            }, instructionBaseTime / speedRange.value);
        }
    }
}

/**
 * Run a Brainfuck program according to the selected runningMethod.
 * Init all the necessary elements for the interpreter and the canvas.
 * 
 * @param {RunningMethodEnum} runningMethod 
 */
function runCode(runningMethod) {
    clearCanvas();
    initInterpreter();
    initGUI(runningMethod);
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        keyPressedListenerActive = false;
        commands = document.getElementById("codeTextArea").value;
        input = document.getElementById("inputTextArea").value;
        if (runningMethod == RunningMethodEnum.RUN) {
            nextCommand(runningMethod);
        }
        else if (runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
            setTimeout(function(){
                nextCommand(runningMethod);
            }, instructionBaseTime / speedRange.value);
        }
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        keyPressedListenerActive = true;
        commands = "";
    }
}

/**
 * Add a listener for the keyboard when the runningMethod is VISUALIZE to run the program
 * in real time.
 */
function addOnKeyPressedListener() {
    $(document).keypress(function(event){
        if (keyPressedListenerActive) {
            event.preventDefault();
            if (event.keyCode == ENTER_KEY_CODE) {
                keyPressedListenerActive = false;
                return;
            }
            // alert(String.fromCharCode(event.which));
            commands = commands + String.fromCharCode(event.which);
            nextCommand(RunningMethodEnum.VISUALIZE);
        }
    });
}

/**
 * Creates a string representation of the current state of the memory.
 * 
 * @return string A string representation of the memory
 */
function memoryToString() {
    s = "";
    s += "[";
    for(i = 0; i < memory.length; i++) {
        s += memory[i].value + (i == memory.length - 1 ? "" : ",");
    }
    s += "]";
    return s;
}

/**
 * Creates a string representation of the current state of the loops.
 * 
 * @return string A string representation of the loops
 */
function loopsToString() {
    s = "";
    s += "[";
    for(i = 0; i < loopStartIdxs.length; i++) {
        s += "(" + loopStartIdxs[i].idx + ", " + loopStartIdxs[i].valid + ")" + (i == loopStartIdxs.length - 1 ? "" : ",");
    }
    s += "]";
    return s;
}

/**
 * Draw the state of each memory cell in the canvas and renders it.
 */
function drawMemory() {
    for (i = 0; i < memory.length; i++) {
        memory[i].draw(i, currentCellIdx, textFont);
    }
    render();
}

$( document ).ready(function(){
    document.getElementById("btnRun").onclick = function() { runCode(RunningMethodEnum.RUN); };
    document.getElementById("btnRunVisualize").onclick = function() { runCode(RunningMethodEnum.RUN_VISUALIZE); };
    document.getElementById("btnVisualize").onclick = function() { runCode(RunningMethodEnum.VISUALIZE); };
    addOnKeyPressedListener();
    loadFont("https://juliannieb.github.io/BrainfuckInterpreterVisualizer/fonts/helvetiker_regular.typeface.json");
})