/*
  Warnings:

  - You are about to drop the `DataUserApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeUserApplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DataUserApplication" DROP CONSTRAINT "DataUserApplication_user_application_id_fkey";

-- DropForeignKey
ALTER TABLE "UserApplication" DROP CONSTRAINT "UserApplication_type_user_application_id_fkey";

-- DropForeignKey
ALTER TABLE "UserApplication" DROP CONSTRAINT "UserApplication_user_id_fkey";

-- DropTable
DROP TABLE "DataUserApplication";

-- DropTable
DROP TABLE "TypeUserApplication";

-- DropTable
DROP TABLE "UserApplication";

-- CreateTable
CREATE TABLE "types_user_orders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "types_user_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataUserOrder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "user_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DataUserOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOrder" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_user_order_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOrder_user_id_key" ON "UserOrder"("user_id");

-- AddForeignKey
ALTER TABLE "DataUserOrder" ADD CONSTRAINT "DataUserOrder_user_order_id_fkey" FOREIGN KEY ("user_order_id") REFERENCES "UserOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_type_user_order_id_fkey" FOREIGN KEY ("type_user_order_id") REFERENCES "types_user_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
