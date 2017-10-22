var interpreter;
var visualizer;

$( document ).ready(function(){
    visualizer = new Visualizer();
    visualizer.initVisualizer();
    visualizer.render();
    var loader = new THREE.FontLoader();
    loader.load("https://juliannieb.github.io/BrainfuckInterpreterVisualizer/fonts/helvetiker_regular.typeface.json", function ( font ) {
        interpreter = new BrainfuckInterpreter(font);
        document.getElementById("btnRun").onclick = function() { interpreter.runCode(RunningMethodEnum.RUN); };
        document.getElementById("btnRunVisualize").onclick = function() { interpreter.runCode(RunningMethodEnum.RUN_VISUALIZE); };
        document.getElementById("btnVisualize").onclick = function() { interpreter.runCode(RunningMethodEnum.VISUALIZE); };
    });
})
