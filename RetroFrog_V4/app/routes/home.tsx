import { LoaderFunction } from '@remix-run/node';
import {
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigation,
} from '@remix-run/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import GameSearch from '~/components/games/GameSearch';
import { TitleWrapper } from '~/components/general/Buttons';
import {
  FavGamesIcon,
  GamesIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MusicIcon,
  SearchIcon,
  SettingsIcon,
  ShopIcon,
  UserIcon,
} from '~/components/general/IconsSVG';
import LoadingFrog from '~/components/general/LoadingFrog';
import MusicPlayer from '~/components/general/MusicPlayer';
import { requiredLoggedInUser } from '~/utils/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredLoggedInUser(request);

  return {
    pfp: user?.pfp || '/assets/icon/pfp/default.avif',
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
    {
      path: 'library',
      SVGIcon: <FavGamesIcon />,
      search: '?filter=favorites',
      iconName: 'Favorites',
    },
  ];

  const location = useLocation();
  const isSearchable =
    location.pathname === '/home/library' || location.pathname === '/home/shop';

  return (
    <>
      <header className="topbar flex flex-col  bg-primary bg-opacity-10 p-2 w-full  ">
        <div className="flex gap-4 items-center justify-between  flex-wrap select-none">
          <a href="/home/main" className="flex items-center flex-row gap-3">
            <img
              src="/assets/icon/frog-logo3.avif"
              alt="Frog Logo"
              className="w-20  h-20"
            />
            <span className="text-primary-reverse font-bold text-2xl">
              Retrofrog
            </span>
          </a>

          <nav
            className={` flex ${
              menuOpen
                ? 'opacity-100 transition-all ease-in-out visible'
                : 'opacity-0 transition-all ease-in-out invisible '
            } md:flex`}
          >
            <ul className="flex  flex-wrap gap-2">
              <li>
                <TitleWrapper
                  onClick={toggleSearch}
                  title="Search"
                  className={
                    (menuOpen && isSearchable
                      ? 'scale-100 transition-all ease-in-out '
                      : 'scale-0 transition-all ease-in-out ') +
                    (search ? 'border border-primary-hover-reverse' : '')
                  }
                >
                  <button className="flex items-center" title="search">
                    <SearchIcon />
                  </button>
                </TitleWrapper>
              </li>

              {primaryLinks.map((link) => (
                <NavLinkComp
                  key={link.iconName}
                  {...link}
                  menuOpen={menuOpen}
                />
              ))}

              <li>
                <div>
                  <TitleWrapper
                    onClick={toggleProfileDropdown}
                    title="Profile"
                    className={
                      (menuOpen
                        ? 'scale-100 transition-all ease-in-out'
                        : 'scale-0 transition-all ease-in-out') +
                      (profileDropdown
                        ? 'border border-primary-hover-reverse'
                        : '')
                    }
                  >
                    <button className="flex items-center " title="user-profile">
                      <img
                        src={pfp}
                        alt="User Profile"
                        className="rounded-full w-8 h-8 border-2 border-icon-fill"
                        draggable="false"
                      />
                    </button>
                  </TitleWrapper>

                  <ul
                    className={classNames(
                      'absolute right-3 mt-6 w-fit bg-primary rounded-lg shadow-lg p-2 flex flex-col items-center z-20',
                      {
                        'opacity-100 translate-x-0 transition-all ease-in-out visible scale-100':
                          profileDropdown,
                        'opacity-0 -z-50 translate-x-2 transition-all ease-in-out invisible scale-x-110 scale-y-50':
                          !profileDropdown,
                      },
                    )}
                  >
                    <li>
                      <TitleWrapper
                        onClick={toggleMusic}
                        title="Music player"
                        dir="left"
                      >
                        <MusicIcon />
                      </TitleWrapper>
                    </li>
                    <li>
                      <NavLink to={{ pathname: '/home/user' }}>
                        <TitleWrapper title="User" dir="left">
                          <UserIcon />
                        </TitleWrapper>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={{ pathname: 'settings' }}>
                        <TitleWrapper title="Settings" dir="left">
                          <SettingsIcon />
                        </TitleWrapper>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={{ pathname: '/logout' }}>
                        <TitleWrapper title="Log out" dir="left">
                          <LogOutIcon />
                        </TitleWrapper>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>

          <TitleWrapper title="Toggle menu" onClick={toggleMenu} className="">
            <button title="togglemenu">
              <MenuIcon />
            </button>
          </TitleWrapper>
          <MusicPlayer
            className={classNames(
              {
                'opacity-100 translate-y-0 transition-all ease-in-out visible':
                  musicState,
                'opacity-0 translate-y-5 transition-all ease-in-out invisible':
                  !musicState,
              },
              'bottom-2',
            )}
          />
        </div>

        {/**Esto es el temita de la búsqueda ============ */}
        {search && isSearchable ? (
          <div className=" w-fit bg-primary self-center rounded-lg shadow-lg p-3 flex flex-col items-center ">
            <GameSearch />
          </div>
        ) : (
          ''
        )}
      </header>

      <main className="container mx-auto p-2 select-none shadow-lg bg-gray-100 bg-opacity-30 rounded-md flex flex-col items-center py-5 w-full px-4 self-center m-2 flex-grow min-h-[calc(100vh-8rem)]">
        {isLoading ? <LoadingFrog /> : <Outlet />}
      </main>
    </>
  );
}

type NavLinkCompProps = {
  path: string;
  SVGIcon: React.ReactElement;
  search?: string;
  iconName: string;
  menuOpen?: boolean;
};

function NavLinkComp({
  path,
  SVGIcon,
  search,
  iconName,
  menuOpen,
}: NavLinkCompProps) {
  return (
    <li>
      <NavLink
        to={{ pathname: path, search }}
        className="w-full flex items-center gap-2 text-color hover:underline"
      >
        <TitleWrapper
          title={iconName}
          className={` ${
            menuOpen
              ? 'scale-100 transition-all ease-in-out'
              : 'scale-0 transition-all ease-in-out'
          } `}
        >
          {SVGIcon}
        </TitleWrapper>
      </NavLink>
    </li>
  );
}
