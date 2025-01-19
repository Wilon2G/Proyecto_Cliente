import { NyTitle } from './IconsSVG';

// Fake news
export default function News() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">What's fresh?</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <NyTitle />
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:mr-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Breaking news! Oracle surrenders their empire to the retroForg
              army!
            </h2>
            <p className="text-gray-600 mb-4">
              Millionaire and CEO of the giant international empire Oracle is
              forced to surrender his company to the new leader in technology
              RetroFrog INC: "We just can't compete with their greatness".
            </p>
            <p className="text-gray-600">
              He will spend his retirement in a Buddhist temple in Chongqing,
              China.
            </p>
          </div>

          <img
            className="w-full md:w-2/3 rounded-md object-cover"
            src="/assets/news/ceoNews.png"
            alt="oracleCeo"
          />
        </div>
      </div>
    </div>
  );
}
