import classNames from 'classnames';
import { useState } from 'react';

type BuyButtonProps = {
  gameId: string; // ID del juego a desbloquear
  userId: string; // ID del usuario
  addGameToUser: (gameId: string, userId: string) => Promise<void>; // Método para añadir el juego
};

export default function BuyButton({
  gameId,
  userId,
  addGameToUser,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleClick = async () => {
    if (loading || purchased) return;

    setLoading(true);

    try {
      await addGameToUser(gameId, userId); // Llama al método para añadir el juego
      setPurchased(true);
    } catch (error) {
      console.error('Error al añadir el juego:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || purchased;

  return (
    <button
      onClick={handleClick}
      className={classNames(
        'w-1/2 font-bold py-2 px-4 rounded-md transition duration-300',
        {
          'bg-amber-500 hover:bg-amber-600': !purchased,
          'bg-green-500 cursor-not-allowed': purchased,
        },
      )}
      disabled={isDisabled}
    >
      {purchased ? 'Done' : loading ? 'Wait...' : 'Buy'}
    </button>
  );
}
