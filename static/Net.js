class Net{
    constructor(){
        console.log("net")
        this.waiting();
        this.enemyPawn;
        this.start = false;
        this.actualColor;
        this.movedEnemyy = false;
        this.timeTicking();
    }

    takeLogin(login)
    {
        $.ajax({
            url: "/",
            data: {login: login, action:"takingLogin"},
            type: "POST",
            success: function (login) 
            {
                $("header").text(login);
                if(login.includes("Udało Ci się zalogować"))
                {
                    $("#logowanie").remove();
                    var oczekiwanie = $("<div id = 'oczekiwanie'>Oczekiwanie na drugiego gracza </br></div>")
                    var img = $('<img src="pictures/loading.gif" alt="Smiley face" height="100" width="100">')
                    oczekiwanie.append(img);
                    $("main").append(oczekiwanie);
                    if(login.includes("białymi"))
                    {
                        game.beginningPosition("white");
                    }
                    else
                    {
                        game.beginningPosition("black");
                    }
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    waiting()
    {
        setInterval(()=>
        { 
            $.ajax({
                url: "/",
                data: {action:"waiting"},
                type: "POST",
                success: function (czekanie) 
                {
                    //console.log(czekanie);
                    if(czekanie == "true")
                    {
                        $("#oczekiwanie").remove();
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                },
            });
        }, 500);
    }
    reset()
    {
        console.log("reset");
        $.ajax({
            url: "/",
            data: {action:"reset"},
            type: "POST",
            success: function (reset) 
            {
                $("header").text(reset);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    movedPawn(pawn,place)
    {
        //console.log(pawn);
        $.ajax({
            url: "/",
            data: {action:"movedPawn",pawn:JSON.stringify(pawn),place:JSON.stringify(place.position)},//JSON.stringify(pawn.position)},
            type: "POST",
            success: function (parameters) 
            {
                console.log(parameters)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    parametersOfPawn()
    {
        //console.log(pawn);
        $.ajax({
            url: "/",
            data: {action:"parameters"},//JSON.stringify(pawn.position)},
            type: "POST",
            success: (parameters)=> 
            {
                if(parameters != this.enemyPawn)
                {
                    this.enemyPawn = parameters;
                    game.enemyMove(parameters);
                    
                    if(parameters != "null")
                    {
                        //console.log(parameters)
                        this.movedEnemyy = true;
                    }
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    timeTicking()
    {
        let i = 0;
        let start = "false";
        let playingColor = "white";
        setInterval(() => {
            //console.log(game.currentColor);
            if(i == 0)
            {
               $.ajax({
                    url: "/",
                    data: {action:"time"},
                    type: "POST",
                    success: function (status) 
                    {
                        //console.log(status);
                        if(start == "false")
                        {
                            start = status;
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                    },
                });
            }
            if(start == "true")
            {
                if(this.movedEnemyy == true)
                {
                    i = 0;
                    if(playingColor == "white")
                        {
                            playingColor = "black";
                        }
                        else{
                            playingColor = "white";
                        }
                    this.movedEnemyy = false;
                }

                if(this.movedEnemyy == true)
                {
                   // console.log(this.movedEnemyy)
                    this.movedEnemyy = false;
                }
                
                //console.log(i)
                if(i == 0)
                {
                    if(playingColor == game.currentColor)
                    {
                        //console.log(playingColor);
                        this.actualColor = playingColor;
                        //console.log(this.actualColor)
                        game.movingPawn(this.actualColor);
                        $("#dontMove").remove();
                    }
                    else
                    {
                        game.status = false;
                        var div = $("<div>").attr("id", "dontMove").text("Przycisk");
                        $("main").append(div);
                    }
                }
                    if(i <= 10)
                    {
                        $("#time").text( i + " s");
                        i++
                    }
                    else
                    {
                        i = 0;
                        if(playingColor == "white")
                        {
                            playingColor = "black";
                        }
                        else{
                            playingColor = "white";
                        }
                        //console.log(playingColor)
                    }
                
            }
            
        }, 1000);
        
    }
}