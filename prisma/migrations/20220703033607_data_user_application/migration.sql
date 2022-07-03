-- CreateTable
CREATE TABLE "DataUserApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "user_application_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DataUserApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataUserApplication" ADD CONSTRAINT "DataUserApplication_user_application_id_fkey" FOREIGN KEY ("user_application_id") REFERENCES "UserApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
