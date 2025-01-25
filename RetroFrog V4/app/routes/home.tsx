import { LoaderFunction } from '@remix-run/node';
import { NavLink, Outlet, useNavigation } from '@remix-run/react';
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
import LoadingFrog from '~/components/LoadingFrog';
import MusicPlayer from '~/components/MusicPlayer';
import { requiredLoggedInUser } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  requiredLoggedInUser(request);
  return null;
}

export default function HomePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [musicState, setMusicState] = useState(false);

  function toggleSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  function toggleMusic() {
    setMusicState((prev) => !prev);
  }

  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} bg-primary`}>
        <header className="sidebar-header">
          <button className="toggler" onClick={toggleSidebar}>
            <span>
              <CollapseArrow />
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
                  <HomeIcon />
                </span>
                <span className="nav-label">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="shop" className="nav-link">
                <span className="nav-icon">
                  <ShopIcon />
                </span>
                <span className="nav-label">Shop</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="library" className="nav-link">
                <span className="nav-icon">
                  <GamesIcon />
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
                  <FavGamesIcon />
                </span>
                <span className="nav-label">Favorites</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={toggleMusic}>
                <span className="nav-icon">
                  <MusicIcon />
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
                  <UserIcon />
                </span>
                <span className="nav-label">Profile</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="settings" className="nav-link">
                <span className="nav-icon">
                  <SettingsIcon />
                </span>
                <span className="nav-label">Settings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                <span className="nav-icon">
                  <LogOutIcon />
                </span>
                <span className="nav-label">Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      
      {isLoading ?(
        <LoadingFrog></LoadingFrog>
      ):(
      <div className="content h-full w-full">
        <Outlet />
      </div>
      )}
      
    </>
  );
}
