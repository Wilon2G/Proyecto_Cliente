export type InputProps = {
  inputType: string;
  inputName: string;
};

function InputForm({ inputType, inputName }: InputProps) {
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
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none "
        placeholder={`Your ${inputType}`}
      />
    </>
  );
}

export default InputForm;
