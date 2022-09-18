-- CreateEnum
CREATE TYPE "PlayListType" AS ENUM ('CASUAL', 'BUSINESS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "ip" TEXT,
    "password" TEXT NOT NULL,
    "resetPasswordCode" TEXT,
    "allowDedication" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayList" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "type" "PlayListType",
    "maxLength" INTEGER,
    "repeat" BOOLEAN NOT NULL DEFAULT true,
    "songsPerUser" INTEGER,
    "description" TEXT,
    "userId" INTEGER,
    "password" TEXT,
    "lifetime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,
    "playlistId" INTEGER,
    "userId" INTEGER,
    "toUser" TEXT NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "playlistId" INTEGER,

    CONSTRAINT "BlockedWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT,
    "district" TEXT,
    "state" TEXT,
    "city" TEXT,
    "country" TEXT,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Address_addressId_key" ON "Address"("addressId");

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedWord" ADD CONSTRAINT "BlockedWord_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "PlayList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "PlayList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
