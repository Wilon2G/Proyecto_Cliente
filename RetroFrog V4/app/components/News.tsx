import { NyTitle } from './IconsSVG';

export default function News() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        <NyTitle />
      </h1>
      <div className="divide-y divide-gray-300">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-8 py-8 hover:bg-gray-50 transition-all"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 hover:text-blue-500 transition-all">
                {news.title}
              </h2>
              <p className="text-gray-700 mb-4">{news.content}</p>
              {news.additional && (
                <p className="text-gray-600 italic">{news.additional}</p>
              )}
            </div>

            {news.image && (
              <div className="flex-1">
                <img
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform"
                  src={news.image}
                  alt={news.title}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const newsData = [
  {
    title: 'New VR headset makes reality obsolete!',
    content: `Tech startup QuantumVisions has unveiled their new VR headset, claiming it offers an experience "better than reality itself." Early testers report losing track of time and reality entirely.`,
    additional: `Authorities are warning users to set alarms to avoid "reality disconnection syndrome."`,
    image: '/assets/news/vrHeadset.jpg',
  },
  {
    title: 'Legendary RPG gets surprise sequel!',
    content: `Fans of the cult classic "Elder Legends: The Forgotten Realms" were stunned today when developers announced a surprise sequel after 20 years. The new title promises to bring back the nostalgic gameplay with cutting-edge visuals.`,
    additional: `Pre-orders are already breaking records worldwide.`,
    image: '/assets/news/rpgSequel.jpg',
  },
  {
    title: 'Esports legend retires at 19!',
    content: `Famous esports champion Alex "PixelGod" Ramirez has announced his retirement, citing exhaustion and the desire to pursue a career in "actual physical sports."`,
    additional: `Rumors suggest he might be coaching the next generation of gamers.`,
    image: '/assets/news/esportsRetirement.jpg',
  },
  {
    title: 'Mysterious arcade machine appears overnight!',
    content: `Residents of a small town woke up to find an unknown arcade machine placed in the middle of the town square. No one knows where it came from, but players report it contains games no one has ever seen before.`,
    additional: `Local authorities are investigating its origins.`,
    image: '/assets/news/arcadeMystery.jpg',
  },
  {
    title: 'Breaking news! Oracle surrenders their empire!',
    content: `Millionaire and CEO of the giant international empire Oracle is forced to surrender his company to the new leader in technology, RetroFrog INC. "We just can't compete with their greatness."`,
    additional: `He will spend his retirement in a Buddhist temple at Chongqing, China.`,
    image: '/assets/news/ceoNews.png',
  },
  {
    title: 'Retro gaming makes a massive comeback!',
    content: `Sales of retro consoles and pixel-art games have skyrocketed, with players seeking nostalgia in simpler times. Experts say this trend might reshape the gaming industry for years to come.`,
    additional: `Collectors are now paying thousands for vintage cartridges.`,
    image: '/assets/news/retroGaming.jpg',
  },
];
