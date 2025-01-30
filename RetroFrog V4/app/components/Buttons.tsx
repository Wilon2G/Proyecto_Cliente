import classNames from 'classnames';
import React from 'react';

type ButtonProps = {
  textBtn: string;
  typeBtn: 'submit' | 'reset' | 'button' | undefined;
  className: string;
  name?: string;
  value?: string;
};

type ButtonActionProps = {
  textBtn: React.ReactNode; //Para permitir (Modal de boton like juegos)
  onClick: () => void;
  className?: string;
  applyDefaultStyles?: boolean; // Nueva prop para controlar los estilos
};

type ButtonSimpleProps = {
  textBtn: string;
  className?: string;
};
type TitleWrapperProps = {
  children: React.ReactNode;
  title: string;
};

export default function Button({
  textBtn,
  typeBtn,
  className,
  name,
  value,
}: ButtonProps) {
  return (
    <button
      name={name}
      value={value}
      type={typeBtn}
      className={classNames(
        'w-full py-2 px-4 rounded-md font-bold transition duration-300',
        'bg-green-600 hover:bg-green-700',
        'text-color hover:text-color-hover',
        className,
      )}
    >
      {textBtn}
    </button>
  );
}

export function ButtonAction({
  textBtn,
  onClick,
  className,
  applyDefaultStyles = true,
}: ButtonActionProps) {
  return (
    <button
      onClick={onClick}
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
export function TitleWrapper({ children, title }: TitleWrapperProps) {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute top-full mt-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
        {title}
      </div>
    </div>
  );
}
