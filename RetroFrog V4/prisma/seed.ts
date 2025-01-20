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
        username: 'adminUser',
        password: 'securepassword',
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

  // Lista de juegos a crear
  const gamelist = [
    {
      tags: 'RPG',
      title: 'Legend of Zelda: A Link to the Past',
      description: 'Explora mazmorras y salva Hyrule.',
      color: '#FFD700',
    },
    {
      tags: 'Lucha',
      title: 'Super Street Fighter II',
      description: 'Compite en intensos combates.',
      color: '#FF4500',
    },
    {
      tags: 'Carreras',
      title: 'Super Mario Kart',
      description: 'Corre y lanza ítems para ganar.',
      color: '#1E90FF',
    },
    {
      tags: 'Party',
      title: 'Super Bomberman',
      description: 'Desafía amigos en explosivas partidas.',
      color: '#32CD32',
    },
    {
      tags: 'Puzzle',
      title: 'Simon Says Game',
      description: 'Sigue el ritmo y memoriza patrones.',
      color: '#8A2BE2',
    },
    {
      tags: 'Plataformas',
      title: 'Super Mario World',
      description: 'Salta y corre en un mundo colorido.',
      color: '#FF69B4',
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
