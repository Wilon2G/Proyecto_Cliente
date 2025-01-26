// HomePage.tsx
import { LoaderFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';

import News from '../../components/News';
import { requiredLoggedInUser } from '~/utils/auth.server';
import { ShopNowIcon } from '~/components/IconsSVG';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredLoggedInUser(request);

  return user.username;
};

export default function HomePage() {
  const username = useLoaderData<string>();

  // Datos de ejemplo para la sección de noticias
  const newsData = [
    {
      id: 1,
      title: 'Breaking news! Oracle surrenders their empire!',
      content: `Millionaire and CEO of the giant international empire Oracle is forced to surrender his company to the new leader in technology, RetroFrog INC. "We just can't compete with their greatness."`,
      additional: `He will spend his retirement in a Buddhist temple at Chongqing, China.`,
      image: '/assets/news/ceoNews.png',
    },
  ];

  return (
    <div className="p-6 bg-gray-500 bg-opacity-35 rounded-md h-fit">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome, {username}!
        </h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="col-span-1 xl:col-span-2">
          <News newsItems={newsData} />
        </div>

        <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-300 p-8 rounded-lg shadow-lg flex flex-col justify-between space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Check out our latest sales!
          </h2>
          <p className="text-white text-lg">
            Don&#39;t miss out on amazing deals! Get up to 50% off on your
            favorite retro games.
          </p>

          <button className="self-start bg-white text-orange-600 px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition-all">
            <NavLink to="../shop" className="nav-link">
              <ShopNowIcon />
            </NavLink>
            Shop Now
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Featured Articles
          </h3>
          <ul className="space-y-4">
            {[
              'Top 10 Retro Games You Must Play',
              'The History of Arcade Machines',
              'Why Retro Gaming is Making a Huge Comeback',
            ].map((article, index) => (
              <li
                key={index}
                className="text-lg text-gray-700 hover:text-orange-500 cursor-pointer"
              >
                {article}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
