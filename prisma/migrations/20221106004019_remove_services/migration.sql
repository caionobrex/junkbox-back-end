/*
  Warnings:

  - You are about to drop the column `lifetime` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the column `removeTrackAfterPlayed` on the `PlayList` table. All the data in the column will be lost.
  - You are about to drop the column `serviceAccessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `streamingService` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayList" DROP COLUMN "lifetime",
DROP COLUMN "removeTrackAfterPlayed";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "serviceAccessToken",
DROP COLUMN "streamingService";

-- DropEnum
DROP TYPE "StreamingService";
