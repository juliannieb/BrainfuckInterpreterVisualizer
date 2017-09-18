cellSize = 60;
spaceBetweenCells = 30;
textSpace = 60;

class MemoryCell {

    constructor(value) {
        this.value = value;
        var geometry = new THREE.BoxBufferGeometry( cellSize, cellSize, cellSize );
        this.object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { 
            //color: Math.random() * 0xffffff 
            color: 0x777777,
            wireframe: true
        } ) );
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
        //object.rotation.x = Math.random() * 2 * Math.PI;
        //object.rotation.y = Math.random() * 2 * Math.PI;
        //object.rotation.z = Math.random() * 2 * Math.PI;
        //object.scale.x = Math.random() + 0.5;
        //object.scale.y = Math.random() + 0.5;
        //object.scale.z = Math.random() + 0.5;
        //objects.push(object);
        scene.add(this.object);

        var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );
        
        var geometry = new THREE.TextGeometry(this.value, {
            font: font,
            size: 10,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 5
        } );
        
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = this.object.position.x;
        mesh.position.y = this.object.position.y + textSpace;
        mesh.position.z = this.object.position.z;
        
        scene.add(mesh);
    }

}