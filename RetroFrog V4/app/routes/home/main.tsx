import News from '../../components/News';

export default function HomePage() {
  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome [aquí el nombre de usuario]!
        </h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <News />
        <div className="bg-orange-400 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-white">
            Check out our latest sales!
          </h1>
        </div>
      </main>
    </div>
  );
}
