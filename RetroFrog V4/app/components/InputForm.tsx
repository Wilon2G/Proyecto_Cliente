export type InputProps = {
  inputType: string;
  textColor?: string;
  inputName?: string;
};

function InputForm({ inputType, textColor, inputName }: InputProps) {
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <>
      <label
        className="block text-lg font-medium mb-2"
        htmlFor={`${inputName}`}
      >
        {capitalizeFirstLetter(inputType)}:
      </label>
      <input
        type={`${inputType}`}
        name={`${inputName}`} // Asegúrate que este nombre coincida con el nombre usado en el formulario
        id={`${inputName}`}
        autoComplete="off"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        placeholder={`Your ${inputType}`}
      />
    </>
  );
}

export default InputForm;
