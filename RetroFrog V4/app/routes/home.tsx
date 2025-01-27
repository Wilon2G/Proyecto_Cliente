import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import React, { useState } from 'react';
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

export async function loader({ request }: any) {
  const user = await requiredLoggedInUser(request);

  return {
    pfp: user?.pfp || '/assets/icon/pfp/default.jpg',
  };
}

export default function HomePage() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [musicState, setMusicState] = useState(false);
  const { pfp } = useLoaderData<{ pfp: string }>(); // Usamos el dato pasado por el loader

  function toggleSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  function toggleMusic() {
    setMusicState((prev) => !prev);
  }

  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  const primaryLinks = [
    {
      path: 'main',
      SVGIcon: <HomeIcon />,
      iconName: 'Home',
    },
    {
      path: 'shop',
      SVGIcon: <ShopIcon />,
      iconName: 'Shop',
    },
    {
      path: 'library',
      SVGIcon: <GamesIcon />,
      iconName: 'Games',
    },
  ];

  const secondaryLinks = [
    {
      path: 'user',
      SVGIcon: <UserIcon />,
      iconName: 'Profile',
    },
    {
      path: 'settings',
      SVGIcon: <SettingsIcon />,
      iconName: 'Settings',
    },
    {
      path: '/logout',
      SVGIcon: <LogOutIcon />,
      iconName: 'Logout',
    },
  ];

  return (
    <>
      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} my-5 bg-primary`}
      >
        <header className="sidebar-header">
          <button className="toggler" onClick={toggleSidebar}>
            <span>
              <CollapseArrow />
            </span>
          </button>
          <a href="/home/main" className="header-logo border-primary-reverse">
            <img src={pfp} alt="User Profile" draggable="false" />
          </a>
        </header>

        <nav className="sidebar-nav">
          <ul className="nav-list primary-nav">
            {primaryLinks.map((link) => (
              <NavLinkComp
                key={link.path}
                path={link.path}
                SVGIcon={link.SVGIcon}
                iconName={link.iconName}
              />
            ))}

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
            {secondaryLinks.map((link) => (
              <NavLinkComp
                key={link.path}
                path={link.path}
                SVGIcon={link.SVGIcon}
                iconName={link.iconName}
              />
            ))}
          </ul>
        </nav>
      </aside>

      {isLoading ? (
        <LoadingFrog></LoadingFrog>
      ) : (
        <div className="content h-fit w-full">
          <Outlet />
        </div>
      )}
    </>
  );
}

type NavLinkCompProps = {
  path: string;
  SVGIcon: React.ReactElement;
  iconName: string;
};

function NavLinkComp({ path, SVGIcon, iconName }: NavLinkCompProps) {
  return (
    <li className="nav-item">
      <NavLink to={path} className="nav-link">
        <span className="nav-icon">{SVGIcon}</span>
        <span className="nav-label">{iconName}</span>
      </NavLink>
    </li>
  );
}
