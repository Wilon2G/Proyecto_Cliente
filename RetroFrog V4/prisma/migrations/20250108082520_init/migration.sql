/*
  Warnings:

  - You are about to drop the column `route` on the `Game` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Game" ("color", "component", "description", "id", "title") SELECT "color", "component", "description", "id", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
