import { LoaderFunction } from '@remix-run/node';
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import React, { useState } from 'react';
import {
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
  const user = await requiredLoggedInUser(request);

  return {
    pfp: user?.pfp || '/assets/icon/pfp/default.jpg',
  };
};

export default function HomePage() {
  const [musicState, setMusicState] = useState(false);
  const { pfp } = useLoaderData<{ pfp: string }>();

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
      <header className="topbar flex  items-center justify-between bg-primary p-4 w-screen">
        <a href="/home/main" className="flex items-center">
          <img
            src={pfp}
            alt="User Profile"
            className="rounded-full w-10 h-10 mr-4"
            draggable="false"
          />
          <span className="text-white font-bold">Retrofrog</span>
        </a>

        <nav className="flex items-center gap-8">
          <ul className="flex gap-6">
            {primaryLinks.map((link) => (
              <NavLinkComp
                key={link.path}
                path={link.path}
                SVGIcon={link.SVGIcon}
                iconName={link.iconName}
              />
            ))}
            <li>
              <NavLink
                to={{ pathname: 'library', search: '?filter=favorites' }}
                className="flex items-center gap-2 text-white hover:underline"
              >
                <FavGamesIcon /> Favorites
              </NavLink>
            </li>
            <li>
              <div
                className="flex items-center gap-2 text-white cursor-pointer hover:underline"
                onClick={toggleMusic}
              >
                <MusicIcon /> Music
              </div>
              <MusicPlayer
                className={musicState ? 'music-enter' : 'music-exit'}
              />
            </li>
          </ul>
          <ul className="flex gap-6">
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
      </header>

      <main className="container mx-auto p-4 select-none shadow-lg bg-gray-500 bg-opacity-60 rounded-md flex flex-col items-center py-12 w-full px-4 self-center">
        {isLoading ? <LoadingFrog /> : <Outlet />}
      </main>
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
    <li>
      <NavLink
        to={path}
        className="flex items-center gap-2 text-white hover:underline"
      >
        {SVGIcon} {iconName}
      </NavLink>
    </li>
  );
}
