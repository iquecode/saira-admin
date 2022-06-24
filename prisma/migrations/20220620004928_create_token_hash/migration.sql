-- CreateTable
CREATE TABLE "tokens_hash" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dispositive" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "tokens_hash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens_hash" ADD CONSTRAINT "tokens_hash_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
