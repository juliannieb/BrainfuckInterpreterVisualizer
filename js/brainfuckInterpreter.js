var memory = [];
var currentIdx = 0;

function init() {
    memory = [];
    currentIdx = 0;
    memory.push(createCell());
}

function createCell() {
    return new MemoryCell(0);
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
    // alert(memoryToString());
    incrementPointer();
    incrementPointer();
    incrementValue();
    // alert(memoryToString());
    decrementPointer();
    incrementValue();
    incrementValue();
    decrementPointer();
    decrementPointer();
    // alert(memoryToString());
    // alert(currentIdx);
    inputCommand(InputSourceEnum.INPUT_TEXT_BOX);
    outputCommand();
    incrementPointer();
    outputCommand();
    incrementPointer();
    outputCommand();
}

$( document ).ready(function(){
    testCase();
})