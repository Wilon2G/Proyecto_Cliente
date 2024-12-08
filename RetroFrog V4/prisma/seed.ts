import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear un usuario
  const user = await prisma.user.create({
    data: {
      userName: "Prueba",
      password: "prueba",
      name: "Pepito Prueba",
      email: "pepitoprueba@example.com",
      sex: "NAN",
      score: 50,
      theme: "dark",
    },
  });

  // Crear tres juegos
  const game1 = await prisma.game.create({
    data: {
      title: "Super amigo italiano",
      description: "Descripción del juego 1",
      component: "Componente1",
      color: "Red",
      route: "/juego-1",
    },
  });

  const game2 = await prisma.game.create({
    data: {
      title: "Juego 2",
      description: "Descripción del juego 2",
      component: "Componente2",
      color: "Green",
      route: "/juego-2",
    },
  });

  const game3 = await prisma.game.create({
    data: {
      title: "Juego 3",
      description: "Descripción del juego 3",
      component: "Componente3",
      color: "Blue",
      route: "/juego-3",
    },
  });

  // Asociar juegos al usuario
  await prisma.user.update({
    where: { id: user.id },
    data: {
      GamesUnlocked: {
        connect: [{ id: game1.id }, { id: game2.id }, { id: game3.id }],
      },
    },
  });

  console.log("Seed data has been created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
