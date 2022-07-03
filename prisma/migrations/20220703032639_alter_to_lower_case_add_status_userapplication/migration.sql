/*
  Warnings:

  - You are about to drop the column `Name` on the `TypeUserApplication` table. All the data in the column will be lost.
  - You are about to drop the column `Note` on the `TypeUserApplication` table. All the data in the column will be lost.
  - Added the required column `name` to the `TypeUserApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `UserApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypeUserApplication" DROP COLUMN "Name",
DROP COLUMN "Note",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "UserApplication" ADD COLUMN     "status" TEXT NOT NULL;
