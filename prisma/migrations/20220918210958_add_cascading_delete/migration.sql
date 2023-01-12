-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
