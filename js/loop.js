/**
 * Class representing a loop in the code execution.
 */
class Loop {

    /**
     * Constructor for a Loop object
     * 
     * @param {int} idx - Starting index of the loop
     * @param {bool} valid - True if the loop is valid (current pointer value != 0), otherwise false
     */
    constructor(idx, valid) {
      this.idx = idx;
      this.valid = valid;
    }

}