var net;
var ui;
var game;
var pawn;

$(document).ready(function () {
    net = new Net() // utworzenie obiektu klasy Net
    ui = new Ui() // utworzenie obiektu klasy Ui
    game = new Game();
    pawn = new Pawn();
    console.log("tralala")

    $("#loguj").on("click",function(){
        //console.log($("#login"));
        console.log($("#login")[0].value);
        net.takeLogin($("#login")[0].value);
    })
    $("#reset").on("click",function()
    {
        net.reset();
    })

    game.makingBoard();
 })