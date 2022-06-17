/*
  Warnings:

  - You are about to drop the column `email_validated` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_validated",
DROP COLUMN "name",
DROP COLUMN "type";

-- DropTable
DROP TABLE "refresh_token";
