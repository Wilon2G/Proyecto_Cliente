import Button from '../components/Buttons';

function LoginForm() {
  return (
    <>
      <div>
        <label className="block text-lg font-medium mb-2" htmlFor="userName">
          User Name:
        </label>
        <input
          type="text"
          name="userName"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
          placeholder="Your username"
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
          placeholder="Your password"
          autoComplete=''
        />
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
