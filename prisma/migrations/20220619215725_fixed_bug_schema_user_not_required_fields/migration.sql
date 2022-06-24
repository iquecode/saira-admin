-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_document_type_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "document_type_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "document_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
