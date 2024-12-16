import Button from '../components/Buttons';
import InputForm from './InputForm';

function SignUpForm() {
  return (
    <>
      <div>
        <InputForm inputType="username" />
      </div>
      <div>
        <InputForm inputType="password" />
      </div>
      <div>
        <InputForm inputType="email" />
      </div>
      <Button textBtn="Register" typeBtn="submit" className="text-lg" />
    </>
  );
}

export default SignUpForm;
