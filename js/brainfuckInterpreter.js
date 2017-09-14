var memory = [];
var currentIdx = 0;

function init() {
    memory = [];
    memory.push(createCell());
}

function createCell() {
    return new MemoryCell(0);
}

function incrementPointer() {
    currentIdx++;
}

function decrementPointer() {
    currentIdx--;
}

function incrementValue() {
    (memory[currentIdx].value)++;
}

function decrementValue() {
    (memory[currentIdx].value)--;
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

init();
alert(memoryToString());