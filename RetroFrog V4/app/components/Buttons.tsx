import classNames from 'classnames';
//Boton generico que recibe (className,color,width,text,link,border)

type ButtonProps = {
  textBtn: string;
  typeBtn: 'submit' | 'reset' | 'button' | undefined;
  className: string;
  name: string
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

export default function Button({ textBtn, typeBtn, className, name }: ButtonProps) {
  return (
    <button
      name={name}
      type={typeBtn}
      className={classNames(
        'w-full py-2 px-4 rounded-md text-textDark font-bold transition duration-300',
        'bg-green-600 hover:bg-green-700',
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
