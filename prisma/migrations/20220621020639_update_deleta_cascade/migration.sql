-- DropForeignKey
ALTER TABLE "tokens_hash" DROP CONSTRAINT "tokens_hash_user_id_fkey";

-- AddForeignKey
ALTER TABLE "tokens_hash" ADD CONSTRAINT "tokens_hash_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
