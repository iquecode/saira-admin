/*
  Warnings:

  - A unique constraint covering the columns `[tokenEmailVerify]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tokenEmailVerify" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_tokenEmailVerify_key" ON "users"("tokenEmailVerify");
