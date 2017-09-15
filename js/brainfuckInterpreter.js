var memory = [];
var currentCellIdx = 0;
var commands = "";
var currentCommandIdx = 0;
var loopStartIdxs = [];
var finished = false;

function init() {
    memory = [];
    currentCellIdx = 0;
    commands = "";
    currentCommandIdx = 0;
    loopStartIdxs = [];
    finished = false;
    memory.push(createCell());
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
        // TODO: handle and save input
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        // TODO: handle and save input
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
        alert("Invalid command " + command + " = " + command.charCodeAt(0));
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
        // TODO: handle this running method
    }
}

function runCode(runningMethod) {
    init();
    if (runningMethod == RunningMethodEnum.RUN || runningMethod == RunningMethodEnum.RUN_VISUALIZE) {
        commands = document.getElementById("codeTextArea").value;
        while(!finished) {
            nextCommand(runningMethod);
        }
    }
    else if (runningMethod == RunningMethodEnum.VISUALIZE) {
        // TODO: handle this running method
    }
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
})