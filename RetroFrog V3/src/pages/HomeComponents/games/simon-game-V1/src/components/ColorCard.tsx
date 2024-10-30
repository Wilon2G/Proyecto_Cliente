// components/ColorCard.tsx
type ColorCardProps = {
    color: string;
    onClick: (color: string) => void;
    flash: boolean;
};

export default function ColorCard({ color, onClick, flash }: ColorCardProps) {
    return (
        <div
            className={`colorCard ${color} ${flash ? "flash" : ""}`}
            onClick={() => onClick(color)}
        ></div>
    );
}
