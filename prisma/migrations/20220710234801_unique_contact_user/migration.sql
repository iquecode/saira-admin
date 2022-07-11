/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "contacts_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "contacts_name_user_id_key" ON "contacts"("name", "user_id");
