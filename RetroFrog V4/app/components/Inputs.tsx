import classNames from 'classnames';

export type InputProps = {
  inputType: string;
  inputName: string;
  classname?: string;
};

export function InputForm({ inputType, classname, inputName }: InputProps) {
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  /**Aunque lo que pongas no sea text en el type, lo trata como text. username=text */

  return (
    <>
      <label
        className="block text-lg font-medium mb-2"
        htmlFor={`${inputType}`}
      >
        {capitalizeFirstLetter(inputType)}:
      </label>
      <input
        type={`${inputType}`}
        name={`${inputName}`}
        id={`${inputType}`}
        autoComplete="off"
        className={classNames(
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none ',
          'border-color-reverse bg-primary-reverse text-color-reverse', //Cambios
          classname,
        )}
        placeholder={`Your ${inputType}`}
      />
    </>
  );
}

type InputRangeProps = {
  classname?: string;
  value: number;
  max: number;
  step?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputRange({
  classname,
  value,
  max,
  step = 0.01,
  onChange,
}: InputRangeProps) {
  return (
    <input
      type="range"
      className={classNames(
        'h-2 rounded-full appearance-none w-full',
        'bg-primary-reverse',
        classname,
      )}
      min="0"
      max={max}
      step={step}
      value={value}
      onChange={onChange}
    />
  );
}
