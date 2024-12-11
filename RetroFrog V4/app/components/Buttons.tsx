import classNames from 'classnames';
//Boton generico que recibe (className,color,width,text,link,border)

type buttonProps = {
  textBtn: string;
  typeBtn: 'submit' | 'reset' | 'button' | undefined;
  className: string;
};

export default function Button({ textBtn, typeBtn, className }: buttonProps) {
  return (
    <button
      type={typeBtn}
      className={classNames(
        'w-full text-white font-bold py-2 px-4 rounded-md transition duration-300',
        'bg-green-600 hover:bg-green-700',
        className,
      )}
    >
      {textBtn}
    </button>
  );
}
