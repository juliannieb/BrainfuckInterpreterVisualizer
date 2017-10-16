/**
 * @file
 * This file contains any constants and methods needed in other files to have more control.
 */

let supportedCommands = ['>', '<', '+', '-', ',', '.', '[', ']'];
let ignoredCommands = [' ', '\n', '\t', '\0'];

let ENTER_KEY_CODE = 13;

let RunningMethodEnum = {
    RUN : 0,
    RUN_VISUALIZE: 1,
    VISUALIZE: 2
}