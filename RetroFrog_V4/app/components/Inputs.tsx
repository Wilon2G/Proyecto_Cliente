import classNames from 'classnames';

export type InputProps = {
  inputText?: string;
  inputType?: string;
  inputName: string;
  classname?: string;
  labelStyle?: string;
  defaultValue?: string;
};

export function InputForm({
  inputText,
  inputType,
  classname,
  inputName,
  labelStyle,
  defaultValue,
}: InputProps) {
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <>
      <label
        className={classNames('block text-lg font-medium mb-2', labelStyle)}
        htmlFor={`${inputName}`}
      >
        {capitalizeFirstLetter(inputText || inputType || '')}:
      </label>
      <input
        type={`${inputType}`}
        name={`${inputName}`}
        id={`${inputName}`}
        autoComplete="off"
        className={classNames(
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none ',
          'border-color-reverse bg-primary text-color', //Cambios
          classname,
        )}
        placeholder={`Your ${inputText || inputType}`}
        defaultValue={`${defaultValue || ''}`}
      />
    </>
  );
}

export type InputChangeFxProps = {
  placeholder: string;
  inputType?: string;
  inputName?: string;
  classname?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputChangeFx({
  placeholder,
  inputType,
  classname,
  inputName,
  defaultValue,
  onChange,
}: InputChangeFxProps) {
  return (
    <>
      <input
        type={`${inputType}`}
        name={`${inputName}`}
        id={`${inputName}`}
        autoComplete="off"
        className={classNames(
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none ',
          'border-color-reverse bg-primary text-color', //Cambios
          classname,
        )}
        placeholder={`${placeholder}`}
        defaultValue={`${defaultValue || ''}`}
        onChange={onChange}
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

//=======================

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

//===================

export function InputTextarea({
  classname,
  inputName,
  labelStyle,
}: InputProps) {
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  /**Aunque lo que pongas no sea text en el type, lo trata como text. username=text */

  return (
    <>
      <label
        className={classNames('block text-lg font-medium mb-2', labelStyle)}
        htmlFor={`${inputName}`}
      >
        {capitalizeFirstLetter(inputName)}:
      </label>
      <textarea
        name={`${inputName}`}
        id={`${inputName}`}
        autoComplete="off"
        className={classNames(
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none ',
          'border-color-reverse bg-primary-reverse text-color-reverse', //Cambios
          classname,
        )}
        required
      />
    </>
  );
}
