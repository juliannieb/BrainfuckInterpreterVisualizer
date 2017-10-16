let cellSize = 90;
let spaceBetweenCells = 50;
let textSpace = 90;
let textSize = 13;

/**
 * Class representing a cell of memory of the program execution.
 */
class MemoryCell {

    /**
     * Constructor for a new MemoryCell object.
     * 
     * @param {int} value - Initial value for the cell
     * @param {Font} font - Font for drawing the value
     */
    constructor(value, font) {
        this.value = value;
        this.addCube();
        this.addText(font);
    }

    /**
     * Creates a cube mesh and adds it to the cell for it to be updated and drawn later.
     */
    addCube() {
        var geometry = new THREE.BoxBufferGeometry( cellSize, cellSize, cellSize );
        this.object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { 
            //color: Math.random() * 0xffffff 
            color: 0x777777,
            wireframe: true
        } ) );
        this.object.position.x = 0;
        this.object.position.y = 0;
        this.object.position.z = 0;
        scene.add(this.object);
    }

    /**
     * Create a text mesh for drawing the value of the cell and adds it in the scene.
     * 
     * @param {Font} font - The font previously loaded for drawing the cell value
     */
    addText(font) {
        var textMaterial = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );
        var textGeometry = new THREE.TextGeometry(this.value, {
            font: font,
            size: textSize,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 5
        } );
        this.textMesh = new THREE.Mesh( textGeometry, textMaterial );
        this.textMesh.position.x = this.object.position.x;
        this.textMesh.position.y = this.object.position.y + textSpace;
        this.textMesh.position.z = this.object.position.z;
        scene.add(this.textMesh);
    }

    /**
     * Draw the cell in the scene with the corresponding coordinates according to the
     * cell index and the current pointer index.
     * 
     * @param {int} idx - Index of the cell
     * @param {int} currentCellIdx - Index of the current pointer
     * @param {Font} font - Font to draw the cell value
     */
    draw(idx, currentCellIdx, font) {
        if (idx == currentCellIdx) {
            this.object.material.color.setHex(0xff0000);
        }
        else {
            this.object.material.color.setHex(0x777777);
        }
        this.object.position.x = 0 + ((cellSize + spaceBetweenCells) * (idx - currentCellIdx));
        this.object.position.y = 0;
        this.object.position.z = 0;

        scene.remove(this.textMesh);
        this.addText(font);
    }

}