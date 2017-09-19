cellSize = 90;
spaceBetweenCells = 50;
textSpace = 90;
textSize = 13;

class MemoryCell {

    constructor(value, font) {
        this.value = value;
        this.addCube();
        this.addText(font);
    }

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