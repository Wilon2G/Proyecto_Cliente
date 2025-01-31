import { LoaderFunction } from '@remix-run/node';
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { TitleWrapper } from '~/components/Buttons';
import GameSearch from '~/components/games/GameSearch';
import {
  FavGamesIcon,
  GamesIcon,
  HomeIcon,
  LogOutIcon,
  MusicIcon,
  SearchIcon,
  SettingsIcon,
  ShopIcon,
  UserIcon,
} from '~/components/IconsSVG';
import LoadingFrog from '~/components/LoadingFrog';
import MusicPlayer from '~/components/MusicPlayer';
import { requiredLoggedInUser } from '~/utils/auth.server';
//HAZ QUE PROFILE SEA UN DROPOUT QUE TENGA SETTINGS Y LOGOUT, Y QUE TODOS SEAN SOLO ICONOS Y CUANDO HAGAS HOVER APAREZCA SUAVEMENTE EL NOMBRE DE LA FUNCIONALIDAD DEBAJO

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredLoggedInUser(request);

  return {
    pfp: user?.pfp || '/assets/icon/pfp/default.jpg',
  };
};

export default function HomePage() {
  const [musicState, setMusicState] = useState(false);
  const { pfp } = useLoaderData<{ pfp: string }>();
  const [menuOpen, setMenuOpen] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [search, setSearch] = useState(false);

  function toggleMusic() {
    setMusicState((prev) => !prev);
  }
  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }
  function toggleProfileDropdown() {
    setProfileDropdown((prev) => !prev);
  }
  function toggleSearch() {
    setSearch((prev) => !prev);
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

  return (
    <>
      <header className="topbar flex gap-4 items-center justify-between bg-primary bg-opacity-10 p-4 w-full flex-wrap select-none">
        <a href="/home/main" className="flex items-center flex-col">
          <span className="text-color font-bold">Retrofrog</span>
        </a>

        <nav
          className={`flex-grow flex justify-center ${
            menuOpen
              ? 'opacity-100 transition-all ease-in-out'
              : 'opacity-0 transition-all ease-in-out'
          } md:flex`}
        >
          <ul className="flex  flex-wrap gap-2">
            <li>
              <TitleWrapper title="Search">
                <button onClick={toggleSearch} className="flex items-center">
                  <SearchIcon></SearchIcon>
                </button>
              </TitleWrapper>
            </li>
            {primaryLinks.map((link) => (
              <TitleWrapper key={link.path} title={link.iconName}>
                <NavLinkComp {...link} />
              </TitleWrapper>
            ))}
            <li>
              <TitleWrapper title="Library">
                <NavLinkComp
                  path="library"
                  SVGIcon={<FavGamesIcon />}
                  search="?filter=favorites"
                />
              </TitleWrapper>
            </li>

            <li>
              <div>
                <TitleWrapper title="Profile">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center"
                  >
                    <img
                      src={pfp}
                      alt="User Profile"
                      className="rounded-full w-7 h-7 "
                      draggable="false"
                    />
                  </button>
                </TitleWrapper>

                <ul
                  className={classNames(
                    'absolute right-3 mt-6 w-fit bg-primary rounded-lg shadow-lg p-2 flex flex-col items-center z-20',
                    {
                      'opacity-100 translate-x-0 transition-all ease-in-out ':
                        profileDropdown,
                      'opacity-0 translate-x-2 transition-all ease-in-out':
                        !profileDropdown,
                    },
                  )}
                >
                  <li>
                    <TitleWrapper title="Music player" dir="left">
                      <div onClick={toggleMusic}>
                        <MusicIcon />
                      </div>
                    </TitleWrapper>
                  </li>
                  <li>
                    <TitleWrapper title="User" dir="left">
                      <NavLink to={{ pathname: '/home/user' }}>
                        <UserIcon />
                      </NavLink>
                    </TitleWrapper>
                  </li>
                  <li>
                    <TitleWrapper title="Settings" dir="left">
                      <NavLink to={{ pathname: 'settings' }}>
                        <SettingsIcon />
                      </NavLink>
                    </TitleWrapper>
                  </li>
                  <li>
                    <TitleWrapper title="Log out" dir="left">
                      <NavLink to={{ pathname: '/logout' }}>
                        <LogOutIcon />
                      </NavLink>
                    </TitleWrapper>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <TitleWrapper
          title="Toggle menu"
          className="md:hidden"
          onClick={toggleMenu}
        >
          <button className="md:hidden  color-primary">☰</button>
        </TitleWrapper>
        <MusicPlayer
          className={classNames(
            {
              'opacity-100 translate-y-0 transition-all ease-in-out':
                musicState,
              'opacity-0 translate-y-5 transition-all ease-in-out': !musicState,
            },
            'bottom-2',
          )}
        />
      </header>
      <div
        className={classNames(
          'absolute left-1/2 transform -translate-x-1/2  m-auto mt-6 w-fit bg-primary rounded-lg shadow-lg p-2 flex flex-col items-center z-50',
          {
            'opacity-100 -translate-y-2 transition-all ease-in-out': search,
            'opacity-0 -translate-y-5 transition-all ease-in-out ': !search,
          },
        )}
      >
        <GameSearch></GameSearch>
      </div>
      <main className="container mx-auto p-4 select-none shadow-lg bg-gray-500 bg-opacity-60 rounded-md flex flex-col items-center py-12 w-full h-full px-4 self-center m-9 -z-30">
        {isLoading ? <LoadingFrog /> : <Outlet />}
      </main>
    </>
  );
}

type NavLinkCompProps = {
  path: string;
  SVGIcon: React.ReactElement;
  search?: string; // Atributo opcional para filtros
};

function NavLinkComp({ path, SVGIcon, search }: NavLinkCompProps) {
  return (
    <NavLink
      to={{ pathname: path, search }}
      className="flex items-center gap-2 text-color hover:underline"
    >
      {SVGIcon}
    </NavLink>
  );
}
