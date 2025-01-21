import Button from '../components/Buttons';
import InputForm from './InputForm';

//Deprecated ___________________________________________________!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function LoginForm() {
  return (
    <>
      <div>
        <InputForm inputType="username" />
      </div>
      <div>
        <InputForm inputType="password" />
      </div>
      <Button
        textBtn="Log In"
        typeBtn="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-lg"
      />
    </>
  );
}

export default LoginForm;
