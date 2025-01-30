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
    <div className="mb-4 text-color">
      <ButtonAction
        onClick={() => setShowSearch(!showSearch)}
        textBtn="Game search"
      />
      {showSearch && (
        <div className="mt-4 p-4 bg-primary rounded-lg">
          <input
            type="text"
            placeholder="Game search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2 p-2 rounded bg-primary-reverse text-color-reverse w-full"
          />
          <select
            onChange={(e) => setSelectedConsole(e.target.value)}
            className="mb-2 p-2 rounded bg-primary-reverse text-color-reverse w-full"
          >
            <option value="">All consoles</option>
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
                className={`cursor-pointer m-1 px-2 py-1 rounded  ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-reverse text-color-reverse'
                    : 'bg-primary-hover text-color '
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
