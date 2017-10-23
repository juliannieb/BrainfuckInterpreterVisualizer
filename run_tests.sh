cat js/utils.js > test/classes.js
cat js/brainfuckInterpreter.js >> test/classes.js
cat js/visualizer.js >> test/classes.js
cat js/memoryCell.js >> test/classes.js
cat js/loop.js >> test/classes.js
cat js/exports.js >> test/classes.js

node_modules/mocha/bin/mocha
