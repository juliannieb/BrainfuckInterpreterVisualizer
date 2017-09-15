var memory = [];
var currentIdx = 0;
var currentInstructionIdx = 0;
var loopStartIdxs = [];

function init() {
    memory = [];
    currentIdx = 0;
    currentInstructionIdx = 0;
    loopStartIdxs = [];
    memory.push(createCell());
}

function createCell() {
    return new MemoryCell(65);
}

function incrementPointer() {
    currentIdx++;
    while (currentIdx >= memory.length) {
        memory.push(createCell());
    }
}

function decrementPointer() {
    if (currentIdx > 0) {
        currentIdx--;
    }
}

function incrementValue() {
    if (memory[currentIdx].value < 255) {
        (memory[currentIdx].value)++;
    }
}

function decrementValue() {
    if (memory.currentIdx.value > 0) {
        (memory[currentIdx].value)--;
    }
}

function inputCommand(source) {
    if (source == InputSourceEnum.INPUT_TEXT_BOX) {
        // TODO: handle and save input
    }
    else if (source == InputSourceEnum.KEYBOARD) {
        // TODO: handle and save input
    }
}

function outputCommand() {
    var value = memory[currentIdx].value;
    if (value >= 0 && value <= 255) {
        var valChar = String.fromCharCode(value);
        var outputTextBox = document.getElementById("outputTextArea");
        var outputSoFar = outputTextBox.value;
        var newOutput = outputSoFar + valChar;
        outputTextBox.value = newOutput;
    }
}

function startLoop() {
    var value = memory[currentIdx].value;
    if (value == 0) {
        loopStartIdxs.push(currentInstructionIdx);
    }
}

function endLoop() {
    if (loopStartIdxs.length == 0) {
        // TODO: Handle syntax error
        return;
    }
    var value = memory[currentIdx].value;
    if (value != 0) {
        currentInstructionIdx = loopStartIdxs[loopStartIdxs.length - 1];
    }
    else {
        loopStartIdxs.pop();
    }
}

function runCommand(command, source) {
    if (supportedCommands.indexOf(command) == -1) {
        // TODO: Handle wrong command error
        alert("Invalid command");
    }
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
        inputCommand(source);
    }
    else if (command == '.') {
        outputCommand();
    }
    else if (command == '[') {
        startLoop();
    }
    else if (command == ']') {
        endLoop();
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

function testCase() {
    init();
    let source = InputSourceEnum.INPUT_TEXT_BOX;
    runCommand('>', source);
    runCommand('>', source);
    runCommand('+', source);
    runCommand('<', source);
    runCommand('+', source);
    runCommand('+', source);
    runCommand('<', source);
    runCommand('<', source);
    runCommand(',', source);
    runCommand('.', source);
    runCommand('>', source);
    runCommand('.', source);
    runCommand('>', source);
    runCommand('.', source);
}

$( document ).ready(function(){
    testCase();
})