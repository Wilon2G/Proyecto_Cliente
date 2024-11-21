// components/ColorCard.tsx
type ColorCardProps = {
  color: string;
  onClick: (color: string) => void;
  flash: boolean;
};

export default function ColorCard({ color, onClick, flash }: ColorCardProps) {
  return (
    <div
      className={`cardWrapper__${color}${flash ? '--flash' : ''}`}
      onClick={() => onClick(color)}
    ></div>
  );
}
