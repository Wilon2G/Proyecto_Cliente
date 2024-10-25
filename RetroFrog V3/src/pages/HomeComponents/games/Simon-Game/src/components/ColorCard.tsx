type ColorCard = {
    color: string,
    onClick:,
    flashColor: boolean
}


export default function ColorCard({ color, onClick, flashColor }: ColorCard) {
    return (
        <div className={`colorCard ${color} ${flashColor ? "flash" : ""}`} onClick={onClick}>

        </div>
    )
}