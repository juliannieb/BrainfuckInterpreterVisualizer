cellSize = 30;
spaceBetweenCells = 30;

class MemoryCell {

    constructor(value) {
        this.value = value;
        var geometry = new THREE.BoxBufferGeometry( cellSize, cellSize, cellSize );
        this.object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { 
            //color: Math.random() * 0xffffff 
            color: 0x777777
        } ) );
    }

    draw(idx, currentCellIdx) {
        if (idx == currentCellIdx) {
            this.object.material.emissive.setHex(0xff0000);
        }
        else {
            this.object.material.emissive.setHex(0x777777);
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
        
        var loader = new THREE.FontLoader();
        
        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
        
          var material = new THREE.MeshPhongMaterial( { color: 0x0033ff, specular: 0x555555, shininess: 30 } );
        
          var geometry = new THREE.TextGeometry( 'Hello three.js!', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelSegments: 5
          } );
        
          var mesh = new THREE.Mesh( geometry, material );
        
          scene.add(mesh);
        });
    }

}