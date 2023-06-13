-- CreateTable
CREATE TABLE "preOrder" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "products" JSONB NOT NULL,

    CONSTRAINT "preOrder_pkey" PRIMARY KEY ("id")
);
