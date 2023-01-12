/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PlayList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlayList_name_key" ON "PlayList"("name");
