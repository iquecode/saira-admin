/*
  Warnings:

  - You are about to drop the column `tokenEmailVerify` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tokenResetPassword` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tokenSignUpFlow` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_email_verify]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token_signup_flow]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token_reset_password]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_tokenEmailVerify_key";

-- DropIndex
DROP INDEX "users_tokenResetPassword_key";

-- DropIndex
DROP INDEX "users_tokenSignUpFlow_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "tokenEmailVerify",
DROP COLUMN "tokenResetPassword",
DROP COLUMN "tokenSignUpFlow",
ADD COLUMN     "token_email_verify" TEXT,
ADD COLUMN     "token_reset_password" TEXT,
ADD COLUMN     "token_signup_flow" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_token_email_verify_key" ON "users"("token_email_verify");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_signup_flow_key" ON "users"("token_signup_flow");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_reset_password_key" ON "users"("token_reset_password");
