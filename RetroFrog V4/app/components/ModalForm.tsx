import React from 'react';
import { InputForm, InputTextarea } from './Inputs';
import Button from './Buttons';

interface ModalFormProps {
  handleCloseModal: () => void;
  handleSubmitNewGame: (event: React.FormEvent<HTMLFormElement>) => void;
}

//LOs errores los dice por nose que de accesibilidad
export default function ModalForm({
  handleCloseModal,
  handleSubmitNewGame,
}: ModalFormProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-primary p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mt-4">Upload New Game</h2>
        <form onSubmit={handleSubmitNewGame}>
          <InputForm
            inputType="text"
            inputName="title"
            labelStyle="text-sm mt-4"
          />

          <InputTextarea inputName="description" labelStyle="text-sm mt-4" />

          <InputForm
            inputType="text"
            inputName="tags"
            labelStyle="text-sm mt-4"
          />
          <InputForm
            inputType="color"
            inputName="color"
            labelStyle="text-sm mt-4"
          />
          <Button
            textBtn="Submit"
            typeBtn="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-lg mt-4"
            name="_action"
            value="singUp"
          />
        </form>
      </div>
    </div>
  );
}
