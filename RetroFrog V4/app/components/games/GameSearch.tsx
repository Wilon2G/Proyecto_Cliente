import { useState } from 'react';
import { ButtonAction } from '~/components/Buttons';
import { InputChangeFx } from '../Inputs';

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
    <div className="mb-2 text-color">
      <ButtonAction
        onClick={() => setShowSearch(!showSearch)}
        textBtn="Game search"
        className="bg-primary"
      />

      <div className=" p-4 bg-primary rounded-lg">
        <InputChangeFx
          inputType="text"
          defaultValue={searchTerm}
          placeholder="Game search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          classname="bg-primary-reverse text-color-reverse m-2"
        />

        <select
          onChange={(e) => setSelectedConsole(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none m-2 bg-primary-reverse text-color-reverse"
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
          textBtn="Filter"
          className="mt-2 bg-purple-500 text-fuchsia-200 hover:text-fuchsia-50"
        />
      </div>
    </div>
  );
}
