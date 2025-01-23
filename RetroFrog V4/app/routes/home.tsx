import { LoaderFunction } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import { useState } from 'react';
import {
  CollapseArrow,
  FavGamesIcon,
  GamesIcon,
  HomeIcon,
  LogOutIcon,
  MusicIcon,
  SettingsIcon,
  ShopIcon,
  UserIcon,
} from '~/components/IconsSVG';
import MusicPlayer from '~/components/MusicPlayer';
import { getSession } from '~/sessions';
import prisma from '~/utils/prismaClient';

export let loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  const theme = session.get('theme') || 'dark';

  const games = await prisma.game.findMany();
  return { games, theme };
};

export default function HomePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [musicState, setMusicState] = useState(false);

  // Obtener el tema actual
  const theme = 'dark'; // Aquí deberías obtener dinámicamente el tema, igual que en Shop

  const textClasses = theme === 'dark' ? 'white' : 'black'; // Cambiado a "text-white" para dark theme

  function toggleSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  function toggleMusic() {
    setMusicState((prev) => !prev);
  }

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} bg-primary`}>
        <header className="sidebar-header">
          <button className="toggler" onClick={toggleSidebar}>
            <span>
              <CollapseArrow iconFill={textClasses} />{' '}
              {/* Se pasa la clase dinámica */}
            </span>
          </button>
          <a href="../home/main" className="header-logo border-primary-reverse">
            <img
              src="/assets/icon/pfp/default.jpg"
              alt="User Profile"
              draggable="false"
            />
          </a>
        </header>
        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            <li className="nav-item">
              <NavLink to="main" className="nav-link">
                <span className="nav-icon">
                  <HomeIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="shop" className="nav-link">
                <span className="nav-icon">
                  <ShopIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Shop</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="library" className="nav-link">
                <span className="nav-icon">
                  <GamesIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Games</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={{
                  pathname: 'library',
                  search: '?filter=favorites',
                }}
                className="nav-link"
              >
                <span className="nav-icon">
                  <FavGamesIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Favorites</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={toggleMusic}>
                <span className="nav-icon">
                  <MusicIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Music</span>
              </div>
              <MusicPlayer
                className={musicState ? 'music-enter' : 'music-exit'}
              />
            </li>
          </ul>
          <ul className="nav-list secondary-nav">
            <li className="nav-item">
              <NavLink to="user" className="nav-link">
                <span className="nav-icon">
                  <UserIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Profile</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="settings" className="nav-link">
                <span className="nav-icon">
                  <SettingsIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Settings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                <span className="nav-icon">
                  <LogOutIcon iconFill={textClasses} />{' '}
                  {/* Se pasa la clase dinámica */}
                </span>
                <span className="nav-label">Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="content h-full">
        <Outlet />
      </div>
    </>
  );
}
