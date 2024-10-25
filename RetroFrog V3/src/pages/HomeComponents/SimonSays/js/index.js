let order = []; //Llleva el orden de iluminacion 
let playerOrder = []; //El orden en el que el jugador da a los botones
let flash; //El numero de flases
let turn;
let good; //boolean para ver si el jugador lo hace bien
let compTurn; //boolean si es el turno del jugador u ordenador
let intervalId;
let strict = false;
let noise = true; //Para ver si ponemos sonido
let on = false; //Si esta encendido
let win; //Para saber si gana

const turnCounter = document.querySelector("#turn"); //Seleccionamos el elemento con el id turn
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

//====Primero mecanicas de botones del circulo central para encender...===
strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
}); //Va a estar escuchando o esperando para un evento 

onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-"; //innerHTML se puede usar en cualquier elemento HTML para cambiar a algo diferente, aqui ponemos dentro de las etiquetas un -
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor(); //Al apagarlo, se deben apagar los botones de colores
        clearInterval(intervalId); //Si se apaga el juego se reinicia el intervalo
    }
});

startButton.addEventListener('click', (event) => {
    if (on || win) { //Si on ==true || win==true
        play(); //Llamamos a la funcion jugar
    }
});

function play() {
    //Establecemos las variables de inicio de juego
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true; //El jugador no ha fallado

    //Necesitamos un bulce for para rellenar o establecer el orden aleatorio del juego
    for (var i = 0; i < 20; i++) { //En el juego es hasta 20 rondas //Se crea un array de 20 numeros aleatorios entre el 1 y el 4
        order.push(Math.floor(Math.random() * 4) + 1); //Sale un decimal aleatorio que se multiplica por 4 y sale un numero entre 1 y 5 y floor lo aproxima al mas bajo (del 1 al 4)
    }

    compTurn = true; //Empieza el turno del ordenador

    //Ahora empezamos el primer turno
    intervalId = setInterval(gameTurn, 800); //setInterval quiere decir que va a llamar a una funcion despues de x milisegundos, en este caso es para flashear una luz cada 800 milisegundos hasta que el intervalo se acabe que sera cuando todas las luces hayan saltado
};

function gameTurn() {
    on = false; //Cuando este apagado no se puede hacer click en ningun boton de color

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true; //El jugador puede presionar un boton
    }

    //Una luz va a flashear cada 800 milisegundos y dentro del array se comprueba valor a valor y dependiendo del valor (1-4), se llama la funcion determinada
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) {
                one();
            } else if (order[flash] == 2) {
                two();
            } else if (order[flash] == 3) {
                three();
            } else if (order[flash] == 4) {
                four();
            }
            flash++;
        }, 200); //Hace algo cada x milisegundos
    }
};

function one() {
    if (noise) {
        let audio = document.getElementById("clip1"); //Crea un audio del clip1. Con getId no hay que poner # como con querySelector
        audio.play(); //Hacemos sonar el audio
    }
    noise = true;
    topLeft.style.backgroundColor = "lightGreen";
};

function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato"; //Color especifico
};

function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
};

function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
};

function clearColor() {
    topLeft.style.backgroundColor = "rgb(0, 145, 0)"; //verde
    topRight.style.backgroundColor = "rgb(158, 1, 1)"; //rojo
    bottomLeft.style.backgroundColor = "rgb(231, 175, 33)"; //amarillo
    bottomRight.style.backgroundColor = "rgb(1, 1, 173)"; //azul
};

function flashColor() {
    topLeft.style.backgroundColor = "lightGreen"; 
    topRight.style.backgroundColor = "tomato"; 
    bottomLeft.style.backgroundColor = "yellow"; 
    bottomRight.style.backgroundColor = "lightskyblue"; 
};

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        check(); //Para comprobar si es correcto
        one();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        check(); //Para comprobar si es correcto
        two();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);
        check(); //Para comprobar si es correcto
        three();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);
        check(); //Para comprobar si es correcto
        four();

        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check(){
    if(playerOrder[playerOrder.length-1]!=order[playerOrder.length-1]){ //Si el orden del jugador y orden real no coinciden da error
        good=false;
    }

    if(playerOrder.length==20 && good){ //Si estan en la ronda 20 y ha acertado todo
        winGame();
    }

    if(good==false){
        flashColor(); //Flashean los colores si fallas
        turnCounter.innerHTML="NO";

        setTimeout(()=>{ //Pasa un tiempo para reiniciar el turno o no dependiendo del modo de juego
            turnCounter.innerHTML=turn;
            clearColor();

            if(strict){
                play(); //Se reinicia el juego si esta en estricto
            } else {
                compTurn=true;
                flash=0;
                playerOrder=[];
                good=true;
                intervalId=setInterval(gameTurn,800);
            }
        },800);       

        noise=false; //Si se falla no suena nada
    }

    if(turn==playerOrder.length && good && !win){
        turn++;
        playerOrder=[];
        compTurn=true;
        flash=0;
        turnCounter.innerHTML=turn;
        intervalId=setInterval(gameTurn,800);
    }
};

function winGame(){
    flashColor();
    turnCounter.innerHTML="WIN";
    on=false; //No puede clickar nada
    win=true;
};