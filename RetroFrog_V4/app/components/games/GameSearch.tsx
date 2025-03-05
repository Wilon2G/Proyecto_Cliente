import { useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { InputChangeFx } from '../Inputs';

const consoles = [
  'NES:nes:nestopia',
  'SNES:sfc:snes9x',
  'Nintendo 64:n64:mupen64plus_next',
  'Game Boy:gb:mgba',
  'Nintendo DS:nds:melonds',
  'Sega Genesis:md:genesis_plus_gx',
  'Game Boy Advance:gba:mgba',
];
const tagsList = [
  'Shooter',
  'Adventure',
  'RPG',
  'Action',
  'Platformer',
  'Puzzle',
  'Party',
  'Racing',
  'Fighting',
];

//No se usaaaaaaaaaa
type SearchParams = {
  searchTerm?: string;
  selectedConsole?: string;
  selectedTags?: string[];
};

export default function GameSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || '',
  );

  const [selectedConsole, setSelectedConsole] = useState(
    searchParams.get('console') || '',
  );

  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',') || [],
  );

  //No se usaaaaaaaaaa
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (searchTerm) {
        params.set('search', searchTerm);
        params.set('$skip', '0');
      } else params.delete('search');

      if (selectedConsole) params.set('console', selectedConsole);
      else params.delete('console');

      if (selectedTags.length) params.set('tags', selectedTags.join(','));
      else params.delete('tags');

      return params;
    });
  }, [searchTerm, selectedConsole, selectedTags, setSearchParams]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="mb-2 text-color">
      <div className="p-4 bg-primary rounded-lg">
        <InputChangeFx
          inputType="text"
          defaultValue={searchTerm}
          placeholder="Game search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          classname="bg-primary-reverse text-color-reverse m-2"
        />

        <select
          value={selectedConsole}
          onChange={(e) => setSelectedConsole(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none m-2 bg-primary-reverse text-color-reverse"
        >
          <option value="">All consoles</option>
          {consoles.map((console) => (
            <option key={console.split(':')[0]} value={console.split(':')[0]}>
              {console.split(':')[0]}
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
                  : 'bg-primary-hover text-color'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
