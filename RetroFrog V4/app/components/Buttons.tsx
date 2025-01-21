import classNames from 'classnames';
import { useState } from 'react';
//Boton generico que recibe (className,color,width,text,link,border)

type ButtonProps = {
  textBtn: string;
  typeBtn: 'submit' | 'reset' | 'button' | undefined;
  textColor?: string;
  textColorHover?: string;
  className: string;
  name: string;
  value: string;
};

type ButtonActionProps = {
  textBtn: string;
  textColor?: string;
  textColorHover?: string;
  onClick: () => void;
  className?: string;
};

type ButtonSimpleProps = {
  textBtn: string;
  textColor?: string;
  textColorHover?: string;
  className?: string;
};

export default function Button({
  textBtn,
  typeBtn,
  textColor,
  textColorHover,
  className,
  name,
  value,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      name={name}
      value={value}
      type={typeBtn}
      className={classNames(
        'w-full py-2 px-4 rounded-md font-bold transition duration-300',
        'bg-green-600 hover:bg-green-700',
        className,
      )}
      style={{
        color: isHovered ? `${textColorHover}` : `${textColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {textBtn}
    </button>
  );
}

export function ButtonAction({
  textBtn,
  textColor,
  textColorHover,
  onClick,
  className,
}: ButtonActionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={classNames(
        'w-full py-2 px-2 rounded-md font-bold transition duration-300',
        className,
      )}
      style={{
        color: isHovered ? `${textColorHover}` : `${textColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {textBtn}
    </button>
  );
}

export function ButtonSimple({
  textBtn,
  textColor,
  textColorHover,
  className,
}: ButtonSimpleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={classNames(
        'w-full py-2 px-2 rounded-md font-bold transition duration-300',
        className,
      )}
      style={{
        color: isHovered ? `${textColorHover}` : `${textColor}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {textBtn}
    </button>
  );
}
