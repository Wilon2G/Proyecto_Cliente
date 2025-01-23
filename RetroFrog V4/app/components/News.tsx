import { NyTitle } from './IconsSVG';

export default function News() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">What’s fresh?</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex justify-center mb-4">
            <NyTitle />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Breaking news! Oracle surrenders their empire to the retroForg army!
          </h2>
          <p className="text-gray-700 mb-4">
            Millionaire and CEO of the giant international empire Oracle is
            forced to surrender his company to the new leader in technology,
            RetroFrog INC. "We just can't compete with their greatness."
          </p>
          <p className="text-gray-700">
            He will spend his retirement in a Buddhist temple at Chongqing,
            China.
          </p>
        </div>

        <div className="flex-1">
          <img
            className="w-full h-auto rounded-lg shadow-md"
            src="/assets/news/ceoNews.png"
            alt="Oracle CEO"
          />
        </div>
      </div>
    </div>
  );
}
