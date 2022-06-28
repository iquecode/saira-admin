/*
  Warnings:

  - A unique constraint covering the columns `[tokenResetPassword]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tokenResetPassword" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_tokenResetPassword_key" ON "users"("tokenResetPassword");
