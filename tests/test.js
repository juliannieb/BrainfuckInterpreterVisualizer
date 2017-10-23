let path = require('path');
let Classes = require(path.join(__dirname, 'classes'));
var assert = require('assert');


describe('BrainfuckInterpreter', () => {
    describe('Interpreter', () => {
        let interpreter;

        beforeEach(() => {
            // Create a new BrainfuckInterpreter object before every test.
            interpreter = new Classes.BrainfuckInterpreter(null);
        });

        it('constructor', () => {
            // This will fail if "interpreter.memory.length" is
            // not equal to 1.
            assert.equal(1, interpreter.memory.length);
        });

        it('commandNextPointer', () => {
            // This will fail if "interpreter.memory.length" is
            // not equal to 2.
            // This will fail if "interpreter.currentCellIdx" is
            // not equal to 1.
            // This will fail if if "interpreter.memory[interpreter.currentCellIdx].value" is
            // not equal to 0.
            interpreter.runCommand('>', 0);
            assert.equal(2, interpreter.memory.length);
            assert.equal(1, interpreter.currentCellIdx);
            assert.equal(0, interpreter.memory[interpreter.currentCellIdx].value);
        });

        it('commandPreviousPointer', () => {
            // This will fail if "interpreter.memory.length" is
            // not equal to 2.
            // This will fail if "interpreter.currentCellIdx" is
            // not equal to 0.
            // This will fail if if "interpreter.memory[interpreter.currentCellIdx].value" is
            // not equal to 0.
            interpreter.runCommand('>', 0);
            interpreter.runCommand('<', 0);
            assert.equal(2, interpreter.memory.length);
            assert.equal(0, interpreter.currentCellIdx);
            assert.equal(0, interpreter.memory[interpreter.currentCellIdx].value);
        });

        it('commandIncrementValue', () => {
            // This will fail if "interpreter.memory.length" is
            // not equal to 1.
            // This will fail if "interpreter.currentCellIdx" is
            // not equal to 0.
            // This will fail if if "interpreter.memory[interpreter.currentCellIdx].value" is
            // not equal to 1.
            interpreter.runCommand('+', 0);
            assert.equal(1, interpreter.memory.length);
            assert.equal(0, interpreter.currentCellIdx);
            assert.equal(1, interpreter.memory[interpreter.currentCellIdx].value);
        });

        it('commandDecrementValue', () => {
            // This will fail if "interpreter.memory.length" is
            // not equal to 1.
            // This will fail if "interpreter.currentCellIdx" is
            // not equal to 0.
            // This will fail if if "interpreter.memory[interpreter.currentCellIdx].value" is
            // not equal to 1.
            interpreter.runCommand('+', 0);
            interpreter.runCommand('+', 0);
            interpreter.runCommand('-', 0);
            assert.equal(1, interpreter.memory.length);
            assert.equal(0, interpreter.currentCellIdx);
            assert.equal(1, interpreter.memory[interpreter.currentCellIdx].value);
        });

        it('commandInput', () => {
            // This will fail if "interpreter.memory.length" is
            // not equal to 1.
            // This will fail if "interpreter.currentCellIdx" is
            // not equal to 0.
            // This will fail if if "interpreter.memory[interpreter.currentCellIdx].value" is
            // not equal to 65.
            interpreter.input = "A";
            interpreter.runCommand(',', 0);
            assert.equal(1, interpreter.memory.length);
            assert.equal(0, interpreter.currentCellIdx);
            assert.equal(65, interpreter.memory[interpreter.currentCellIdx].value);
        });

        it('commandLoops', () => {
            // This will fail if "interpreter.memory.length" is
            // not equal to 3.
            // This will fail if "interpreter.currentCellIdx" is
            // not equal to 0.
            // This will fail if if "interpreter.memory[2].value" is
            // not equal to 6.
            interpreter.commands = "+++[>++[>+<-]<-]";
            interpreter.nextCommand(0);
            assert.equal(3, interpreter.memory.length);
            assert.equal(0, interpreter.currentCellIdx);
            assert.equal(6, interpreter.memory[2].value);
        });

    });
});

describe('MemoryCell', () => {
    describe('MemoryCell', () => {
        let memoryCell;

        beforeEach(() => {
            // Create a new MemoryCell object before every test.
            memoryCell = new Classes.MemoryCell(65);
        });

        it('constructor', () => {
            // This will fail if "memoryCell.value" is
            // not equal to 65
            assert.equal(65, memoryCell.value);
        });
    });
});

describe('Loop', () => {
    describe('Loop', () => {
        let loop;

        beforeEach(() => {
            // Create a new Loop object before every test.
            loop = new Classes.Loop(6, true);
        });

        it('constructor', () => {
            // This will fail if "loop.idx" is
            // not equal to 65
            // This will fail if "loop.valid" is
            // not equal to true
            assert.equal(6, loop.idx);
            assert.equal(true, loop.valid);
        });
    });
});