var interpreter;
var visualizer;

$( document ).ready(function(){
    visualizer = new Visualizer();
    visualizer.initVisualizer();
    visualizer.render();
    var loader = new THREE.FontLoader();
    loader.load("https://juliannieb.github.io/BrainfuckInterpreterVisualizer/fonts/helvetiker_regular.typeface.json", function ( font ) {
        interpreter = new BrainfuckInterpreter(font);
        addOnKeyPressedListener(interpreter);
        document.getElementById("btnRun").onclick = function() { interpreter.runCode(RunningMethodEnum.RUN); };
        document.getElementById("btnRunVisualize").onclick = function() { interpreter.runCode(RunningMethodEnum.RUN_VISUALIZE); };
        document.getElementById("btnVisualize").onclick = function() { interpreter.runCode(RunningMethodEnum.VISUALIZE); };
    });
})

/**
 * Add a listener for the keyboard when the runningMethod is VISUALIZE to run the program
 * in real time.
 */
function addOnKeyPressedListener(interpreter) {
    $(document).keypress(function(event){
        if (interpreter.keyPressedListenerActive) {
            event.preventDefault();
            if (event.keyCode == ENTER_KEY_CODE) {
                interpreter.keyPressedListenerActive = false;
                return;
            }
            // alert(String.fromCharCode(event.which));
            interpreter.commands = interpreter.commands + String.fromCharCode(event.which);
            interpreter.nextCommand(RunningMethodEnum.VISUALIZE);
        }
    });
}
