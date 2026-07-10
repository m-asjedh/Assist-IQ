-- AlterEnum: CompanyRole keep OWNER only
ALTER TYPE "CompanyRole" RENAME TO "CompanyRole_old";
CREATE TYPE "CompanyRole" AS ENUM ('OWNER');

UPDATE "CompanyMember"
SET "role" = 'OWNER'
WHERE "role"::text <> 'OWNER';

ALTER TABLE "CompanyMember" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "CompanyMember"
  ALTER COLUMN "role" TYPE "CompanyRole"
  USING 'OWNER'::"CompanyRole";
ALTER TABLE "CompanyMember"
  ALTER COLUMN "role" SET DEFAULT 'OWNER'::"CompanyRole";

DROP TYPE "CompanyRole_old";

-- Drop User.role and UserRole
ALTER TABLE "User" DROP COLUMN IF EXISTS "role";
DROP TYPE IF EXISTS "UserRole";
