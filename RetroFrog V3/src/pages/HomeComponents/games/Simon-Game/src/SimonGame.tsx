import ColorCard from "./components/ColorCard";
import "./Simon.css";

function SimonGame() {
    return (
        <>
            <header className="SimonGame-header">
                <div className="cardWrapper">
                    <ColorCard color="green"></ColorCard>
                    <ColorCard color="red"></ColorCard>
                    <ColorCard color="blue"></ColorCard>
                    <ColorCard color="yellow"></ColorCard>
                </div >
                <button className="startButton">Start</button>
            </header >
        </>
    )
}

export default SimonGame;