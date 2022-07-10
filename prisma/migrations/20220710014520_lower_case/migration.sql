/*
  Warnings:

  - You are about to drop the `DataUserOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DataUserOrder" DROP CONSTRAINT "DataUserOrder_user_order_id_fkey";

-- DropForeignKey
ALTER TABLE "UserOrder" DROP CONSTRAINT "UserOrder_type_user_order_id_fkey";

-- DropForeignKey
ALTER TABLE "UserOrder" DROP CONSTRAINT "UserOrder_user_id_fkey";

-- DropTable
DROP TABLE "DataUserOrder";

-- DropTable
DROP TABLE "UserOrder";

-- CreateTable
CREATE TABLE "data_user_orders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "user_order_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "data_user_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_user_order_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "data_user_orders" ADD CONSTRAINT "data_user_orders_user_order_id_fkey" FOREIGN KEY ("user_order_id") REFERENCES "user_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_orders" ADD CONSTRAINT "user_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_orders" ADD CONSTRAINT "user_orders_type_user_order_id_fkey" FOREIGN KEY ("type_user_order_id") REFERENCES "types_user_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
