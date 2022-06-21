/*
  Warnings:

  - The `validate` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `birth_date` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `login_blocked_date` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `expiration` to the `tokens_hash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "validate",
ADD COLUMN     "validate" INTEGER;

-- AlterTable
ALTER TABLE "tokens_hash" DROP COLUMN "expiration",
ADD COLUMN     "expiration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birth_date",
ADD COLUMN     "birth_date" INTEGER,
DROP COLUMN "login_blocked_date",
ADD COLUMN     "login_blocked_date" INTEGER;
