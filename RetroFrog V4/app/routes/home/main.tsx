import News from '../../components/News';

export default function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome [aquí el nombre de usuario] !</h1>
      </header>
      <main className="grid grid-cols-2 gap-4">
        <News />
        <div className="bg-orange-400">
          <h1>CkeckOut our latest sales!</h1>
        </div>
      </main>
    </div>
  );
}
