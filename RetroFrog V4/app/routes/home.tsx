import { LoaderFunction } from '@remix-run/node';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
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

export let loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  const theme = session.get('theme') || 'dark';

  return { theme };
};
export default function HomePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [musicState, setMusicState] = useState(false);

  // Obtener el tema actual
  const theme = useLoaderData<{ theme: string }>().theme;

  // Definir las clases de fondo y el color de los iconos
  const colorClasses =
    theme === 'dark' ? 'text-white' : 'text-[var(--primary)]';
  const bgClasses =
    theme === 'dark' ? 'bg-[var(--primary-reverse)]' : 'bg-[var(--primary)]';

  // Definir el color de texto dinámico basado en el tema
  const textColor =
    theme === 'dark' ? 'var(--primary-reverse)' : 'var(--primary)';

  function toggleSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  function toggleMusic() {
    setMusicState((prev) => !prev);
  }

  return (
    <>
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${bgClasses}`}
      >
        <header className="sidebar-header">
          <button className="toggler" onClick={toggleSidebar}>
            <span style={{ color: textColor }}>
              <CollapseArrow iconFill={colorClasses} />
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
                  <HomeIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Home
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="shop" className="nav-link">
                <span className="nav-icon">
                  <ShopIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Shop
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="library" className="nav-link">
                <span className="nav-icon">
                  <GamesIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Games
                </span>
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
                  <FavGamesIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Favorites
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={toggleMusic}>
                <span className="nav-icon">
                  <MusicIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Music
                </span>
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
                  <UserIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Profile
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="settings" className="nav-link">
                <span className="nav-icon">
                  <SettingsIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Settings
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                <span className="nav-icon">
                  <LogOutIcon iconFill={colorClasses} />
                </span>
                <span className="nav-label" style={{ color: textColor }}>
                  Logout
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
