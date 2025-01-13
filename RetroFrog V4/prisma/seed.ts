import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un usuario
  const user = await prisma.user.create({
    data: {
      userName: 'Prueba',
      password: 'prueba',
      name: 'Pepito Prueba',
      email: 'pepitoprueba@example.com',
      sex: 'NAN',
      score: 50,
      theme: 'dark',
      pfp: '/assets/icon/pfp/default.jpg',
    },
  });

  // Juegos del catálogo
  const gamesData = [
    {
      title: 'The Legend of Zelda - A Link to the Past',
      description: 'Explora mazmorras y salva Hyrule.',
      component: 'RPG',
      color: 'Gold',
    },
    {
      title: 'Super Street Fighter II',
      description: 'Compite en intensos combates.',
      component: 'Lucha',
      color: 'Red',
    },
    {
      title: 'Super Mario Kart',
      description: 'Corre y lanza ítems para ganar.',
      component: 'Carreras',
      color: 'Green',
    },
    {
      title: 'Super Bomberman',
      description: 'Desafía amigos en explosivas partidas.',
      component: 'Party',
      color: 'Blue',
    },
    {
      title: 'Simon Says Game',
      description: 'Sigue el ritmo y memoriza patrones.',
      component: 'Puzzle',
      color: 'Yellow',
    },
    {
      title: 'Super Mario World',
      description: 'Salta y corre en un mundo colorido.',
      component: 'Plataformas',
      color: 'SkyBlue',
    },
  ];

  // Crear juegos y asociarlos al usuario
  for (const gameData of gamesData) {
    const game = await prisma.game.create({
      data: gameData,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        GamesUnlocked: {
          connect: { id: game.id },
        },
      },
    });
  }

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
