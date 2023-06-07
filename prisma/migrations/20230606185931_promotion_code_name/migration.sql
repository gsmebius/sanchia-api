/*
  Warnings:

  - Added the required column `codeName` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "codeName" TEXT NOT NULL,
ALTER COLUMN "enable" SET DEFAULT true;
