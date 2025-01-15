import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un usuario
  const user = await prisma.user.create({
    data: {
      username: 'Prueba',
      password: 'prueba',
      name: 'Pepito Prueba',
      email: 'pepitoprueba@example.com',
      sex: 'NAN',
      score: 50,
      theme: 'dark',
      pfp: '/assets/icon/pfp/default.jpg',
    },
  });

  // Lista de juegos a crear
  const gamelist = [
    {
      tags: 'RPG',
      title: 'Legend of Zelda, The - A Link to the Past',
      description: 'Explora mazmorras y salva Hyrule.',
      color: '#FFD700', // Ejemplo de color hexadecimal
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

  // Crear los juegos y asociarlos al usuario
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

  // Asociar los juegos al usuario
  await prisma.user.update({
    where: { id: user.id },
    data: {
      GamesUnlocked: {
        connect: games.map((game) => ({ id: game.id })),
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
