let path = require('path');
let Classes = require(path.join(__dirname, 'classes'));
var assert = require('assert');


describe('BrainfuckInterpreter', () => {
    describe('Interpreter', () => {
        let interpreter;

        beforeEach(() => {
            // Create a new Rectangle object before every test.
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

    });
});
