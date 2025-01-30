import { LoaderFunction } from '@remix-run/node';
import {
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import React, { useState } from 'react';
import { TitleWrapper } from '~/components/Buttons';
import {
  FavGamesIcon,
  GamesIcon,
  HomeIcon,
  LogOutIcon,
  MusicIcon,
  SettingsIcon,
  ShopIcon,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  function toggleMusic() {
    setMusicState((prev) => !prev);
  }
  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }
  function toggleProfileDropdown() {
    setProfileDropdown((prev) => !prev);
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
      <header className="topbar flex gap-4 items-center justify-between bg-primary-hover bg-opacity-10 p-4 w-full flex-wrap">
        <a href="/home/main" className="flex items-center flex-col">
          <span className="text-color font-bold">Retrofrog</span>
        </a>

        <nav
          className={`flex-grow flex justify-center ${
            menuOpen ? 'block' : 'hidden'
          } md:flex`}
        >
          <ul className="flex flex-wrap gap-3">
            {primaryLinks.map((link) => (
              <TitleWrapper title={link.iconName} key={link.path}>
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
                      className="rounded-full w-6 h-6"
                      draggable="false"
                    />
                  </button>
                </TitleWrapper>

                {profileDropdown && (
                  <ul className="absolute right-3 mt-6 w-fit bg-primary-hover rounded-lg shadow-lg p-2 flex flex-col items-center z-50">
                    <li>
                      <TitleWrapper title="Music player" dir="left">
                        <div onClick={toggleMusic}>
                          <MusicIcon />
                        </div>
                        <MusicPlayer
                          className={musicState ? 'music-enter' : 'music-exit'}
                        />
                      </TitleWrapper>
                    </li>
                    <li>
                      <TitleWrapper title="Settings" dir="left">
                        <NavLink
                          to={{ pathname: 'settings' }}
                          className="flex items-center gap-2 text-color hover:underline"
                        >
                          <SettingsIcon />
                        </NavLink>
                      </TitleWrapper>
                    </li>
                    <li>
                      <TitleWrapper title="Log out" dir="left">
                        <NavLink
                          to={{ pathname: '/logout' }}
                          className="flex items-center gap-2 text-color hover:underline"
                        >
                          <LogOutIcon />
                        </NavLink>
                      </TitleWrapper>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </nav>

        <TitleWrapper title="Toggle Menu">
          <button className="md:hidden text-white" onClick={toggleMenu}>
            ☰
          </button>
        </TitleWrapper>
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
  search?: string; // Atributo opcional para filtros
};

function NavLinkComp({ path, SVGIcon, search }: NavLinkCompProps) {
  return (
    <li>
      <NavLink
        to={{ pathname: path, search }}
        className="flex items-center gap-2 text-color hover:underline"
      >
        {SVGIcon}
      </NavLink>
    </li>
  );
}
