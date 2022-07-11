/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_name_key" ON "contacts"("name");
