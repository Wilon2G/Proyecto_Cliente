// GameComponent.tsx
import { Game } from '@prisma/client';

interface GameComponentProps {
  game: Game;
}

export default function GameComponent({ game }: GameComponentProps) {
  // Separar el core de la consola
  const [consoleName, extension, core] = game.console.split(':');
  const sanitizedTitle = game.title.replace(/\s+/g, '');

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%' }}>
      {/* Mostrar información del juego */}
      <div style={{ marginBottom: '10px', fontSize: '1rem' }}>
        <strong>Title:</strong> {game.title} <br />
        <strong>Console:</strong> {consoleName} <br />
        <strong>Core:</strong> {core}
      </div>
      {/* Iframe para el juego */}
      <iframe
        src={`/assets/external/webretro/index.html?core=${core}&rom=${sanitizedTitle}.${extension}`}
        style={{
          border: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        className="rounded-md shadow-md"
      ></iframe>
    </div>
  );
}
