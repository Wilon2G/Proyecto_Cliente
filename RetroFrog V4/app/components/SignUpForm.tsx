import Button from '../components/Buttons';
import InputForm from './InputForm';

function SignUpForm() {
  return (
    <>
      <div>

        <label className="block text-lg font-medium mb-2" htmlFor="username">
          username:
        </label>
        <input
          type="email"
          name="username"
          id="username"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
          placeholder="example@gmail.com"
        />

      </div>
      <div>
        <InputForm inputType="password" />
      </div>
      <div>

        <label className="block text-lg font-medium mb-2" htmlFor="email">
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
          placeholder="Your name"
        />

      </div>
      <Button textBtn="Register" typeBtn="submit"  className="text-lg" />
    </>
  );
}

export default SignUpForm;
