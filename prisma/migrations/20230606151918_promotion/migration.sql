-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('MONEY', 'PORCENTAGE');

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "usageLimit" INTEGER NOT NULL,
    "enable" BOOLEAN NOT NULL,
    "type" "PromotionType" NOT NULL DEFAULT 'PORCENTAGE',

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);
