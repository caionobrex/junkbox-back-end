/*
  Warnings:

  - You are about to drop the column `removeSongAfterPlayed` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the column `songsCount` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AlterTable
ALTER TABLE "PlayList" DROP COLUMN "removeSongAfterPlayed",
DROP COLUMN "songsCount",
ADD COLUMN     "removeTrackAfterPlayed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tracksCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,
    "playlistId" INTEGER,
    "userId" INTEGER,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
