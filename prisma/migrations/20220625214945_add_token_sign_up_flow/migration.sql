/*
  Warnings:

  - A unique constraint covering the columns `[tokenSignUpFlow]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tokenSignUpFlow" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_tokenSignUpFlow_key" ON "users"("tokenSignUpFlow");
