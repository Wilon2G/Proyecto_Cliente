import classNames from 'classnames';

type ButtonProps = {
  textBtn: string;
  typeBtn: 'submit' | 'reset' | 'button' | undefined;
  className: string;
  name?: string;
  value?: string;
};

type ButtonActionProps = {
  textBtn: string;
  onClick: () => void;
  className?: string;
};

type ButtonSimpleProps = {
  textBtn: string;
  className?: string;
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
}: ButtonActionProps) {
  return (
    <button
      onClick={onClick}
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

export function ButtonSimple({
  textBtn,

  className,
}: ButtonSimpleProps) {
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
