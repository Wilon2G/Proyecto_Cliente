import { useNavigate } from "@remix-run/react";

export default function Kk() {
  const nav = useNavigate();

  function handleClick() {
    nav("/home/homePage");
  }

  return (
    <div className="bg-sky-200">
      <h1>Log In / Register Page :)</h1>

      <button onClick={handleClick}> Entrar</button>
    </div>
  );
}
