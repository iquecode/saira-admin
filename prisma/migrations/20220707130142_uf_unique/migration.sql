/*
  Warnings:

  - A unique constraint covering the columns `[uf]` on the table `states` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "states_uf_key" ON "states"("uf");
