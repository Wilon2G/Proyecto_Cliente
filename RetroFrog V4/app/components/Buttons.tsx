import classNames from 'classnames';
import { useState } from 'react';
//Boton generico que recibe (className,color,width,text,link,border)

type ButtonProps = {
  textBtn: string;
  typeBtn: 'submit' | 'reset' | 'button' | undefined;
  textColor?: string;
  textColorHover?: string;
  className: string;
  name: string
  value: string
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
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      name={name}
      value={value}
      type={typeBtn}
      className={classNames(
        'w-full py-2 px-4 rounded-md text-textDark font-bold transition duration-300',
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
  onClick,
  className,
}: ButtonActionProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'w-full py-2 px-2 rounded-md text-textDark font-bold transition duration-300',
        className,
      )}
    >
      {textBtn}
    </button>
  );
}

export function ButtonSimple({ textBtn, className }: ButtonSimpleProps) {
  return (
    <button
      className={classNames(
        'w-full py-2 px-2 rounded-md text-textDark font-bold transition duration-300',
        className,
      )}
    >
      {textBtn}
    </button>
  );
}
