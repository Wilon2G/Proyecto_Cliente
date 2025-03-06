import { useFetcher } from '@remix-run/react';
import classNames from 'classnames';
import React, { useState } from 'react';

type ButtonProps = {
  textBtn: string;
  typeBtn: 'submit' | 'reset' | 'button' | undefined;
  className: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  textBtn,
  typeBtn,
  className,
  name,
  value,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      name={name}
      value={value}
      type={typeBtn}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'w-full py-2 px-4 rounded-md font-bold transition duration-300',
        'bg-green-600 hover:bg-green-700',
        'text-white hover:text-color-hover',
        className,
      )}
    >
      {textBtn}
    </button>
  );
}

type ButtonActionProps = {
  textBtn: React.ReactNode; //Para permitir (Modal de boton like juegos)
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  applyDefaultStyles?: boolean;
  id?: string;
};

export function ButtonAction({
  textBtn,
  onClick,
  className,
  applyDefaultStyles = true,
  id,
}: ButtonActionProps) {
  return (
    <button
      onClick={onClick}
      id={id}
      className={
        applyDefaultStyles
          ? `w-full py-2 px-2 rounded-md font-bold transition duration-300 
             text-color hover:text-color-hover ${className}`
          : className
      }
    >
      {textBtn}
    </button>
  );
}

type ButtonSimpleProps = {
  textBtn: string;
  className?: string;
};

export function ButtonSimple({ textBtn, className }: ButtonSimpleProps) {
  return (
    <button
      className={classNames(
        'w-full py-2 px-2 rounded-md font-bold transition duration-300',
        'text-color hover:text-color-hover',
        className,
      )}
    >
      {textBtn}
    </button>
  );
}

type BuyButtonProps = {
  gameId: string;
  isPurchased?: boolean;
};

export function BuyButton({ gameId, isPurchased = false }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher<{ error?: string }>();

  async function handleClick() {
    if (isPurchased) return; // No hacer nada si ya está comprado

    setLoading(true);
    try {
      await fetcher.submit({ gameId }, { method: 'post' });

      if (!fetcher.data?.error) {
        isPurchased = true;
      }
    } catch (error) {
      console.error('Error adding game to user', error);
    } finally {
      setLoading(false);
    }
  }

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

type TitleWrapperProps = {
  children: React.ReactNode;
  title: string;
  dir?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function TitleWrapper({
  children,
  title,
  dir = 'down',
  className = '',
  onClick,
}: TitleWrapperProps) {
  return (
    <div
      className={classNames(
        'relative flex flex-col items-center group hover:bg-primary-hover active:scale-95 transition-transform duration-150 p-3 rounded-md',
        className,
      )}
      onClick={onClick}
    >
      {children}
      <div
        className={classNames(
          'absolute z-50 px-2 py-1 bg-primary-hover text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ',
          {
            'mt-1 top-full': dir === 'down',
            'mr-1 right-full -mt-2': dir === 'left',
          },
        )}
      >
        {title}
      </div>
    </div>
  );
}
