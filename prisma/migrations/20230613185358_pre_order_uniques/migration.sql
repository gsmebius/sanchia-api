/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `preOrder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `preOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "preOrder_clientId_key" ON "preOrder"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "preOrder_userId_key" ON "preOrder"("userId");
