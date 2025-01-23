import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/sessions';
import prisma from '~/utils/prismaClient';
import News from '../../components/News';

export let loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  const userId = session.get('userId');
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });
  return { user };
};

export default function HomePage() {
  const { user } = useLoaderData() as { user: { username: string } };

  return (
    <div className="p-6 bg-gray-100 bg-opacity-35 rounded-md h-fit">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome, {user.username}!
        </h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* News Section */}
        <div className="col-span-1 xl:col-span-2">
          <News />
        </div>

        {/* Sales Section */}
        <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-300 p-8 rounded-lg shadow-lg flex flex-col justify-between space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Check out our latest sales!
          </h2>
          <p className="text-white text-lg">
            Don’t miss out on amazing deals! Get up to 50% off on your favorite
            retro games. Stock is limited, so act fast!
          </p>
          <button className="self-start bg-white text-orange-600 px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition-all">
            Shop Now
          </button>
        </div>

        {/* Random Content: Featured Articles */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Featured Articles
          </h3>
          <ul className="space-y-4">
            <li className="text-lg text-gray-700 hover:text-orange-500 cursor-pointer">
              Top 10 Retro Games You Must Play
            </li>
            <li className="text-lg text-gray-700 hover:text-orange-500 cursor-pointer">
              The History of Arcade Machines
            </li>
            <li className="text-lg text-gray-700 hover:text-orange-500 cursor-pointer">
              Why Retro Gaming is Making a Huge Comeback
            </li>
          </ul>
        </div>

        {/* Random Content: Trending Topics */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Trending Retro Games
          </h3>
          <ul className="space-y-4">
            <li className="text-lg text-gray-700 hover:text-orange-500 cursor-pointer">
              Super Mario Bros. – A Timeless Classic
            </li>
            <li className="text-lg text-gray-700 hover:text-orange-500 cursor-pointer">
              The Legend of Zelda: Ocarina of Time – A Retrospective
            </li>
            <li className="text-lg text-gray-700 hover:text-orange-500 cursor-pointer">
              Sonic the Hedgehog – Why It’s Still Loved Today
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
