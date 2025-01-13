-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "theme" TEXT NOT NULL,
    "pfp" TEXT NOT NULL,
    "registerDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "route" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserGames" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGames_AB_unique" ON "_UserGames"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGames_B_index" ON "_UserGames"("B");
