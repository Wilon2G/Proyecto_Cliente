import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar datos existentes
  await prisma.user.deleteMany({});
  await prisma.game.deleteMany({});

  // Crear usuarios
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'prueba',
        password: 'prueba',
        name: 'Admin User',
        email: 'admin@example.com',
        sex: 'M',
        score: 100,
        theme: 'dark',
        pfp: '/assets/icon/pfp/admin.jpg',
        role: 'ADMIN', // Usuario administrador
      },
      {
        username: 'testUser1',
        password: 'testpassword',
        name: 'Test User 1',
        email: 'test1@example.com',
        sex: 'F',
        score: 70,
        theme: 'light',
        pfp: '/assets/icon/pfp/test1.jpg',
        role: 'USER', // Usuario normal
      },
      {
        username: 'testUser2',
        password: 'anotherpassword',
        name: 'Test User 2',
        email: 'test2@example.com',
        sex: 'M',
        score: 30,
        theme: 'dark',
        pfp: '/assets/icon/pfp/test2.jpg',
        role: 'USER', // Usuario normal
      },
    ],
  });

  console.log('Users created:', users);

  const gamelist = [
    {
      tags: 'Shooter',
      title: '007 GoldenEye',
      description: 'Stealth and action in a James Bond adventure.',
      color: '#00008B',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Adventure',
      title: 'Banjo-Kazooie',
      description: 'Solve puzzles and collect items in a magical world.',
      color: '#FFDAB9',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'RPG',
      title: 'Chrono Trigger',
      description: 'Travel through time to save the world.',
      color: '#DA70D6',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Action',
      title: 'Contra',
      description: 'Run and gun through enemy territory.',
      color: '#800000',
      console: 'NES:nes:nestopia',
    },
    {
      tags: 'Platformer',
      title: 'Donkey Kong Country',
      description: 'Collect bananas and defeat enemies.',
      color: '#F4A460',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Puzzle',
      title: 'Dr Mario',
      description: 'Clear viruses with colored pills.',
      color: '#FF6347',
      console: 'NES:nes:nestopia',
    },
    {
      tags: 'RPG',
      title: 'EarthBound',
      description: 'A quirky RPG about saving the world.',
      color: '#9370DB',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Platformer',
      title: 'Kirbys Adventure',
      description: 'Inhale enemies and copy their abilities.',
      color: '#FFC0CB',
      console: 'NES:nes:nestopia',
    },
    {
      tags: 'Puzzle',
      title: 'Kirbys Dream Course',
      description: 'A creative blend of mini-golf and platforming.',
      color: '#FFB6C1',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'RPG',
      title: 'Legend of Zelda A Link to the Past',
      description: 'Explore dungeons and save Hyrule.',
      color: '#FFD700',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Adventure',
      title: 'Legend of Zelda Links Awakening',
      description: 'Uncover the secrets of Koholint Island.',
      color: '#6A5ACD',
      console: 'Game Boy:gb:mgba',
    },
    {
      tags: 'Platformer',
      title: 'Mega Man X',
      description: 'Battle evil robots and upgrade your gear.',
      color: '#1E90FF',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Adventure',
      title: 'Metroid II Return of Samus',
      description: 'Explore alien caves and fight deadly Metroids.',
      color: '#4B0082',
      console: 'Game Boy:gb:mgba',
    },
    {
      tags: 'Shooter',
      title: 'Star Fox 64',
      description: 'Pilot your ship through epic space battles.',
      color: '#20B2AA',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Party',
      title: 'Super Bomberman',
      description: 'Challenge friends in explosive matches.',
      color: '#32CD32',
      console: 'SNES:smc:snes9x',
    },
    {
      tags: 'Party',
      title: 'Super Bomberman 2',
      description: 'More bombs, more action, and new multiplayer fun!',
      color: '#228B22',
      console: 'SNES:smc:snes9x',
    },
    {
      tags: 'Party',
      title: 'Super Bomberman 3',
      description: 'New enemies, new power-ups, and chaotic battles!',
      color: '#006400',
      console: 'SNES:smc:snes9x',
    },
    {
      tags: 'Party',
      title: 'Super Bomberman 4',
      description: 'Take on new challenges and battle your friends!',
      color: '#2E8B57',
      console: 'SNES:smc:snes9x',
    },
    {
      tags: 'Party',
      title: 'Super Bomberman 5',
      description: 'The final SNES installment with ultimate multiplayer fun!',
      color: '#3CB371',
      console: 'SNES:smc:snes9x',
    },
    {
      tags: 'Platformer',
      title: 'Super Mario 64',
      description: 'Explore 3D worlds to rescue Princess Peach.',
      color: '#FF0000',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Racing',
      title: 'Mario Kart 64',
      description: 'Race against friends and use power-ups to win.',
      color: '#008000',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Platformer',
      title: 'Yoshis Story',
      description: 'Help the Yoshis save their island in a colorful adventure.',
      color: '#32CD32',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Party',
      title: 'Mario Party',
      description: 'Compete in mini-games and board game challenges.',
      color: '#FFA500',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Party',
      title: 'Mario Party 2',
      description: 'The party returns with new boards and mini-games.',
      color: '#FF8C00',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'RPG',
      title: 'Paper Mario',
      description: 'A unique RPG adventure with a paper-themed world.',
      color: '#FFD700',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Puzzle',
      title: 'Dr Mario 64',
      description: 'Match capsules to cure viruses in this puzzle classic.',
      color: '#DC143C',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Action',
      title: 'Bomberman 64',
      description: 'A 3D adventure featuring puzzles and explosions.',
      color: '#4682B4',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Action',
      title: 'Bomberman Hero',
      description: 'A platforming spin-off with a focus on solo play.',
      color: '#4169E1',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Party',
      title: 'Bomberman 64 The Second Attack',
      description:
        'New modes, maps, and characters for epic multiplayer battles.',
      color: '#5F9EA0',
      console: 'Nintendo 64:n64:mupen64plus_next',
    },
    {
      tags: 'Racing',
      title: 'Super Mario Kart',
      description: 'Race and throw items to win.',
      color: '#1E90FF',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Platformer',
      title: 'Super Mario World',
      description: 'Jump and run through a colorful world.',
      color: '#FF69B4',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Platformer',
      title: 'Super Mario World 2 Yoshis Island',
      description: 'Help Yoshi protect Baby Mario through colorful levels.',
      color: '#9ACD32',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Fighting',
      title: 'Super Street Fighter II',
      description: 'Compete in intense battles.',
      color: '#FF4500',
      console: 'SNES:sfc:snes9x',
    },
    {
      tags: 'Puzzle',
      title: 'Tetris',
      description: 'Stack blocks and clear lines.',
      color: '#4682B4',
      console: 'Game Boy:gb:mgba',
    },
    {
      tags: 'Platformer',
      title: 'Wario Land Super Mario Land 3',
      description: 'Play as Wario in a unique platforming adventure.',
      color: '#FFD700',
      console: 'Game Boy:gb:mgba',
    },
    {
      tags: 'Platformer',
      title: 'Sonic Rush',
      description: 'Corre a toda velocidad en esta aventura en 2D.',
      color: '#1E90FF',
      console: 'Nintendo DS:nds:melonds',
    },
    {
      tags: 'Platformer',
      title: 'Sonic the Hedgehog',
      description: 'El clásico juego de plataformas que lo inició todo.',
      color: '#0000FF',
      console: 'Sega Genesis:md:genesis_plus_gx',
    },
    {
      tags: 'Platformer',
      title: 'Sonic the Hedgehog 2',
      description: 'Corre con Sonic y Tails en una aventura más grande.',
      color: '#0080FF',
      console: 'Sega Genesis:md:genesis_plus_gx',
    },
    {
      tags: 'Platformer',
      title: 'Sonic the Hedgehog 3',
      description: 'La continuación de Sonic 2 con más niveles y habilidades.',
      color: '#00BFFF',
      console: 'Sega Genesis:md:genesis_plus_gx',
    },
    {
      tags: 'Platformer',
      title: 'Sonic and Knuckles',
      description:
        'Únete a Knuckles en su propia historia en el mundo de Sonic.',
      color: '#FF4500',
      console: 'Sega Genesis:md:genesis_plus_gx',
    },
    {
      tags: 'Platformer',
      title: 'Sonic Advance',
      description: 'Un Sonic clásico en 2D para la portátil de Nintendo.',
      color: '#00CED1',
      console: 'Game Boy Advance:gba:mgba',
    },
  ];

  // Crear juegos
  const games = [];
  for (const game of gamelist) {
    const createdGame = await prisma.game.create({
      data: {
        title: game.title,
        description: game.description,
        color: game.color,
        tags: game.tags,
        console: game.console,
      },
    });
    games.push(createdGame);
  }

  console.log('Games created:', games);

  // Asociar juegos desbloqueados y favoritos a los usuarios
  const [admin, user1, user2] = await prisma.user.findMany();

  await prisma.user.update({
    where: { id: admin.id },
    data: {
      GamesUnlocked: {
        connect: games.map((game) => ({ id: game.id })),
      },
      FavoriteGames: {
        connect: [
          { id: games[0].id }, // Legend of Zelda
          { id: games[3].id }, // Super Bomberman
        ],
      },
    },
  });

  await prisma.user.update({
    where: { id: user1.id },
    data: {
      GamesUnlocked: {
        connect: games.slice(0, 4).map((game) => ({ id: game.id })), // Primeros 4 juegos
      },
      FavoriteGames: {
        connect: [{ id: games[1].id }], // Super Street Fighter II
      },
    },
  });

  await prisma.user.update({
    where: { id: user2.id },
    data: {
      GamesUnlocked: {
        connect: games.slice(2).map((game) => ({ id: game.id })), // Últimos 4 juegos
      },
      FavoriteGames: {
        connect: [{ id: games[4].id }], // Simon Says Game
      },
    },
  });

  console.log('Seed data has been created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
