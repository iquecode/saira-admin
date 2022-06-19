/*
  Warnings:

  - You are about to drop the column `cod_ibge` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `city` table. All the data in the column will be lost.
  - Added the required column `codIbge` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentTypeId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_state_id_fkey";

-- AlterTable
ALTER TABLE "city" DROP COLUMN "cod_ibge",
DROP COLUMN "state_id",
ADD COLUMN     "codIbge" INTEGER NOT NULL,
ADD COLUMN     "stateId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "avatarURL" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "cep" INTEGER,
ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "documentPhotoURL1" TEXT,
ADD COLUMN     "documentPhotoURL2" TEXT,
ADD COLUMN     "documentTypeId" INTEGER NOT NULL,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "motherName" TEXT,
ADD COLUMN     "nickname" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "circle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentCircleId" TEXT NOT NULL,

    CONSTRAINT "circle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircleRoles" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CircleRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembersInCircles" (
    "memberId" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "document_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "namePt" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameEs" TEXT NOT NULL,
    "numCode" INTEGER,
    "iso" TEXT,
    "iso3" TEXT,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MembersInCircles_memberId_key" ON "MembersInCircles"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "MembersInCircles_circleId_key" ON "MembersInCircles"("circleId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circle" ADD CONSTRAINT "circle_parentCircleId_fkey" FOREIGN KEY ("parentCircleId") REFERENCES "circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersInCircles" ADD CONSTRAINT "MembersInCircles_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersInCircles" ADD CONSTRAINT "MembersInCircles_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembersInCircles" ADD CONSTRAINT "MembersInCircles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "CircleRoles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
