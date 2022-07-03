-- CreateTable
CREATE TABLE "TypeUserApplication" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TypeUserApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserApplication" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_user_application_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deletable" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserApplication_user_id_key" ON "UserApplication"("user_id");

-- AddForeignKey
ALTER TABLE "UserApplication" ADD CONSTRAINT "UserApplication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserApplication" ADD CONSTRAINT "UserApplication_type_user_application_id_fkey" FOREIGN KEY ("type_user_application_id") REFERENCES "TypeUserApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
