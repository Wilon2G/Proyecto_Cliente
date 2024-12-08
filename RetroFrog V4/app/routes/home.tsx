import { Outlet } from "@remix-run/react";
import { Link } from "react-router-dom";

//Comprobar que usuario está loggeado

export default function HomePage() {
  return (
    <div className="home-page">
      <h1 className="text-center">HomePage</h1>
      <nav>
        <ul className="flex justify-evenly">
          <li><Link to="main">Home</Link></li>
          <li><Link to="libary">Ur games</Link></li>
          <li><Link to="shop">Shop</Link></li>
          <li><Link to="userProfile">Profile</Link></li>
        </ul>
        <Outlet/>
      </nav>
    </div>
  );
}