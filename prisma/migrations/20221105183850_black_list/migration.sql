/*
  Warnings:

  - You are about to drop the column `type` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlockedWord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_addressId_fkey";

-- DropForeignKey
ALTER TABLE "BlockedWord" DROP CONSTRAINT "BlockedWord_playlistId_fkey";

-- AlterTable
ALTER TABLE "PlayList" DROP COLUMN "type";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "BlockedWord";

-- DropEnum
DROP TYPE "PlayListType";

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "blackListId" INTEGER NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordPackage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "blackListId" INTEGER NOT NULL,

    CONSTRAINT "WordPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsOnWordPackages" (
    "wordId" INTEGER NOT NULL,
    "wordPackageId" INTEGER NOT NULL,

    CONSTRAINT "WordsOnWordPackages_pkey" PRIMARY KEY ("wordId","wordPackageId")
);

-- CreateTable
CREATE TABLE "BlackList" (
    "id" SERIAL NOT NULL,
    "playlistId" INTEGER NOT NULL,

    CONSTRAINT "BlackList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlackList_playlistId_key" ON "BlackList"("playlistId");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_blackListId_fkey" FOREIGN KEY ("blackListId") REFERENCES "BlackList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordPackage" ADD CONSTRAINT "WordPackage_blackListId_fkey" FOREIGN KEY ("blackListId") REFERENCES "BlackList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordsOnWordPackages" ADD CONSTRAINT "WordsOnWordPackages_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordsOnWordPackages" ADD CONSTRAINT "WordsOnWordPackages_wordPackageId_fkey" FOREIGN KEY ("wordPackageId") REFERENCES "WordPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlackList" ADD CONSTRAINT "BlackList_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
