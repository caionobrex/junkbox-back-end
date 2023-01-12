-- CreateTable
CREATE TABLE "UpVote" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,

    CONSTRAINT "UpVote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpVote" ADD CONSTRAINT "UpVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpVote" ADD CONSTRAINT "UpVote_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
