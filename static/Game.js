class Game{
    constructor(){
        //console.log("game")
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth/window.innerHeight,  
            0.1,  
            10000  
            );
        this.board = [
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 1],
             ];
        this.sizeOfBoard = 8;
        this.sizeOfBlock = 20;
        this.sizeOfPawn = 7;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.clickedBefore = 0;
        this.currentColor;
        this.status = false;
        this.enemyy = false;
        this.checkingEnemyMove();
        
    }

    makingBoard()
    {
        let scene = this.scene;
        var axes = new THREE.AxesHelper(1000)
        scene.add(axes)

        const loader = new THREE.TextureLoader();
        const bgTexture = loader.load('pictures/bcg2.jpg');
        scene.background = bgTexture;

        $("#root").append( this.renderer.domElement );

        let camera = this.camera
        camera.position.set(0,100,160);
        camera.lookAt(scene.position);

        var geometry = new THREE.BoxGeometry(this.sizeOfBlock, 5, this.sizeOfBlock);
        var white = new THREE.MeshBasicMaterial({ 
                side: THREE.DoubleSide, 
                map: new THREE.TextureLoader().load('pictures/whitee.jpg') ,
                transparent: true, 
                opacity: 0.8,
                
                })
        var black = new THREE.MeshBasicMaterial({ 
                side: THREE.DoubleSide, 
                map: new THREE.TextureLoader().load('pictures/blackk.jpg') ,
                transparent: true, 
                opacity: 0.8,
                
                })
        for(let i = 0; i < this.board.length; i++)
        {
            for(let j = 0; j < this.board[i].length; j++)
            {
                var cube
                if(this.board[i][j] == 1)
                {
                    cube = new THREE.Mesh(geometry, white);
                }
                else
                {
                    cube = new THREE.Mesh(geometry, black);
                }
                
                let positionn = -(this.sizeOfBoard/2 * this.sizeOfBlock - this.sizeOfBlock/2);
                cube.position.set(positionn+this.sizeOfBlock*i,0,positionn+this.sizeOfBlock*j);
                scene.add(cube);
            }
        }
        let renderer = this.renderer;
        //console.log(scene);
        function render() 
        {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
            render();
    }
    beginningPosition(pcolor)
    {
        this.currentColor = pcolor;
        if(pcolor == "black")
        {
            this.camera.position.z = 160 * Math.cos(Math.PI);
            this.camera.position.x = 160 * Math.sin(Math.PI);
            this.camera.lookAt(this.scene.position);
        }
        var geometry = new THREE.CylinderGeometry( this.sizeOfPawn, this.sizeOfPawn, 5, 32 );
        var playerColor = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide, 
            map: new THREE.TextureLoader().load('pictures/' + "white" + '.jpg'),
            transparent: true, 
            opacity: 1,
            })
        var enemyColor = new THREE.MeshBasicMaterial({ 
            side: THREE.DoubleSide, 
            map: new THREE.TextureLoader().load('pictures/' + "black" + '.jpg'),
            transparent: true, 
            opacity: 1,
            })

        let xPosition = -(this.sizeOfBoard/2*this.sizeOfBlock) + this.sizeOfBlock/2 //-(this.sizeOfBoard/2 * this.sizeOfBlock - this.sizeOfBlock/2) + this.sizeOfPawn * 0.25//-(this.sizeOfBoard/2 * this.sizeOfBlock - this.sizeOfBlock/2) + this.sizeOfPawn * 1.5;
        let zPosition = this.sizeOfBoard/4 * this.sizeOfBlock + this.sizeOfBlock/2//(this.sizeOfBoard/2 * this.sizeOfBlock - this.sizeOfBlock/2) + this.sizeOfPawn * 0.5;
        let transform = this.sizeOfBlock//(this.sizeOfBlock - (this.sizeOfBlock-this.sizeOfPawn*2)/2);
        let makingPawns = (color,pos)=>
        {
            for(let i = 0; i < this.sizeOfBoard; i++)
            {
                let z;
                if(i == 0 || i == 2 || i == 4 || i == 6)
                {
                    z = zPosition + transform;
                }
                else
                {
                    z = zPosition;
                }
                var pawn = new THREE.Mesh(geometry, color);
                pawn.position.set(xPosition + i * transform,5,z - transform * pos);
                this.scene.add(pawn);
            }
        }
        makingPawns(playerColor,0)
        makingPawns(enemyColor,(this.sizeOfBoard-2))
        //this.movingPawn();
    }

    movingPawn(colorrr)
    {
        this.status = true;
        var click = false;
        var pawnn;
        var clickedElement;
        var camera = this.camera;
        var scene = this.scene;

        var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        var mouseVector = new THREE.Vector2() 
        $(document).mousedown( (event)=> {
            if(this.status == true)
            {
               // console.log(colorrr);
                if(this.currentColor == colorrr);
                {
                    mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                    mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                    raycaster.setFromCamera(mouseVector, camera);
                    var intersects = raycaster.intersectObjects(scene.children);
                    if (intersects.length > 0) {
                        clickedElement = intersects[0].object;

                        let arr = clickedElement.material.map.image.src.split("/")

                        if(this.currentColor == (arr[arr.length-1]).split(".")[0])
                        {
                            //console.log(clickedElement.material.map.image)
                            if(clickedElement.geometry.type == "CylinderGeometry")
                            {
                                pawn.clicking(clickedElement,this.clickedBefore);
                                this.clickedBefore = clickedElement;
                                pawnn = clickedElement;
                                click = true;
                            }
                        }
                        
                        if(click == true && clickedElement.geometry.type == "BoxGeometry")
                        {
                            //console.log(clickedElement.material.map.image)
                            let arr = clickedElement.material.map.image.src.split("/")
                            if((arr[arr.length-1]).split(".")[0] == "blackk" && Math.abs(pawnn.position.x - clickedElement.position.x) == 20 && Math.abs(pawnn.position.z - clickedElement.position.z) == 20 && Math.abs(pawnn.position.z) > Math.abs(clickedElement.position.z))
                            {
                                //console.log(pawnn.position, clickedElement.position)
                                //console.log("może");
                                pawn.sendingPar(pawnn.position,clickedElement);
                                pawn.moving(clickedElement);
                                //pawn.clicking(pawnn);
                                this.status = false;
                                click = false;
                            }
                            
                        }
                    }   
                }  
            }
        })
    } 
    checkingEnemyMove()
    {
        setInterval(() => {
            if(this.currentColor != null)
            {
                net.parametersOfPawn();
            }  
        }, 1000);
    }
    enemyMove(pawn)
    {
           // console.log(JSON.parse(pawn));
            if(JSON.parse(pawn) != null)
            {
                this.scene.children.forEach(element => {
                    if(element.geometry.type == "CylinderGeometry")
                    {
                        //console.log(element.position);
                        if(element.position.x == JSON.parse(pawn)[0].x && element.position.z == JSON.parse(pawn)[0].z)
                        {
                            //console.log(element);
                            element.position.x = JSON.parse(pawn)[1].x;
                            element.position.z = JSON.parse(pawn)[1].z;
                        }
                    }                
                });

            }
    }
}