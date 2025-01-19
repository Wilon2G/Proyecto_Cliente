import classNames from 'classnames';
import { useState } from 'react';

export default function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleClick = () => {
    if (loading || purchased) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPurchased(true);
    }, 2000);
  };

  const isDisabled = loading || purchased;

  return (
    <button
      onClick={handleClick}
      className={classNames(
        'w-1/2 font-bold py-2 px-4 rounded-md transition duration-300',
        'bg-amber-500 hover:bg-amber-600', //Se queda el color verde de base
        {
          'buy-button': true,
          loading: loading,
          purchased: purchased,
        },
      )}
      disabled={isDisabled}
    >
      {purchased ? 'Ya Adquirido' : loading ? 'Procesando...' : 'Comprar'}
    </button>
  );
}
