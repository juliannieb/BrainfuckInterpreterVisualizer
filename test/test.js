let path = require('path');
let Classes = require(path.join(__dirname, 'classes'));
var assert = require('assert');

/*
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      let interpreter = new BrainfuckInterpreter(null);
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
*/

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

  });
});