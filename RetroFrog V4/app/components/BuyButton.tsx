import React, { useState } from 'react';

export default function BuyButton() {
  const [clicked, setClicked] = useState(false);  // Para verificar si el botón ha sido clickeado
  const [loading, setLoading] = useState(false);  // Para mostrar el texto "Procesando..."
  const [purchased, setPurchased] = useState(false);  // Para mostrar "Adquirido" después de la compra

  const handleClick = () => {
    if (clicked || purchased) return; // Si ya se hizo clic o la compra ya se ha realizado, no hacer nada

    setClicked(true);  // Marcar el botón como clickeado
    setLoading(true);  // Iniciar el estado de carga

    // Simula un retraso de la compra (por ejemplo, una solicitud de API)
    setTimeout(() => {
      setLoading(false);  // Detener el estado de carga
      setPurchased(true);  // Marcar la compra como realizada
    }, 2000); // Simula un retraso de 2 segundos
  };

  return (
    <button
      onClick={handleClick}
      className={`buy-button ${clicked ? 'clicked' : ''} ${loading ? 'loading' : ''} ${purchased ? 'purchased' : ''}`}
      disabled={clicked || purchased}  // Deshabilita el botón si ya fue clickeado o la compra se realizó
    >
      {purchased ? 'Ya Adquirido' : loading ? 'Procesando...' : 'Comprar'}
    </button>
  );
}
