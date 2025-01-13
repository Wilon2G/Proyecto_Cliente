import Button from '../components/Buttons';

function SignUpForm() {
  return (
    <>
      <div>
        <label className="block text-lg font-medium mb-2" htmlFor="userName">
          UserName:
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
      <div>
        <label className="block text-lg font-medium mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
          placeholder="example@gmail.com"
        />
      </div>
      <Button textBtn="Register" typeBtn="submit" className="text-lg" />
    </>
  );
}

export default SignUpForm;
