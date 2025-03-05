// GameComponent.tsx
import { Game } from '@prisma/client';

interface GameComponentProps {
  game: Game | null;
}

export default function GameComponent({ game }: GameComponentProps) {
  // Separar el core de la consola

  if (!game) {
    return <></>;
  } else {
    const [consoleName, extension, core] = game.console.split(':');
    const sanitizedTitle = game.title.replace(/\s+/g, '');

    /**Le he puesto un consoleName en title que se quejaba que necesitabla un titulo unico */
    return (
      <iframe
        title={consoleName}
        src={`/assets/external/webretro/index.html?core=${core}&rom=${sanitizedTitle}.${extension}`}
        style={{
          border: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        className="rounded-md shadow-md "
      ></iframe>
    );
  }
}
