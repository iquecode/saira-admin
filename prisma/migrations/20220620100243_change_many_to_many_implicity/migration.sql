/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the `members_in_circles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles_of_members` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `member_id` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_type_id` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "members_in_circles" DROP CONSTRAINT "members_in_circles_circle_id_fkey";

-- DropForeignKey
ALTER TABLE "members_in_circles" DROP CONSTRAINT "members_in_circles_member_id_fkey";

-- DropForeignKey
ALTER TABLE "roles_of_members" DROP CONSTRAINT "roles_of_members_circle_id_fkey";

-- DropForeignKey
ALTER TABLE "roles_of_members" DROP CONSTRAINT "roles_of_members_member_id_fkey";

-- DropForeignKey
ALTER TABLE "roles_of_members" DROP CONSTRAINT "roles_of_members_role_id_fkey";

-- DropIndex
DROP INDEX "roles_name_key";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "name",
ADD COLUMN     "circle_id" TEXT,
ADD COLUMN     "member_id" TEXT NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "role_type_id" INTEGER NOT NULL,
ADD COLUMN     "validate" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "roles_id_seq";

-- DropTable
DROP TABLE "members_in_circles";

-- DropTable
DROP TABLE "roles_of_members";

-- CreateTable
CREATE TABLE "role_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "role_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CircleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "role_types_name_key" ON "role_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CircleToUser_AB_unique" ON "_CircleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CircleToUser_B_index" ON "_CircleToUser"("B");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_circle_id_fkey" FOREIGN KEY ("circle_id") REFERENCES "circles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_role_type_id_fkey" FOREIGN KEY ("role_type_id") REFERENCES "role_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CircleToUser" ADD CONSTRAINT "_CircleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "circles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CircleToUser" ADD CONSTRAINT "_CircleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
