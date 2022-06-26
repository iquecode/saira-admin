/*
  Warnings:

  - You are about to drop the column `login_blocked_date` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "login_blocked_date",
ADD COLUMN     "login_blocked_expiration" INTEGER;
