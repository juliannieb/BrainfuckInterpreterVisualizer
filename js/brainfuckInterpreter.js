var memory = [];
var currentCellIdx = 0;
var commands = "";
var input = "";
var currentCommandIdx = 0;
var currentInputIdx = 0;
var loopStartIdxs = [];
var finished = false;
var keyPressedListenerActive = false;

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

function initGUI(runningMethod) {
    document.getElementById("outputTextArea").value = "";
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        keyPressedListenerActive = false;
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        keyPressedListenerActive = true;
    }
}

function createCell() {
    return new MemoryCell(0);
}

function incrementPointer() {
    currentCellIdx++;
    while (currentCellIdx >= memory.length) {
        memory.push(createCell());
    }
}

function decrementPointer() {
    if (currentCellIdx > 0) {
        currentCellIdx--;
    }
}

function incrementValue() {
    if (memory[currentCellIdx].value < 255) {
        (memory[currentCellIdx].value)++;
    }
}

function decrementValue() {
    if (memory[currentCellIdx].value > 0) {
        (memory[currentCellIdx].value)--;
    }
}

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

function startLoop() {
    var value = memory[currentCellIdx].value;
    if (value != 0) {
        loopStartIdxs.push(new Loop(currentCommandIdx, true));
    }
    else {
        loopStartIdxs.push(new Loop(currentCommandIdx, false));
    }
}

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
}

function nextCommand(runningMethod) {
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        if (currentCommandIdx >= commands.length) {
            finished = true;
            return;
        }
        let nextCommand = commands[currentCommandIdx];
        runCommand(nextCommand, runningMethod);
        currentCommandIdx++;
        // TODO: handle visualization or not
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        if (currentCommandIdx >= commands.length) {
            return;
        }
        let nextCommand = commands[currentCommandIdx];
        runCommand(nextCommand, runningMethod);
        currentCommandIdx++;
    }
}

function runCode(runningMethod) {
    initInterpreter();
    initGUI(runningMethod);
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        keyPressedListenerActive = false;
        commands = document.getElementById("codeTextArea").value;
        input = document.getElementById("inputTextArea").value;
        while(!finished) {
            nextCommand(runningMethod);
        }
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        keyPressedListenerActive = true;
        commands = "";
    }
}

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
            while (currentCommandIdx < commands.length) {
                nextCommand(RunningMethodEnum.VISUALIZE);
            }
        }
    });
}

function memoryToString() {
    s = "";
    s += "[";
    for(i = 0; i < memory.length; i++) {
        s += memory[i].value + (i == memory.length - 1 ? "" : ",");
    }
    s += "]";
    return s;
}

function loopsToString() {
    s = "";
    s += "[";
    for(i = 0; i < loopStartIdxs.length; i++) {
        s += "(" + loopStartIdxs[i].idx + ", " + loopStartIdxs[i].valid + ")" + (i == loopStartIdxs.length - 1 ? "" : ",");
    }
    s += "]";
    return s;
}

$( document ).ready(function(){
    document.getElementById("btnRun").onclick = function() { runCode(RunningMethodEnum.RUN); };
    document.getElementById("btnRunVisualize").onclick = function() { runCode(RunningMethodEnum.RUN_VISUALIZE); };
    document.getElementById("btnVisualize").onclick = function() { runCode(RunningMethodEnum.VISUALIZE); };
    addOnKeyPressedListener();
})