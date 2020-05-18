class Pawn{
    constructor() {
        //console.log("sztos");
        this.pawnn = 0;
        this.place = 0;
        //this.sendingPar();
    }
    clicking(pawn,a)
    {
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
    }
    moving(place)
    {
        //console.log(place.position)
        //console.log(this.pawnn)
        this.place = place;
        this.pawnn.position.z = place.position.z;
        this.pawnn.position.x = place.position.x;
        
    }
    /*sendingPar()
    {
        setInterval(() => {
            net.parametersOfPawn(this.pawnn,this.place);
        }, 1000);
    }*/
}
