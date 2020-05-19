class Pawn{
    constructor() {
        //console.log("sztos");
        this.pawnn = 0;
        this.place = 0;
        this.enemyPawn;
        //this.sendingPar();
    }
    clicking(pawn,a)
    {
        var newMaterial = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide, 
            map: new THREE.TextureLoader().load('pictures/bcg.jpg') ,
            transparent: true, 
            opacity: 0.8,
            
            })
        var mater = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide, 
            map: new THREE.TextureLoader().load('pictures/'+ game.currentColor +'.jpg') ,
            transparent: true, 
            opacity: 0.8,
            })
        if(a != 0)
        {
           // a.material = mater;
        }

        this.pawnn = pawn;
        //console.log(pawn);
        //console.log(a);
        //pawn.position.z = pawn.position.z - 20;
        function render() {
            if(a != pawn)
            {
                if(a != 0)
                {
                    a.rotation.y -= 0.03;
                }
                pawn.rotation.y += 0.03;
            }   
            requestAnimationFrame(render);

        }
        render();
       // pawn.material =  newMaterial;
        
        game.scene.children.forEach(element => {
            if(element.geometry.type == "BoxGeometry")
                {
                    //console.log(element.material.map.image)
                    let arr = element.material.map.image.src.split("/")
                    if((arr[arr.length-1]).split(".")[0] == "bcg")
                    {
                            var mat = new THREE.MeshBasicMaterial({ 
                                side: THREE.DoubleSide, 
                                map: new THREE.TextureLoader().load('pictures/blackk.jpg') ,
                                transparent: true, 
                                opacity: 0.8,
                                })
                            //console.log(element.material);
                            //element.material = mat;
                            //element.material.map.image.src = 'pictures/blackk.jpg'
                    }
                    if(Math.abs(pawn.position.x - element.position.x) == 20 && Math.abs(pawn.position.z - element.position.z) == 20  &&  Math.abs(pawn.position.z) > Math.abs(element.position.z))
                    {
                        //element.material = newMaterial;
                        console.log(element)
                    }
                }
        });
    }
    moving(place)
    {
        var mat = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide, 
            map: new THREE.TextureLoader().load('pictures/'+ game.currentColor+'.jpg') ,
            transparent: true, 
            opacity: 0.8,
            })
      //  this.pawnn.material = mat;
        this.place = place;
        this.pawnn.position.z = place.position.z;
        this.pawnn.position.x = place.position.x;
        game.scene.children.forEach(element => {
            if(element.geometry.type == "BoxGeometry")
                {
                    let arr = element.material.map.image.src.split("/")
                    if((arr[arr.length-1]).split(".")[0] == "bcg")
                    {
                        var newMaterial = new THREE.MeshBasicMaterial({ 
                            side: THREE.DoubleSide, 
                            map: new THREE.TextureLoader().load('pictures/blackk.jpg') ,
                            transparent: true, 
                            opacity: 0.8,
                            
                            })
                        //console.log(element.material);
                        //element.material = newMaterial;
                    }
                }
        });
    }
    sendingPar(pawn,place)
    {
        net.movedPawn(pawn,place);
        //console.log(pawn);
    }
}
