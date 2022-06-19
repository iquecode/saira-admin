-- AlterTable
ALTER TABLE "circles" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "cities" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "contacts" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "document_types" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "members_in_circles" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles_of_members" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP NOT NULL;
