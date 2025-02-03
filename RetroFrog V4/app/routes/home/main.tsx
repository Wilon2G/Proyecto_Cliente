import { LoaderFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { ShopNowIcon } from '~/components/IconsSVG';
import { requiredLoggedInUser } from '~/utils/auth.server';
import News from '../../components/News';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredLoggedInUser(request);

  return user.name;
};

export default function HomePage() {
  const name = useLoaderData<typeof loader>();

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-color-reverse">
          Welcome, {name}!
        </h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="col-span-1 xl:col-span-2">
          <News />
        </div>

        <div className="self-start w-fit bg-gradient-to-r from-orange-400 to-yellow-300 p-8 rounded-lg shadow-lg flex flex-col justify-between space-y-4">
          <h2 className="text-3xl font-semibold text-black">
            Check out our latest sales!
          </h2>
          <p className="text-black text-lg">
            Don&#39;t miss out on amazing deals! Get up to 50% off on your
            favorite retro games.
          </p>
          <div className="flex justify-center content-center w-16 h-16 rounded-full border border-gray-300 shadow-lg">
            <NavLink to="../shop" className="nav-link" id="navToShop">
              <ShopNowIcon />
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
}
