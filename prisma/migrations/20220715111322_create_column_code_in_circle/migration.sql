/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `circles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `circles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "circles" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "circles_code_key" ON "circles"("code");
