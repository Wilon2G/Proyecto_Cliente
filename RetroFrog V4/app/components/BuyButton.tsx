import { useFetcher } from '@remix-run/react';
import { useState } from 'react';

type BuyButtonProps = {
  gameId: string; // ID del juego a desbloquear
  isPurchased?: boolean;
};

export default function BuyButton({
  gameId,
  isPurchased = false,
}: BuyButtonProps) {
  const fetcher = useFetcher();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (isPurchased) return; // No hacer nada si ya está comprado

    setLoading(true);
    try {
      const response = await fetcher.submit({ gameId }, { method: 'post' });
      if (response.success) {
        isPurchased = true; // Si la compra es exitosa, marca como comprado
      }
    } catch (error) {
      // Manejar error en la compra
      console.error('Error adding game to user', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPurchased || loading}
      className={`px-4 py-2 text-white font-bold rounded ${
        isPurchased
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-700'
      }`}
    >
      {isPurchased ? 'Comprado' : loading ? 'Comprando...' : 'Comprar'}
    </button>
  );
}
