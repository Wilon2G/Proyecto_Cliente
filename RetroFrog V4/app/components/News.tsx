// News.tsx
import { NyTitle } from './IconsSVG';

type NewsItem = {
  id: number;
  title: string;
  content: string;
  additional?: string;
  image?: string;
};

type NewsProps = {
  newsItems: NewsItem[];
};

export default function News({ newsItems }: NewsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">What’s fresh?</h1>

      {newsItems.map((news) => (
        <div key={news.id} className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1">
            <div className="flex justify-center mb-4">
              <NyTitle />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {news.title}
            </h2>
            <p className="text-gray-700 mb-4">{news.content}</p>
            {news.additional && (
              <p className="text-gray-700">{news.additional}</p>
            )}
          </div>

          {news.image && (
            <div className="flex-1">
              <img
                className="w-full h-auto rounded-lg shadow-md"
                src={news.image}
                alt={news.title}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
