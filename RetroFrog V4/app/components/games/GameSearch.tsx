import { useState } from 'react';
import { ButtonAction } from '~/components/Buttons';

const consoles = ['NES', 'SNES', 'PlayStation', 'Xbox', 'PC']; // Consolas de ejemplo
const tagsList = ['3D', '2D', 'Aventura', 'RPG', 'Acción', 'Plataformas'];

export default function GameSearch({ onSearch }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsole, setSelectedConsole] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const toggleTag = (tag: any) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSearch = () => {
    onSearch({ searchTerm, selectedConsole, selectedTags });
  };

  return (
    <div className="mb-4">
      <ButtonAction
        onClick={() => setShowSearch(!showSearch)}
        textBtn="Buscar Juegos"
      />
      {showSearch && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            placeholder="Buscar juego..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2 p-2 rounded bg-gray-700 text-white w-full"
          />
          <select
            onChange={(e) => setSelectedConsole(e.target.value)}
            className="mb-2 p-2 rounded bg-gray-700 text-white w-full"
          >
            <option value="">Todas las Consolas</option>
            {consoles.map((console) => (
              <option key={console} value={console}>
                {console}
              </option>
            ))}
          </select>
          <div className="mt-2">
            {tagsList.map((tag) => (
              <button
                key={tag}
                className={`cursor-pointer m-1 px-2 py-1 rounded ${
                  selectedTags.includes(tag) ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <ButtonAction
            onClick={handleSearch}
            textBtn="Filtrar"
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}
