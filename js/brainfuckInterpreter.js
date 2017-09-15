var memory = [];
var currentIdx = 0;
var commands = "";
var currentCommandIdx = 0;
var loopStartIdxs = [];
var finished = false;

function init() {
    memory = [];
    currentIdx = 0;
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
    if (memory[currentIdx].value > 0) {
        (memory[currentIdx].value)--;
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
    if (value != 0) {
        loopStartIdxs.push([currentCommandIdx, true]);
    }
    else {
        loopStartIdxs.push([currentCommandIdx, false]);
    }
}

function endLoop() {
    if (loopStartIdxs.length == 0) {
        // TODO: Handle syntax error
        return;
    }
    var value = memory[currentIdx].value;
    if (value != 0) {
        currentCommandIdx = loopStartIdxs[loopStartIdxs.length - 1][0] - 1;
    }
    else {
        loopStartIdxs.pop();
    }
}

function runCommand(command, runningMethod) {
    if (supportedCommands.indexOf(command) == -1) {
        // TODO: Handle wrong command error
        alert("Invalid command");
    }
    if (loopStartIdxs.length == 0 || loopStartIdxs[loopStartIdxs.length - 1][1]) {
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
        runCommand(nextCommand);
        //alert(memoryToString());
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
        commands = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";
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
    runCode(RunningMethodEnum.RUN);
})