/*
  Warnings:

  - You are about to drop the column `repeat` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the column `songsPerUser` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the column `toUser` on the `Song` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StreamingService" AS ENUM ('SPOTIFY');

-- AlterTable
ALTER TABLE "PlayList" DROP COLUMN "repeat",
DROP COLUMN "songsPerUser",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "removeSongAfterPlayed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "songsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "toUser";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "serviceAccessToken" TEXT,
ADD COLUMN     "streamingService" "StreamingService";
