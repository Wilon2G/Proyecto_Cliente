import './Simon.scss';
import React, { useState, useEffect } from "react";

function SimonGame() {

    const [gameOn, setGameOn] = useState(false);
    const [flashMode, setFlashMode] = useState(false);
    const [colorArray, setColorArray] = useState([]);


    let arrayOfColors = ['green', 'red', 'orange', 'blue'];

    function startGameHandle() {
        setGameOn(true);
    };

    function generateRandomColor() {
        return arrayOfColors[Math.floor(Math.random() * 4)];
    };

    //======
    // Add a new color to a copy of the empty colorArray
    //======
    function addColor() {
        const copyOfColorArray = [...colorArray];
        const newColor = generateRandomColor();
        copyOfColorArray.push(newColor);
        setColorArray(copyOfColorArray);
        console.log(copyOfColorArray);
    }

    useEffect(() => {
        if (gameOn) {
            console.log('Game On!');
            setFlashMode(true);
        } else {
            console.log('Game Off!');
        }
    }, [gameOn]);


    useEffect(() => {
        if (gameOn && flashMode) {
            //flash color sequence
            console.log('Flash is on!');
            addColor();
        }
    }, [gameOn, flashMode]);

    return (
        <div className="App">

            <header className="App-header">
                <h1>Simon Says Game</h1>

                <div className="container">
                    <div className="colorCards green"></div>
                    <div className="colorCards red"></div>
                    <div className="colorCards orange"></div>
                    <div className="colorCards blue"></div>
                    <div className="startButton" onClick={startGameHandle}>START</div>
                </div>
            </header>

        </div>
    );
}

export default SimonGame;