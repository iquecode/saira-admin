/*
  Warnings:

  - You are about to drop the column `parentCircleId` on the `circle` table. All the data in the column will be lost.
  - You are about to drop the column `codIbge` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `nameEn` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the column `nameEs` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the column `namePt` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the column `numCode` on the `countries` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine1` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `avatarURL` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `documentNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `documentPhotoURL1` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `documentPhotoURL2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `documentTypeId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `CircleRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MembersInCircles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parent_circle_id` to the `circle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `circle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_ibge` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_es` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_pt` to the `countries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MembersInCircles" DROP CONSTRAINT "MembersInCircles_circleId_fkey";

-- DropForeignKey
ALTER TABLE "MembersInCircles" DROP CONSTRAINT "MembersInCircles_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MembersInCircles" DROP CONSTRAINT "MembersInCircles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "circle" DROP CONSTRAINT "circle_parentCircleId_fkey";

-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_stateId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_cityId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_countryId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_documentTypeId_fkey";

-- AlterTable
ALTER TABLE "circle" DROP COLUMN "parentCircleId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parent_circle_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "city" DROP COLUMN "codIbge",
DROP COLUMN "stateId",
ADD COLUMN     "cod_ibge" INTEGER NOT NULL,
ADD COLUMN     "state_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "countries" DROP COLUMN "nameEn",
DROP COLUMN "nameEs",
DROP COLUMN "namePt",
DROP COLUMN "numCode",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_es" TEXT NOT NULL,
ADD COLUMN     "name_pt" TEXT NOT NULL,
ADD COLUMN     "num_code" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "addressLine1",
DROP COLUMN "addressLine2",
DROP COLUMN "avatarURL",
DROP COLUMN "birthDate",
DROP COLUMN "cityId",
DROP COLUMN "countryId",
DROP COLUMN "createdAt",
DROP COLUMN "documentNumber",
DROP COLUMN "documentPhotoURL1",
DROP COLUMN "documentPhotoURL2",
DROP COLUMN "documentTypeId",
DROP COLUMN "fatherName",
DROP COLUMN "motherName",
DROP COLUMN "updatedAt",
ADD COLUMN     "address_line1" TEXT,
ADD COLUMN     "address_line2" TEXT,
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "birth_date" TIMESTAMP(3),
ADD COLUMN     "city_id" INTEGER,
ADD COLUMN     "country_id" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "document_number" TEXT,
ADD COLUMN     "document_photo_url1" TEXT,
ADD COLUMN     "document_photo_url2" TEXT,
ADD COLUMN     "document_type_id" INTEGER NOT NULL,
ADD COLUMN     "father_name" TEXT,
ADD COLUMN     "mother_name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "CircleRoles";

-- DropTable
DROP TABLE "MembersInCircles";

-- CreateTable
CREATE TABLE "circle_roles" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "circle_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members_in_circles" (
    "member_id" TEXT NOT NULL,
    "circle_id" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "members_in_circles_member_id_key" ON "members_in_circles"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "members_in_circles_circle_id_key" ON "members_in_circles"("circle_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "document_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circle" ADD CONSTRAINT "circle_parent_circle_id_fkey" FOREIGN KEY ("parent_circle_id") REFERENCES "circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_in_circles" ADD CONSTRAINT "members_in_circles_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_in_circles" ADD CONSTRAINT "members_in_circles_circle_id_fkey" FOREIGN KEY ("circle_id") REFERENCES "circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_in_circles" ADD CONSTRAINT "members_in_circles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "circle_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "state"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
